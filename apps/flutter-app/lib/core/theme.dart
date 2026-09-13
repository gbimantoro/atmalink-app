import 'package:flutter/material.dart';

/// ATMALINK Design System - Flutter Theme
/// Platform Alumni Unika Atma Jaya (PERLUNI UAJ)
/// "Menjalin Akar, Membangun Karya Global"

class AtmaColors {
  // Primary: Atma Jaya Institutional Forest & Action Green
  static const Color atmaForest = Color(0xFF006633); // Official Brand Forest Green
  static const Color atmaAction = Color(0xFF00A859); // Buttons, Badges, CTAs
  static const Color atmaDark = Color(0xFF00331A);
  static const Color atmaLight = Color(0xFFE8F5E9);
  static const Color atmaMint = Color(0xFFA7F3D0);

  // Secondary Accent: PERLUNI Warm & Energetic Orange
  static const Color linkOrange = Color(0xFFEF5B2A); // Official Brand Accent Orange
  static const Color linkDark = Color(0xFFD84A1B);
  static const Color linkLight = Color(0xFFFFF7ED);
  static const Color linkPeach = Color(0xFFFFEDD5);

  // Semantics
  static const Color success = Color(0xFF10B981);
  static const Color warning = Color(0xFFF59E0B);
  static const Color error = Color(0xFFEF4444);
  static const Color info = Color(0xFF2563EB);

  // Neutrals
  static const Color background = Color(0xFFF8FAF8);
  static const Color surface = Color(0xFFFFFFFF);
  static const Color card = Color(0xFFFFFFFF);
  static const Color textPrimary = Color(0xFF0F172A);
  static const Color textSecondary = Color(0xFF64748B);
  static const Color textMuted = Color(0xFF94A3B8);
  static const Color divider = Color(0xFFE2E8F0);
  static const Color border = Color(0xFFE2E8F0);

  // Gradients
  static const LinearGradient greenHeader = LinearGradient(
    colors: [Color(0xFF007A3D), Color(0xFF005A2C)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient orangeAccent = LinearGradient(
    colors: [Color(0xFFFF6A13), Color(0xFFF15A24)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient alumniCard = LinearGradient(
    colors: [Color(0xFFFFFFFF), Color(0xFFF4FBF7), Color(0xFFFFF7ED)],
    stops: [0.0, 0.5, 1.0],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}

class AtmaRadius {
  static const double xs = 4.0;
  static const double sm = 8.0;
  static const double md = 12.0;
  static const double lg = 16.0;
  static const double xl = 24.0;
  static const double pill = 999.0;
}

final ThemeData appTheme = ThemeData(
  useMaterial3: true,
  scaffoldBackgroundColor: AtmaColors.background,
  fontFamily: 'Plus Jakarta Sans',
  colorScheme: ColorScheme.fromSeed(
    seedColor: AtmaColors.atmaForest,
    primary: AtmaColors.atmaForest,
    onPrimary: Colors.white,
    primaryContainer: AtmaColors.atmaLight,
    onPrimaryContainer: AtmaColors.atmaDark,
    secondary: AtmaColors.linkOrange,
    onSecondary: Colors.white,
    secondaryContainer: AtmaColors.linkLight,
    onSecondaryContainer: AtmaColors.linkDark,
    surface: AtmaColors.surface,
    onSurface: AtmaColors.textPrimary,
    background: AtmaColors.background,
    onBackground: AtmaColors.textPrimary,
    error: AtmaColors.error,
    onError: Colors.white,
  ),
  appBarTheme: const AppBarTheme(
    backgroundColor: AtmaColors.surface,
    foregroundColor: AtmaColors.textPrimary,
    elevation: 0,
    scrolledUnderElevation: 1,
    centerTitle: false,
    titleTextStyle: TextStyle(
      fontSize: 18,
      fontWeight: FontWeight.w700,
      color: AtmaColors.textPrimary,
    ),
  ),
  textTheme: const TextTheme(
    displayLarge: TextStyle(fontSize: 30, fontWeight: FontWeight.w800, color: AtmaColors.textPrimary, letterSpacing: -0.5),
    headlineLarge: TextStyle(fontSize: 24, fontWeight: FontWeight.w700, color: AtmaColors.textPrimary, letterSpacing: -0.3),
    headlineMedium: TextStyle(fontSize: 20, fontWeight: FontWeight.w700, color: AtmaColors.textPrimary),
    titleLarge: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: AtmaColors.textPrimary),
    titleMedium: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: AtmaColors.textPrimary),
    bodyLarge: TextStyle(fontSize: 16, fontWeight: FontWeight.w400, color: AtmaColors.textPrimary, height: 1.5),
    bodyMedium: TextStyle(fontSize: 14, fontWeight: FontWeight.w400, color: AtmaColors.textSecondary, height: 1.4),
    bodySmall: TextStyle(fontSize: 12, fontWeight: FontWeight.w400, color: AtmaColors.textMuted),
    labelLarge: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, letterSpacing: 0.2),
  ),
  inputDecorationTheme: InputDecorationTheme(
    filled: true,
    fillColor: AtmaColors.surface,
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(AtmaRadius.sm),
      borderSide: const BorderSide(color: AtmaColors.border),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(AtmaRadius.sm),
      borderSide: const BorderSide(color: AtmaColors.border),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(AtmaRadius.sm),
      borderSide: const BorderSide(color: AtmaColors.atmaForest, width: 2),
    ),
    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
    hintStyle: const TextStyle(color: AtmaColors.textMuted, fontSize: 14),
  ),
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: AtmaColors.atmaAction,
      foregroundColor: Colors.white,
      minimumSize: const Size.fromHeight(48),
      elevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AtmaRadius.pill)),
      textStyle: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700),
    ),
  ),
  outlinedButtonTheme: OutlinedButtonThemeData(
    style: OutlinedButton.styleFrom(
      foregroundColor: AtmaColors.textPrimary,
      side: const BorderSide(color: AtmaColors.border),
      minimumSize: const Size.fromHeight(48),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AtmaRadius.pill)),
      textStyle: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
    ),
  ),
  cardTheme: CardTheme(
    color: AtmaColors.card,
    elevation: 1,
    shadowColor: Colors.black.withOpacity(0.06),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(AtmaRadius.md),
      side: const BorderSide(color: AtmaColors.border, width: 0.5),
    ),
    margin: EdgeInsets.zero,
  ),
  bottomNavigationBarTheme: const BottomNavigationBarThemeData(
    backgroundColor: Colors.white,
    selectedItemColor: AtmaColors.atmaForest,
    unselectedItemColor: AtmaColors.textMuted,
    selectedLabelStyle: TextStyle(fontSize: 11, fontWeight: FontWeight.w700),
    unselectedLabelStyle: TextStyle(fontSize: 11, fontWeight: FontWeight.w500),
    type: BottomNavigationBarType.fixed,
    elevation: 8,
  ),
);