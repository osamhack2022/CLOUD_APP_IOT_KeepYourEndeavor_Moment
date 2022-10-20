import 'package:flutter/material.dart';
import 'package:flutter/material.dart' as Material;

// disabled, default

class ButtonColors {
  ButtonColors({
    required this.backgroundColor,
    required this.textColor,
  });
  final Color backgroundColor;
  final Color textColor;

  ButtonColors copyWith({
    Color? backgroundColor,
    Color? textColor,
  }) {
    return ButtonColors(
      backgroundColor: backgroundColor ?? this.backgroundColor,
      textColor: textColor ?? this.textColor,
    );
  }

  ButtonColors merge(ButtonColors? other) {
    if (other == null) return this;
    return copyWith(
      backgroundColor: other.backgroundColor,
      textColor: other.textColor,
    );
  }
}

class _ButtonDefaultColors {
  const _ButtonDefaultColors(this._theme);
  _ButtonDefaultColors.of(BuildContext context) : this(Theme.of(context));

  final ThemeData _theme;

  ButtonColors get _positive => ButtonColors(
        textColor: _theme.buttonColor,
        backgroundColor: _theme.primaryColor,
      );

  ButtonColors get _nagative => ButtonColors(
        // ! 정의된 컬러가 없슴니당...
        textColor: Color(0xff888888),
        backgroundColor: Color(0xfff6f6f6),
      );

  ButtonColors get _disabled => ButtonColors(
        textColor: _theme.buttonColor,
        backgroundColor: _theme.disabledColor,
      );
}

enum ButtonType {
  positive,
  negative,
}

class Button extends StatelessWidget {
  const Button({
    Key? key,
    this.margin = EdgeInsets.zero,
    this.width = double.infinity,
    this.height = 37,
    this.onPressed,
    required this.text,
    this.borderRadius = const BorderRadius.all(Radius.circular(28)),
    this.fontSize = 14,
    this.fontWeight = FontWeight.w600,
    this.positiveColors,
    this.negativeColors,
    this.disabledColors,
    this.disabled = false,
    this.type = ButtonType.positive,
    this.splashColor = Colors.transparent,
    this.highlightColor = Colors.transparent,
    this.hoverColor = Colors.transparent,
  }) : super(key: key);

  final String text;
  final double width;
  final double height;
  final EdgeInsets margin;
  final bool disabled;
  final ButtonType type;
  final VoidCallback? onPressed;

  final BorderRadiusGeometry borderRadius;
  final double fontSize;
  final FontWeight fontWeight;

  final ButtonColors? positiveColors;
  final ButtonColors? negativeColors;
  final ButtonColors? disabledColors;

  final Color splashColor;
  final Color highlightColor;
  final Color hoverColor;

  bool get _disabled => disabled;

  @override
  Widget build(BuildContext context) {
    var defaultColors = _ButtonDefaultColors.of(context);
    ButtonColors Function() _color = () {
      if (_disabled) return defaultColors._disabled.merge(disabledColors);
      if (type == ButtonType.negative)
        return defaultColors._nagative.merge(negativeColors);
      return defaultColors._positive.merge(positiveColors);
    };

    return Container(
      margin: margin,
      child: GestureDetector(
        onTap: onPressed,
        child: Material.Material(
          color: _color().backgroundColor,
          borderRadius: borderRadius,
          child: SizedBox(
            width: width,
            height: height,
            child: Center(
              child: Text(
                text,
                style: TextStyle(
                  fontSize: fontSize,
                  fontWeight: fontWeight,
                  color: _color().textColor,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
