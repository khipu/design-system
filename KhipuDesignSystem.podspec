Pod::Spec.new do |s|
  s.name             = 'KhipuDesignSystem'
  s.version          = '0.1.0-alpha.36'
  s.summary          = 'Khipu Design System for iOS - SwiftUI components and design tokens'

  s.description      = <<-DESC
  The Khipu Design System provides a comprehensive set of SwiftUI components and design tokens
  for building consistent payment experiences across iOS applications. It includes themed
  components, color tokens, typography, spacing, and more.
  DESC

  s.homepage         = 'https://github.com/khipu/design-system'
  s.license          = { :type => 'MIT', :file => 'LICENSE' }
  s.author           = { 'Khipu' => 'developers@khipu.com' }
  s.source           = { :git => 'https://github.com/khipu/design-system.git', :tag => "v#{s.version}" }

  s.ios.deployment_target = '15.0'
  s.swift_versions = '5.9'

  s.source_files = 'ios/Sources/**/*.swift'
  # Resource bundles commented out - no resources yet
  # s.resource_bundles = {
  #   'KhipuDesignSystem' => ['ios/Resources/**/*.{xcassets,json,ttf}']
  # }

  s.frameworks = 'SwiftUI', 'Foundation'
end