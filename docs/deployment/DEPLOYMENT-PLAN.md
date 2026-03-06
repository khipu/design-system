# Khipu Design System - Deployment Plan

> **Last Updated:** January 2026
> **Project:** @khipu/design-system
> **Target:** AWS CodeArtifact + Bitbucket Pipelines
> **Region:** us-east-1

This document contains the complete plan for deploying the Khipu Design System to AWS CodeArtifact with automated CI/CD via Bitbucket Pipelines.

---

## Infrastructure Approach

**Method:** AWS CLI commands (no Terraform)

All AWS resources will be created using AWS CLI commands documented in each task. Ensure you have:
- AWS CLI installed and configured
- Appropriate IAM permissions to create CodeArtifact resources

---

## Legend

| Priority | Label |
|----------|-------|
| 🔴 | Critical - Blocker |
| 🟠 | High - Important |
| 🟡 | Medium - Normal |
| 🟢 | Low - Nice to have |

| Status | Label |
|--------|-------|
| ⬜ | To Do |
| 🔄 | In Progress |
| ✅ | Done |

---

# Epic 1: AWS Infrastructure Setup

## DEPLOY-001: Create AWS CodeArtifact Domain
**Status:** ⬜ To Do
**Priority:** 🔴 Critical
**Story Points:** 2
**Labels:** `infrastructure`, `aws`, `codeartifact`
**Assignee:** _Unassigned_

### Description
Create the AWS CodeArtifact domain that will contain all package repositories for Khipu. A domain is a container for repositories and provides cross-account access control.

### Acceptance Criteria
- [ ] Domain created in us-east-1 region
- [ ] Domain name follows naming convention: `khipu`
- [ ] Domain policy allows access from required AWS accounts
- [ ] Domain encryption configured (AWS managed key or CMK)
- [ ] Domain accessible via AWS CLI

### Implementation Steps

#### Step 1: Create the Domain via AWS CLI
```bash
# Set variables
export AWS_REGION=us-east-1
export DOMAIN_NAME=khipu
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Create the CodeArtifact domain
aws codeartifact create-domain \
  --domain $DOMAIN_NAME \
  --region $AWS_REGION \
  --tags key=Project,value=design-system key=Environment,value=production

# Verify domain creation
aws codeartifact describe-domain \
  --domain $DOMAIN_NAME \
  --region $AWS_REGION
```

### Verification
```bash
# List domains to verify
aws codeartifact list-domains --region us-east-1

# Expected output:
# {
#   "domains": [
#     {
#       "name": "khipu",
#       "owner": "123456789012",
#       "arn": "arn:aws:codeartifact:us-east-1:123456789012:domain/khipu",
#       "status": "Active"
#     }
#   ]
# }
```

---

## DEPLOY-002: Create npm Repository in CodeArtifact
**Status:** ⬜ To Do
**Priority:** 🔴 Critical
**Story Points:** 2
**Labels:** `infrastructure`, `aws`, `codeartifact`
**Assignee:** _Unassigned_
**Depends On:** DEPLOY-001

### Description
Create an npm repository within the CodeArtifact domain to store the @khipu/design-system package and any future internal packages.

