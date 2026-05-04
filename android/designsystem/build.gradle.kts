plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.compose.compiler)
    `maven-publish`
}

val libraryVersion = "0.1.0-alpha.55"

android {
    namespace = "com.khipu.designsystem"
    compileSdk = 35

    defaultConfig {
        minSdk = 24

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        consumerProguardFiles("consumer-rules.pro")
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    buildFeatures {
        compose = true
        buildConfig = true
    }

    publishing {
        singleVariant("release") {
            withSourcesJar()
        }
    }
}

dependencies {
    // Core Android
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)

    // Compose BOM
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.ui.tooling.preview)
    implementation(libs.androidx.material3)
    implementation(libs.androidx.material.icons.extended)

    // Debug
    debugImplementation(libs.androidx.ui.tooling)
    debugImplementation(libs.androidx.ui.test.manifest)

    // Testing
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.ui.test.junit4)
}

publishing {
    publications {
        register<MavenPublication>("release") {
            groupId = "com.khipu"
            artifactId = "design-system"
            version = libraryVersion

            afterEvaluate {
                from(components["release"])
            }

            pom {
                name.set("Khipu Design System")
                description.set("Khipu Design System for Android - Jetpack Compose components and tokens")
                url.set("https://github.com/khipu/design-system")

                licenses {
                    license {
                        name.set("Proprietary")
                        url.set("https://khipu.com")
                    }
                }

                developers {
                    developer {
                        id.set("khipu")
                        name.set("Khipu Team")
                        email.set("dev@khipu.com")
                    }
                }
            }
        }
    }

    repositories {
        mavenLocal()

        maven {
            name = "nexus"
            url = uri("https://dev.khipu.com/nexus/content/repositories/design-system")
            credentials {
                username = project.findProperty("khipuRepoUsername") as String? ?: ""
                password = project.findProperty("khipuRepoPassword") as String? ?: ""
            }
        }
    }
}
