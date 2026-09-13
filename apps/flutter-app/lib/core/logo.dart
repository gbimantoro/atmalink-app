import 'package:flutter/material.dart';
import 'theme.dart';

enum AtmaLogoVariant { horizontal, vertical, mark, white }

class AtmaLinkLogoWidget extends StatelessWidget {
  final AtmaLogoVariant variant;
  final double? size;
  final bool showTagline;

  const AtmaLinkLogoWidget({
    Key? key,
    this.variant = AtmaLogoVariant.horizontal,
    this.size,
    this.showTagline = true,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    switch (variant) {
      case AtmaLogoVariant.mark:
        return CustomPaint(
          size: Size(size ?? 44, size ?? 44),
          painter: AtmaMarkPainter(),
        );

      case AtmaLogoVariant.vertical:
        return Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            CustomPaint(
              size: Size(size ?? 72, size ?? 72),
              painter: AtmaMarkPainter(),
            ),
            const SizedBox(height: 8),
            RichText(
              textAlign: TextAlign.center,
              text: const TextSpan(
                style: TextStyle(
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: 22,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 0.5,
                ),
                children: [
                  TextSpan(text: 'ATMA', style: TextStyle(color: AtmaColors.atmaForest)),
                  TextSpan(text: 'LINK', style: TextStyle(color: AtmaColors.linkOrange)),
                ],
              ),
            ),
            if (showTagline) ...[
              const SizedBox(height: 4),
              const Text(
                'Menjalin Akar, Membangun Karya Global',
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.w600,
                  color: AtmaColors.textSecondary,
                ),
              ),
            ],
          ],
        );

      case AtmaLogoVariant.white:
        return Row(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            CustomPaint(
              size: Size(size ?? 40, size ?? 40),
              painter: AtmaMarkPainter(colorOverride: Colors.white),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                RichText(
                  text: const TextSpan(
                    style: TextStyle(
                      fontFamily: 'Plus Jakarta Sans',
                      fontSize: 20,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 0.5,
                    ),
                    children: [
                      TextSpan(text: 'ATMA', style: TextStyle(color: Colors.white)),
                      TextSpan(text: 'LINK', style: TextStyle(color: Color(0xFFFFB088))),
                    ],
                  ),
                ),
                if (showTagline)
                  const Text(
                    'Menjalin Akar, Membangun Karya Global',
                    style: TextStyle(fontSize: 9, fontWeight: FontWeight.w500, color: Colors.white70),
                  ),
              ],
            ),
          ],
        );

      case AtmaLogoVariant.horizontal:
      default:
        return Row(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            CustomPaint(
              size: Size(size ?? 40, size ?? 40),
              painter: AtmaMarkPainter(),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                RichText(
                  text: const TextSpan(
                    style: TextStyle(
                      fontFamily: 'Plus Jakarta Sans',
                      fontSize: 20,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 0.5,
                    ),
                    children: [
                      TextSpan(text: 'ATMA', style: TextStyle(color: AtmaColors.atmaForest)),
                      TextSpan(text: 'LINK', style: TextStyle(color: AtmaColors.linkOrange)),
                    ],
                  ),
                ),
                if (showTagline)
                  const Text(
                    'Menjalin Akar, Membangun Karya Global',
                    style: TextStyle(fontSize: 9, fontWeight: FontWeight.w600, color: AtmaColors.textSecondary),
                  ),
              ],
            ),
          ],
        );
    }
  }
}

/// Custom Vector Painter for ATMALINK Mark (Green A + Soaring Orange Dove)
class AtmaMarkPainter extends CustomPainter {
  final Color? colorOverride;

  AtmaMarkPainter({this.colorOverride});

  @override
  void paint(Canvas canvas, Size size) {
    final scale = size.width / 120.0;
    canvas.scale(scale, scale);

    final greenPaint = Paint()
      ..color = colorOverride ?? AtmaColors.atmaForest
      ..style = PaintingStyle.fill
      ..isAntiAlias = true;

    final orangePaint = Paint()
      ..color = colorOverride ?? AtmaColors.linkOrange
      ..style = PaintingStyle.fill
      ..isAntiAlias = true;

    // 1. Left stem of "A"
    final pathALeft = Path()
      ..moveTo(50, 16)
      ..lineTo(22, 96)
      ..lineTo(38, 96)
      ..lineTo(47, 70)
      ..lineTo(58, 70)
      ..lineTo(61, 60)
      ..lineTo(49, 60)
      ..lineTo(56, 38)
      ..close();
    canvas.drawPath(pathALeft, greenPaint);

    // 2. Right stem of "A"
    final pathARight = Path()
      ..moveTo(64, 16)
      ..lineTo(98, 96)
      ..lineTo(82, 96)
      ..lineTo(75, 74)
      ..lineTo(66, 74)
      ..lineTo(63, 64)
      ..lineTo(79, 64)
      ..lineTo(61, 22)
      ..close();
    canvas.drawPath(pathARight, greenPaint);

    // 3. Apex of "A"
    final pathACap = Path()
      ..moveTo(50, 16)
      ..lineTo(64, 16)
      ..lineTo(60, 26)
      ..lineTo(54, 26)
      ..close();
    canvas.drawPath(pathACap, greenPaint);

    // 4. Dove Body & Wings (Soaring across "A")
    final doveBody = Path()
      ..moveTo(32, 72)
      ..cubicTo(34, 68, 38, 64, 44, 63)
      ..cubicTo(50, 62, 55, 58, 60, 52)
      ..cubicTo(64, 47, 69, 44, 75, 42)
      ..cubicTo(80, 41, 86, 43, 92, 46)
      ..lineTo(94, 50)
      ..cubicTo(97, 51, 98, 53, 97, 55)
      ..cubicTo(91, 54, 88, 56, 82, 60)
      ..cubicTo(76, 68, 68, 73, 60, 78)
      ..cubicTo(52, 79, 40, 76, 32, 72)
      ..close();
    canvas.drawPath(doveBody, orangePaint);

    // Dove Wing Soaring
    final doveWing = Path()
      ..moveTo(55, 56)
      ..cubicTo(60, 48, 68, 34, 82, 20)
      ..cubicTo(83, 23, 81, 28, 78, 32)
      ..cubicTo(84, 27, 89, 24, 94, 22)
      ..cubicTo(92, 27, 87, 32, 83, 36)
      ..cubicTo(88, 33, 93, 31, 96, 31)
      ..cubicTo(94, 35, 88, 40, 84, 43)
      ..cubicTo(80, 47, 72, 53, 66, 57)
      ..close();
    canvas.drawPath(doveWing, orangePaint);

    // Dove Tail
    final doveTail = Path()
      ..moveTo(32, 72)
      ..cubicTo(27, 75, 22, 80, 18, 86)
      ..cubicTo(24, 83, 30, 80, 36, 78)
      ..cubicTo(30, 83, 26, 88, 23, 93)
      ..cubicTo(30, 88, 37, 84, 43, 81)
      ..cubicTo(40, 88, 47, 82, 52, 79)
      ..close();
    canvas.drawPath(doveTail, orangePaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