### Acceptance Criteria
- [ ] Repository created with name `npm-packages`
- [ ] Repository connected to upstream npmjs.com for external dependencies
- [ ] Repository accessible via npm CLI
- [ ] Scoped packages (@khipu/*) configured correctly

### Implementation Steps

#### Step 1: Create Upstream Repository (npm public)
```bash
# Create upstream connection to public npm registry
aws codeartifact create-repository \
  --domain khipu \
  --repository npm-store \
  --description "Upstream connection to npmjs.com" \
  --region us-east-1

# Associate external connection to npmjs
aws codeartifact associate-external-connection \
  --domain khipu \
  --repository npm-store \
  --external-connection public:npmjs \
  --region us-east-1
```

#### Step 2: Create Internal npm Repository
```bash
# Create the main repository with upstream
aws codeartifact create-repository \
  --domain khipu \
  --repository npm-packages \
  --description "Internal Khipu npm packages including @khipu/design-system" \
  --upstreams repositoryName=npm-store \
  --region us-east-1
```

### Verification
```bash
# List repositories
aws codeartifact list-repositories-in-domain \
  --domain khipu \
  --region us-east-1

# Get repository endpoint for npm
aws codeartifact get-repository-endpoint \
  --domain khipu \
  --repository npm-packages \
  --format npm \
  --region us-east-1

# Expected output:
# {
#   "repositoryEndpoint": "https://khipu-123456789012.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/"
# }
```

---

## DEPLOY-003: Create IAM Policies for CodeArtifact Access
**Status:** ⬜ To Do
**Priority:** 🔴 Critical
**Story Points:** 3
**Labels:** `infrastructure`, `aws`, `iam`, `security`
**Assignee:** _Unassigned_
**Depends On:** DEPLOY-002

### Description
Create IAM policies that grant appropriate permissions for:
1. **Publishers** (CI/CD pipeline) - Can publish packages
2. **Consumers** (internal apps) - Can read/download packages
3. **Developers** (local development) - Can read packages

### Acceptance Criteria
- [ ] Publisher policy allows publish, read, and get auth token
- [ ] Consumer policy allows read-only access
- [ ] Policies follow least privilege principle
- [ ] Policies are reusable across multiple roles/users

### Implementation Steps

#### Step 1: Publisher Policy (for CI/CD)
```json
// iam-policies/codeartifact-publisher.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CodeArtifactGetAuthToken",
      "Effect": "Allow",
      "Action": "codeartifact:GetAuthorizationToken",
      "Resource": "arn:aws:codeartifact:us-east-1:*:domain/khipu"
    },
    {
      "Sid": "CodeArtifactPublish",
      "Effect": "Allow",
      "Action": [
        "codeartifact:PublishPackageVersion",
        "codeartifact:PutPackageMetadata",
        "codeartifact:ReadFromRepository",
        "codeartifact:GetRepositoryEndpoint",
        "codeartifact:DescribeRepository",
        "codeartifact:DescribePackageVersion",
        "codeartifact:ListPackages",
        "codeartifact:ListPackageVersions"
      ],
      "Resource": [
        "arn:aws:codeartifact:us-east-1:*:repository/khipu/npm-packages",
        "arn:aws:codeartifact:us-east-1:*:package/khipu/npm-packages/*"
      ]
    },
    {
      "Sid": "STSGetServiceBearerToken",
      "Effect": "Allow",
      "Action": "sts:GetServiceBearerToken",
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "sts:AWSServiceName": "codeartifact.amazonaws.com"
        }
      }
    }
  ]
}
```

#### Step 2: Consumer Policy (for internal apps)
```json
// iam-policies/codeartifact-consumer.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CodeArtifactGetAuthToken",
      "Effect": "Allow",
      "Action": "codeartifact:GetAuthorizationToken",
      "Resource": "arn:aws:codeartifact:us-east-1:*:domain/khipu"
    },
    {
      "Sid": "CodeArtifactReadPackages",
      "Effect": "Allow",
      "Action": [
        "codeartifact:ReadFromRepository",
        "codeartifact:GetRepositoryEndpoint",
        "codeartifact:DescribeRepository",
        "codeartifact:DescribePackageVersion",
        "codeartifact:ListPackages",
        "codeartifact:ListPackageVersions",
        "codeartifact:GetPackageVersionAsset",
        "codeartifact:GetPackageVersionReadme"
      ],
      "Resource": [
        "arn:aws:codeartifact:us-east-1:*:repository/khipu/npm-packages",
        "arn:aws:codeartifact:us-east-1:*:repository/khipu/npm-store",
        "arn:aws:codeartifact:us-east-1:*:package/khipu/npm-packages/*",
        "arn:aws:codeartifact:us-east-1:*:package/khipu/npm-store/*"
      ]
    },
    {
      "Sid": "STSGetServiceBearerToken",
      "Effect": "Allow",
      "Action": "sts:GetServiceBearerToken",
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "sts:AWSServiceName": "codeartifact.amazonaws.com"
        }
      }
    }
  ]
}
```

#### Step 3: Create Policies via AWS CLI
```bash
# Create publisher policy
aws iam create-policy \
  --policy-name CodeArtifactPublisher \
  --policy-document file://iam-policies/codeartifact-publisher.json \
  --description "Allows publishing packages to CodeArtifact"

# Create consumer policy
aws iam create-policy \
  --policy-name CodeArtifactConsumer \
  --policy-document file://iam-policies/codeartifact-consumer.json \
  --description "Allows reading packages from CodeArtifact"

# Verify policies created
aws iam list-policies --scope Local --query "Policies[?contains(PolicyName, 'CodeArtifact')]"
```

---

## DEPLOY-004: Create IAM Role for Bitbucket Pipelines (OIDC)
**Status:** ⬜ To Do
**Priority:** 🔴 Critical
**Story Points:** 3
**Labels:** `infrastructure`, `aws`, `iam`, `bitbucket`
**Assignee:** _Unassigned_
**Depends On:** DEPLOY-003

### Description
Create an IAM role that Bitbucket Pipelines can assume using OIDC federation. This eliminates the need for static AWS credentials in Bitbucket.

### Acceptance Criteria
- [ ] OIDC provider for Bitbucket created in AWS
- [ ] IAM role created with trust policy for Bitbucket
- [ ] Role has publisher policy attached
- [ ] Role restricts access to specific Bitbucket workspace/repository

### Implementation Steps

#### Step 1: Create OIDC Identity Provider for Bitbucket
```bash
# Get Bitbucket's OIDC thumbprint (usually doesn't change)
# Bitbucket OIDC URL: https://api.bitbucket.org/2.0/workspaces/{workspace}/pipelines-config/identity/oidc

# Create OIDC provider
aws iam create-open-id-connect-provider \
  --url https://api.bitbucket.org/2.0/workspaces/WORKSPACE_UUID/pipelines-config/identity/oidc \
  --client-id-list arn:aws:iam::ACCOUNT_ID:oidc-provider/api.bitbucket.org/2.0/workspaces/WORKSPACE_UUID/pipelines-config/identity/oidc \
  --thumbprint-list 9e99a48a9960b14926bb7f3b02e22da2b0ab7280
```

#### Step 2: Create Trust Policy
```json
// iam-policies/bitbucket-trust-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::ACCOUNT_ID:oidc-provider/api.bitbucket.org/2.0/workspaces/WORKSPACE_UUID/pipelines-config/identity/oidc"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "api.bitbucket.org/2.0/workspaces/WORKSPACE_UUID/pipelines-config/identity/oidc:aud": "ari:cloud:bitbucket::workspace/WORKSPACE_UUID"
        },
        "StringLike": {
          "api.bitbucket.org/2.0/workspaces/WORKSPACE_UUID/pipelines-config/identity/oidc:sub": "REPO_UUID:*"
        }
      }
    }
  ]
}
```

#### Step 3: Create IAM Role via AWS CLI
```bash
# Set variables (replace with your values)
export WORKSPACE_UUID="your-workspace-uuid"
export REPO_UUID="your-repo-uuid"
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Create the IAM role
aws iam create-role \
  --role-name BitbucketCodeArtifactPublisher \
  --assume-role-policy-document file://iam-policies/bitbucket-trust-policy.json \
  --description "IAM role for Bitbucket Pipelines to publish to CodeArtifact"

# Attach the publisher policy
aws iam attach-role-policy \
  --role-name BitbucketCodeArtifactPublisher \
  --policy-arn arn:aws:iam::${AWS_ACCOUNT_ID}:policy/CodeArtifactPublisher

# Verify role
aws iam get-role --role-name BitbucketCodeArtifactPublisher
```

### Finding Bitbucket UUIDs
```bash
# Get workspace UUID
curl -u username:app_password \
  https://api.bitbucket.org/2.0/workspaces/khipu | jq '.uuid'

# Get repository UUID
curl -u username:app_password \
  https://api.bitbucket.org/2.0/repositories/khipu/design-system | jq '.uuid'
```

---

## DEPLOY-005: Attach Consumer Policy to Application IAM Roles
**Status:** ⬜ To Do
**Priority:** 🟠 High
**Story Points:** 2
**Labels:** `infrastructure`, `aws`, `iam`
**Assignee:** _Unassigned_
**Depends On:** DEPLOY-003

### Description
Attach the CodeArtifact consumer policy to existing IAM roles used by consumer applications (ECS tasks, Lambda functions, EC2 instances).

### Acceptance Criteria
- [ ] Identified all consumer application IAM roles
- [ ] Consumer policy attached to each role
- [ ] Applications can authenticate and download packages

### Implementation Steps

#### Step 1: Identify Existing Roles
```bash
# List roles that might need access (example names)
# - khenshin-web-task-role
# - payments-api-task-role
# - auth-server-task-role

aws iam list-roles --query "Roles[?contains(RoleName, 'task') || contains(RoleName, 'lambda')].RoleName"
```

#### Step 2: Attach Policy to Roles
```bash
# Attach to each consumer role
aws iam attach-role-policy \
  --role-name khenshin-web-task-role \
  --policy-arn arn:aws:iam::ACCOUNT_ID:policy/CodeArtifactConsumer

aws iam attach-role-policy \
  --role-name payments-api-task-role \
  --policy-arn arn:aws:iam::ACCOUNT_ID:policy/CodeArtifactConsumer
```

---

# Epic 2: Package Configuration

## DEPLOY-006: Configure package.json for CodeArtifact Publishing
**Status:** ⬜ To Do
**Priority:** 🔴 Critical
**Story Points:** 2
**Labels:** `package`, `configuration`
**Assignee:** _Unassigned_

### Description
Update package.json with correct configuration for publishing to CodeArtifact, including publish config, repository info, and build scripts.

### Acceptance Criteria
- [ ] Package name uses @khipu scope
- [ ] publishConfig points to CodeArtifact registry
- [ ] All required fields present (name, version, main, module, types)
- [ ] Files field specifies what to publish
- [ ] Prepublish script runs build

### Implementation

#### Updated package.json
```json
{
  "name": "@khipu/design-system",
  "version": "0.1.0",
  "description": "Khipu Design System - UI components and design tokens for the Khipu payment platform",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "sideEffects": [
    "*.css"
  ],
  "files": [
    "dist",
    "README.md",
    "CHANGELOG.md"
  ],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js"
    },
    "./tokens": {
      "types": "./dist/tokens/index.d.ts",
      "import": "./dist/tokens/index.esm.js",
      "require": "./dist/tokens/index.js"
    },
    "./css": "./dist/tokens/css-variables.css"
  },
  "publishConfig": {
    "registry": "https://khipu-ACCOUNT_ID.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/"
  },
  "repository": {
    "type": "git",
    "url": "git+https://bitbucket.org/khipu/design-system.git"
  },
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --clean",
    "prepublishOnly": "npm run build && npm run typecheck",
    "typecheck": "tsc --noEmit",
    "version": "npm run build"
  },
  "peerDependencies": {
    "react": ">=17.0.0",
    "react-dom": ">=17.0.0"
  },
  "keywords": [
    "khipu",
    "design-system",
    "react",
    "components",
    "ui",
    "material-ui",
    "payment"
  ],
  "license": "UNLICENSED",
  "private": false
}
```

### Key Points
- `publishConfig.registry`: Points to CodeArtifact endpoint
- `files`: Only publishes `dist/` folder (not source)
- `prepublishOnly`: Ensures build + typecheck before publish
- `private: false`: Required for publishing

---

## DEPLOY-007: Create .npmrc Configuration Templates
**Status:** ⬜ To Do
**Priority:** 🔴 Critical
**Story Points:** 2
**Labels:** `package`, `configuration`
**Assignee:** _Unassigned_

### Description
Create .npmrc configuration files for different environments (CI/CD, local development, consumer apps).

### Acceptance Criteria
- [ ] .npmrc.ci template for CI/CD pipelines
- [ ] .npmrc.local template for local development
- [ ] .npmrc.consumer template for consumer applications
- [ ] Documentation for each configuration

### Implementation

#### .npmrc for CI/CD (generated dynamically)
```ini
# .npmrc (generated by CI/CD pipeline)
# DO NOT COMMIT THIS FILE - it contains auth tokens

@khipu:registry=https://khipu-ACCOUNT_ID.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/
//khipu-ACCOUNT_ID.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/:_authToken=${CODEARTIFACT_AUTH_TOKEN}
//khipu-ACCOUNT_ID.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/:always-auth=true
```

#### .npmrc.example (for documentation)
```ini
# .npmrc.example
# Copy this to .npmrc and configure for your environment

# Khipu CodeArtifact registry for @khipu scoped packages
@khipu:registry=https://khipu-ACCOUNT_ID.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/

# Authentication token (get via: aws codeartifact get-authorization-token)
//khipu-ACCOUNT_ID.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/:_authToken=YOUR_TOKEN_HERE
//khipu-ACCOUNT_ID.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/:always-auth=true
```

#### Script to Generate .npmrc
```bash
#!/bin/bash
# scripts/setup-npmrc.sh
# Generates .npmrc with fresh CodeArtifact token

set -e

AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
DOMAIN="khipu"
REPOSITORY="npm-packages"
REGION="us-east-1"

# Get fresh auth token (valid for 12 hours)
CODEARTIFACT_AUTH_TOKEN=$(aws codeartifact get-authorization-token \
  --domain $DOMAIN \
  --domain-owner $AWS_ACCOUNT_ID \
  --query authorizationToken \
  --output text \
  --region $REGION)

# Generate .npmrc
cat > .npmrc << EOF
@khipu:registry=https://${DOMAIN}-${AWS_ACCOUNT_ID}.d.codeartifact.${REGION}.amazonaws.com/npm/${REPOSITORY}/
//${DOMAIN}-${AWS_ACCOUNT_ID}.d.codeartifact.${REGION}.amazonaws.com/npm/${REPOSITORY}/:_authToken=${CODEARTIFACT_AUTH_TOKEN}
//${DOMAIN}-${AWS_ACCOUNT_ID}.d.codeartifact.${REGION}.amazonaws.com/npm/${REPOSITORY}/:always-auth=true
EOF

echo "✅ .npmrc generated successfully"
echo "⏰ Token expires in 12 hours"
```

---

## DEPLOY-008: Configure Semantic Versioning with Conventional Commits
**Status:** ⬜ To Do
**Priority:** 🟠 High
**Story Points:** 3
**Labels:** `package`, `versioning`
**Assignee:** _Unassigned_

### Description
Set up conventional commits and semantic versioning to automate version bumping and changelog generation.

### Acceptance Criteria
- [ ] commitlint configured to enforce conventional commits
- [ ] Husky hooks prevent non-conventional commits
- [ ] standard-version configured for version bumping
- [ ] CHANGELOG.md auto-generated

### Implementation

#### Install Dependencies
```bash
npm install --save-dev \
  @commitlint/cli \
  @commitlint/config-conventional \
  husky \
  standard-version
```

#### commitlint.config.js
```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Formatting, no code change
        'refactor', // Code refactor
        'perf',     // Performance improvement
        'test',     // Tests
        'build',    // Build system
        'ci',       // CI configuration
        'chore',    // Maintenance
        'revert'    // Revert commit
      ]
    ],
    'scope-enum': [
      2,
      'always',
      [
        'button',
        'textfield',
        'card',
        'modal',
        'tabs',
        'tokens',
        'theme',
        'build',
        'deps',
        'docs'
      ]
    ]
  }
};
```

#### .versionrc.js
```javascript
// .versionrc.js
module.exports = {
  types: [
    { type: 'feat', section: 'Features' },
    { type: 'fix', section: 'Bug Fixes' },
    { type: 'perf', section: 'Performance' },
    { type: 'refactor', section: 'Code Refactoring' },
    { type: 'docs', section: 'Documentation', hidden: true },
    { type: 'style', section: 'Styles', hidden: true },
    { type: 'test', section: 'Tests', hidden: true },
    { type: 'build', section: 'Build System', hidden: true },
    { type: 'ci', section: 'CI', hidden: true },
    { type: 'chore', hidden: true }
  ],
  commitUrlFormat: 'https://bitbucket.org/khipu/design-system/commits/{{hash}}',
  compareUrlFormat: 'https://bitbucket.org/khipu/design-system/branches/compare/{{currentTag}}..{{previousTag}}'
};
```

#### Husky Setup
```bash
# Initialize husky
npx husky init

# Add commit-msg hook
echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg

# Add pre-commit hook
echo 'npm run typecheck && npm run lint' > .husky/pre-commit
```

#### Package.json Scripts
```json
{
  "scripts": {
    "release": "standard-version",
    "release:minor": "standard-version --release-as minor",
    "release:major": "standard-version --release-as major",
    "release:prerelease": "standard-version --prerelease alpha",
    "prepare": "husky"
  }
}
```

### Commit Message Examples
```bash
# Feature (minor version bump: 0.1.0 -> 0.2.0)
git commit -m "feat(button): add loading state prop"

# Bug fix (patch version bump: 0.1.0 -> 0.1.1)
git commit -m "fix(textfield): correct error state styling"

# Breaking change (major version bump: 0.1.0 -> 1.0.0)
git commit -m "feat(tokens)!: restructure color token names

BREAKING CHANGE: color tokens renamed from camelCase to kebab-case"

# Prerelease
npm run release:prerelease
# Creates: 0.1.1-alpha.0
```

---

# Epic 3: CI/CD Pipeline (Bitbucket Pipelines)

## DEPLOY-009: Create Bitbucket Pipeline for PR Validation
**Status:** ⬜ To Do
**Priority:** 🔴 Critical
**Story Points:** 5
**Labels:** `ci-cd`, `bitbucket`, `testing`
**Assignee:** _Unassigned_
**Depends On:** DEPLOY-004

### Description
Create Bitbucket Pipeline configuration that runs on every PR to validate code quality, types, tests, and build.

### Acceptance Criteria
- [ ] Pipeline runs on all PRs
- [ ] Runs lint, typecheck, tests, and build
- [ ] Publishes prerelease version for testing
- [ ] Reports status back to PR

### Implementation

#### bitbucket-pipelines.yml (Part 1: PR Validation)
```yaml
# bitbucket-pipelines.yml

image: node:20

definitions:
  caches:
    npm: $HOME/.npm

  steps:
    - step: &install
        name: Install Dependencies
        caches:
          - npm
          - node
        script:
          - npm ci
        artifacts:
          - node_modules/**

    - step: &lint
        name: Lint
        script:
          - npm run lint

    - step: &typecheck
        name: Type Check
        script:
          - npm run typecheck

    - step: &test
        name: Unit Tests
        script:
          - npm run test -- --coverage
        artifacts:
          - coverage/**

    - step: &build
        name: Build
        script:
          - npm run build
        artifacts:
          - dist/**

    - step: &publish-prerelease
        name: Publish Prerelease
        oidc: true
        script:
          # Assume AWS role via OIDC
          - export AWS_REGION=us-east-1
          - export AWS_ROLE_ARN=$BITBUCKET_PUBLISHER_ROLE_ARN

          # Get CodeArtifact auth token
          - |
            export CODEARTIFACT_AUTH_TOKEN=$(aws codeartifact get-authorization-token \
              --domain khipu \
              --query authorizationToken \
              --output text)

          # Configure npm
          - |
            cat > .npmrc << EOF
            @khipu:registry=https://khipu-${AWS_ACCOUNT_ID}.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/
            //khipu-${AWS_ACCOUNT_ID}.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/:_authToken=${CODEARTIFACT_AUTH_TOKEN}
            //khipu-${AWS_ACCOUNT_ID}.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/:always-auth=true
            EOF

          # Create prerelease version
          - |
            CURRENT_VERSION=$(node -p "require('./package.json').version")
            PRERELEASE_VERSION="${CURRENT_VERSION}-pr.${BITBUCKET_PR_ID}.${BITBUCKET_BUILD_NUMBER}"
            npm version $PRERELEASE_VERSION --no-git-tag-version

          # Publish prerelease
          - npm publish --tag pr-$BITBUCKET_PR_ID

          # Output for PR comment
          - echo "Published @khipu/design-system@${PRERELEASE_VERSION}"
          - echo "Install with: npm install @khipu/design-system@${PRERELEASE_VERSION}"

pipelines:
  pull-requests:
    '**':
      - step: *install
      - parallel:
          - step: *lint
          - step: *typecheck
          - step: *test
      - step: *build
      - step: *publish-prerelease
```

---

## DEPLOY-010: Create Bitbucket Pipeline for Release Publishing
**Status:** ⬜ To Do
**Priority:** 🔴 Critical
**Story Points:** 5
**Labels:** `ci-cd`, `bitbucket`, `release`
**Assignee:** _Unassigned_
**Depends On:** DEPLOY-009

### Description
Create pipeline configuration for publishing stable releases when code is merged to main branch and a release is created.

### Acceptance Criteria
- [ ] Pipeline triggers on merge to main (optional auto-publish)
- [ ] Pipeline triggers on tag push (release)
- [ ] Publishes to CodeArtifact with proper version
- [ ] Creates git tag for release
- [ ] Updates CHANGELOG.md

### Implementation

#### bitbucket-pipelines.yml (Part 2: Release)
```yaml
# bitbucket-pipelines.yml (continued)

pipelines:
  # ... pull-requests section from DEPLOY-009 ...

  branches:
    main:
      - step: *install
      - parallel:
          - step: *lint
          - step: *typecheck
          - step: *test
      - step: *build
      - step:
          name: Publish Release
          oidc: true
          trigger: manual  # Manual trigger for production releases
          script:
            # Assume AWS role via OIDC
            - export AWS_REGION=us-east-1
            - export AWS_ROLE_ARN=$BITBUCKET_PUBLISHER_ROLE_ARN

            # Configure git for tagging
            - git config user.email "ci@khipu.com"
            - git config user.name "Bitbucket Pipelines"

            # Get CodeArtifact auth token
            - |
              export CODEARTIFACT_AUTH_TOKEN=$(aws codeartifact get-authorization-token \
                --domain khipu \
                --query authorizationToken \
                --output text)

            # Configure npm
            - |
              cat > .npmrc << EOF
              @khipu:registry=https://khipu-${AWS_ACCOUNT_ID}.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/
              //khipu-${AWS_ACCOUNT_ID}.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/:_authToken=${CODEARTIFACT_AUTH_TOKEN}
              //khipu-${AWS_ACCOUNT_ID}.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/:always-auth=true
              EOF

            # Run release (bumps version, updates changelog, creates tag)
            - npm run release

            # Push tag back to repository
            - git push --follow-tags origin main

            # Publish to CodeArtifact
            - npm publish

            # Output
            - |
              VERSION=$(node -p "require('./package.json').version")
              echo "✅ Published @khipu/design-system@${VERSION}"

  tags:
    'v*':
      - step: *install
      - step: *build
      - step:
          name: Publish Tagged Release
          oidc: true
          script:
            - export AWS_REGION=us-east-1
            - export AWS_ROLE_ARN=$BITBUCKET_PUBLISHER_ROLE_ARN

            - |
              export CODEARTIFACT_AUTH_TOKEN=$(aws codeartifact get-authorization-token \
                --domain khipu \
                --query authorizationToken \
                --output text)

            - |
              cat > .npmrc << EOF
              @khipu:registry=https://khipu-${AWS_ACCOUNT_ID}.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/
              //khipu-${AWS_ACCOUNT_ID}.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/:_authToken=${CODEARTIFACT_AUTH_TOKEN}
              //khipu-${AWS_ACCOUNT_ID}.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/:always-auth=true
              EOF

            - npm publish
```

---

## DEPLOY-011: Configure Bitbucket Repository Variables
**Status:** ⬜ To Do
**Priority:** 🔴 Critical
**Story Points:** 1
**Labels:** `ci-cd`, `bitbucket`, `configuration`
**Assignee:** _Unassigned_

### Description
Configure required environment variables in Bitbucket repository settings for the pipeline to function.

### Acceptance Criteria
- [ ] AWS_ACCOUNT_ID configured
- [ ] BITBUCKET_PUBLISHER_ROLE_ARN configured
- [ ] Variables are secured (not exposed in logs)

### Implementation

#### Required Repository Variables

| Variable | Value | Secured |
|----------|-------|---------|
| `AWS_ACCOUNT_ID` | `123456789012` | No |
| `BITBUCKET_PUBLISHER_ROLE_ARN` | `arn:aws:iam::123456789012:role/BitbucketCodeArtifactPublisher` | No |

#### Setup Steps
1. Go to Repository Settings → Pipelines → Repository Variables
2. Add each variable
3. Mark sensitive values as "Secured"

#### OIDC Configuration
1. Go to Repository Settings → Pipelines → OpenID Connect
2. Enable OIDC
3. Note the Identity Provider URL and Audience values
4. Use these to configure the AWS IAM OIDC provider (DEPLOY-004)

---

# Epic 4: Consumer App Configuration

## DEPLOY-012: Create Consumer App Setup Guide
**Status:** ⬜ To Do
**Priority:** 🟠 High
**Story Points:** 3
**Labels:** `documentation`, `consumer`
**Assignee:** _Unassigned_

### Description
Create comprehensive documentation for consumer applications to install and configure the design system from CodeArtifact.

### Acceptance Criteria
- [ ] Step-by-step setup instructions
- [ ] Dockerfile configuration for containerized apps
- [ ] ECS/EKS configuration examples
- [ ] Troubleshooting guide

### Documentation Content

#### Consumer Setup Guide

##### Option 1: Local Development with AWS CLI

```bash
# 1. Ensure AWS CLI is configured with appropriate credentials
aws configure

# 2. Login to CodeArtifact (creates/updates .npmrc)
aws codeartifact login \
  --tool npm \
  --domain khipu \
  --repository npm-packages \
  --region us-east-1

# 3. Install the design system
npm install @khipu/design-system

# 4. Token expires in 12 hours, re-run step 2 when needed
```

##### Option 2: Dockerfile for Container Builds

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder

# Install AWS CLI
RUN apk add --no-cache aws-cli

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Arguments for CodeArtifact auth
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION=us-east-1

# Configure AWS and login to CodeArtifact
RUN aws codeartifact login \
    --tool npm \
    --domain khipu \
    --repository npm-packages \
    --region $AWS_REGION

# Install dependencies (including @khipu/design-system)
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

##### Option 3: ECS Task with IAM Role

```bash
# In ECS task, the IAM role provides credentials automatically
# Add this script to your container entrypoint

#!/bin/bash
# entrypoint.sh

# Login to CodeArtifact using task IAM role
aws codeartifact login \
  --tool npm \
  --domain khipu \
  --repository npm-packages \
  --region us-east-1

# Run the actual application
exec "$@"
```

##### Option 4: CI/CD Pipeline (Bitbucket)

```yaml
# bitbucket-pipelines.yml for consumer app
image: node:20

pipelines:
  default:
    - step:
        name: Build
        oidc: true
        script:
          # Get CodeArtifact token
          - |
            export CODEARTIFACT_AUTH_TOKEN=$(aws codeartifact get-authorization-token \
              --domain khipu \
              --query authorizationToken \
              --output text)

          # Configure npm
          - |
            cat > .npmrc << EOF
            @khipu:registry=https://khipu-${AWS_ACCOUNT_ID}.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/
            //khipu-${AWS_ACCOUNT_ID}.d.codeartifact.us-east-1.amazonaws.com/npm/npm-packages/:_authToken=${CODEARTIFACT_AUTH_TOKEN}
            EOF

          # Install and build
          - npm ci
          - npm run build
```

---

## DEPLOY-013: Create Token Refresh Automation for Long-Running Processes
**Status:** ⬜ To Do
**Priority:** 🟡 Medium
**Story Points:** 2
**Labels:** `infrastructure`, `automation`
**Assignee:** _Unassigned_

### Description
CodeArtifact tokens expire after 12 hours. For CI/CD and container builds this is fine, but for local development or long-running build servers, we need a token refresh mechanism.

### Implementation

#### Token Refresh Script
```bash
#!/bin/bash
# scripts/refresh-codeartifact-token.sh

set -e

DOMAIN="khipu"
REPOSITORY="npm-packages"
REGION="us-east-1"

echo "🔄 Refreshing CodeArtifact token..."

aws codeartifact login \
  --tool npm \
  --domain $DOMAIN \
  --repository $REPOSITORY \
  --region $REGION

echo "✅ Token refreshed. Valid for 12 hours."
```

#### Cron Job for Build Servers
```bash
# Add to crontab (every 10 hours)
0 */10 * * * /path/to/refresh-codeartifact-token.sh >> /var/log/codeartifact-refresh.log 2>&1
```

---

# Epic 5: Testing & Validation

## DEPLOY-014: Create End-to-End Publishing Test
**Status:** ⬜ To Do
**Priority:** 🟠 High
**Story Points:** 3
**Labels:** `testing`, `validation`
**Assignee:** _Unassigned_
**Depends On:** All DEPLOY-001 through DEPLOY-010

### Description
Create a comprehensive test to validate the entire publishing flow works correctly before going live.

### Acceptance Criteria
- [ ] Test publishing a package version
- [ ] Test installing the package in a fresh project
- [ ] Test that package works correctly when imported
- [ ] Test prerelease workflow
- [ ] Document any issues found

### Test Script
```bash
#!/bin/bash
# test/e2e-publish-test.sh

set -e

echo "🧪 E2E Publishing Test"
echo "======================"

# 1. Build the package
echo "📦 Building package..."
npm run build

# 2. Create test version
TEST_VERSION="0.0.0-test.$(date +%s)"
echo "🏷️  Creating test version: $TEST_VERSION"
npm version $TEST_VERSION --no-git-tag-version

# 3. Login to CodeArtifact
echo "🔐 Logging into CodeArtifact..."
aws codeartifact login \
  --tool npm \
  --domain khipu \
  --repository npm-packages \
  --region us-east-1

# 4. Publish test version
echo "📤 Publishing test version..."
npm publish --tag test

# 5. Create test consumer project
echo "📁 Creating test consumer project..."
TEST_DIR=$(mktemp -d)
cd $TEST_DIR
npm init -y

# 6. Install the test version
echo "📥 Installing test version..."
npm install @khipu/design-system@$TEST_VERSION

# 7. Verify installation
echo "✅ Verifying installation..."
node -e "
const ds = require('@khipu/design-system');
console.log('Exports:', Object.keys(ds));
if (ds.Button && ds.tokens) {
  console.log('✅ Package works correctly!');
  process.exit(0);
} else {
  console.log('❌ Package exports are incorrect');
  process.exit(1);
}
"

# 8. Cleanup
echo "🧹 Cleaning up..."
cd -
rm -rf $TEST_DIR

# 9. Deprecate test version (optional)
echo "🗑️  Deprecating test version..."
npm deprecate @khipu/design-system@$TEST_VERSION "Test version - do not use"

echo ""
echo "✅ E2E test completed successfully!"
```

---

## DEPLOY-015: Create Rollback Procedure
**Status:** ⬜ To Do
**Priority:** 🟡 Medium
**Story Points:** 2
**Labels:** `documentation`, `operations`
**Assignee:** _Unassigned_

### Description
Document the procedure to rollback to a previous version if a bad release is published.

### Rollback Procedure

#### Option 1: Deprecate Bad Version
```bash
# Mark the bad version as deprecated (users see warning but can still install)
npm deprecate @khipu/design-system@0.2.0 "This version has a critical bug. Use 0.1.5 instead."
```

#### Option 2: Unpublish (Within 72 hours only)
```bash
# CAUTION: Only works within 72 hours of publish
# This removes the version entirely
npm unpublish @khipu/design-system@0.2.0
```

#### Option 3: Publish Patch Fix
```bash
# Recommended approach: publish a fix
git revert <bad-commit>
npm run release  # Creates 0.2.1
npm publish
```

#### Consumer App Rollback
```bash
# Pin to previous version
npm install @khipu/design-system@0.1.5

# Or use version range in package.json
"@khipu/design-system": "~0.1.5"
```

---

# Summary

## Deployment Checklist

### Phase 1: AWS Infrastructure (via AWS CLI)
- [ ] DEPLOY-001: Create CodeArtifact Domain
- [ ] DEPLOY-002: Create npm Repository
- [ ] DEPLOY-003: Create IAM Policies
- [ ] DEPLOY-004: Create Bitbucket OIDC Role
- [ ] DEPLOY-005: Attach Consumer Policies

### Phase 2: Package Configuration
- [ ] DEPLOY-006: Update package.json
- [ ] DEPLOY-007: Create .npmrc templates
- [ ] DEPLOY-008: Setup Semantic Versioning

### Phase 3: CI/CD Pipeline
- [ ] DEPLOY-009: PR Validation Pipeline
- [ ] DEPLOY-010: Release Publishing Pipeline
- [ ] DEPLOY-011: Configure Repository Variables

### Phase 4: Consumer Setup
- [ ] DEPLOY-012: Consumer Setup Guide
- [ ] DEPLOY-013: Token Refresh Automation

### Phase 5: Validation
- [ ] DEPLOY-014: E2E Publishing Test
- [ ] DEPLOY-015: Rollback Procedure

---

## By Priority

| Priority | Count |
|----------|-------|
| 🔴 Critical | 8 |
| 🟠 High | 4 |
| 🟡 Medium | 3 |
| 🟢 Low | 0 |

## Estimated Effort

| Phase | Tasks | Method |
|-------|-------|--------|
| AWS Infrastructure | 5 | AWS CLI |
| Package Configuration | 3 | Code changes |
| CI/CD Pipeline | 3 | Bitbucket config |
| Consumer Setup | 2 | Documentation |
| Validation | 2 | Scripts |
| **Total** | **15** | |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DEVELOPMENT FLOW                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Developer                    Bitbucket                    AWS       │
│  ─────────                    ─────────                    ───       │
│                                                                      │
│  ┌──────────┐    git push    ┌──────────────┐                       │
│  │  Local   │ ──────────────▶│   PR Branch  │                       │
│  │   Dev    │                │              │                       │
│  └──────────┘                └──────┬───────┘                       │
│                                     │                                │
│                              ┌──────▼───────┐     OIDC      ┌──────┐│
│                              │   Pipeline   │◀─────────────▶│ IAM  ││
│                              │  (Validate)  │               │ Role ││
│                              └──────┬───────┘               └──────┘│
│                                     │                                │
│                              ┌──────▼───────┐              ┌───────┐│
│                              │   Publish    │─────────────▶│ Code  ││
│                              │  Prerelease  │              │Artifct││
│                              └──────────────┘              │       ││
│                                                            │  npm  ││
│  ┌──────────┐    merge       ┌──────────────┐              │ pkgs  ││
│  │ Approved │ ──────────────▶│    main      │              │       ││
│  │    PR    │                │   branch     │              └───┬───┘│
│  └──────────┘                └──────┬───────┘                  │    │
│                                     │                          │    │
│                              ┌──────▼───────┐                  │    │
│                              │   Pipeline   │                  │    │
│                              │  (Release)   │──────────────────┘    │
│                              └──────────────┘                       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         CONSUMER FLOW                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌───────────────┐         ┌─────────────┐         ┌─────────────┐ │
│  │  Consumer App │         │     ECS     │         │ CodeArtifact│ │
│  │   (Build)     │────────▶│  Task Role  │────────▶│   npm repo  │ │
│  │               │  assume │             │   pull  │             │ │
│  └───────────────┘         └─────────────┘         └─────────────┘ │
│                                                                      │
│  npm install @khipu/design-system                                   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Quick Reference Commands

### For Design System Maintainers

```bash
# Login to CodeArtifact
aws codeartifact login --tool npm --domain khipu --repository npm-packages --region us-east-1

# Create prerelease
npm run release:prerelease
npm publish --tag next

# Create stable release
npm run release
git push --follow-tags
npm publish

# View published versions
npm view @khipu/design-system versions
```

### For Consumer App Developers

```bash
# Login to CodeArtifact
aws codeartifact login --tool npm --domain khipu --repository npm-packages --region us-east-1

# Install latest stable
npm install @khipu/design-system

# Install specific version
npm install @khipu/design-system@0.2.0

# Install prerelease for testing
npm install @khipu/design-system@next

# Install PR prerelease
npm install @khipu/design-system@pr-123
```

---

*This deployment plan was generated for the Khipu Design System project.*
