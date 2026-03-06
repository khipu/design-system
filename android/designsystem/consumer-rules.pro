# Consumer ProGuard rules for Khipu Design System
# These rules are automatically applied to consuming apps

# Keep Compose classes
-keep class androidx.compose.** { *; }

# Keep design system public API
-keep class com.khipu.designsystem.** { *; }
