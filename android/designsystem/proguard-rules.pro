# ProGuard rules for Khipu Design System library

# Keep all public classes and methods
-keep public class com.khipu.designsystem.** { public *; }

# Compose specific rules
-dontwarn androidx.compose.**
