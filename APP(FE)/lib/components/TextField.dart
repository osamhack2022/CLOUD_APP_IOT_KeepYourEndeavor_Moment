import 'package:flutter/material.dart';
import 'package:flutter/material.dart' as Material;
import 'package:flutter/services.dart';
import 'package:ky2/utils/ky2_color.dart';

enum TextFieldType {
  text,
  password,
}

class TextField extends StatefulWidget {
  final String? hintText;
  final double? textSize;
  final TextFieldType? type;
  final bool? disabled;
  final TextInputType? keyboardType;
  final Function(String value)? onChange;
  final double? height;
  final double? width;
  final TextStyle? textStyle;
  final List<TextInputFormatter>? inputFormatters;
  final String? labelText;
  final TextEditingController? controller;

  const TextField({
    Key? key,
    this.hintText,
    this.controller,
    this.labelText,
    this.textSize,
    this.type,
    this.disabled,
    this.keyboardType,
    this.onChange,
    this.height = 48.0,
    this.width = double.maxFinite,
    this.textStyle = const TextStyle(),
    this.inputFormatters = const [],
  }) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return _TextFieldState();
  }
}

class _TextFieldState extends State<TextField> {
  final TextEditingController _controller = TextEditingController();

  TextEditingController get _effectiveController =>
      widget.controller ?? _controller;

  @override
  void initState() {
    if (widget.onChange != null) {
      _effectiveController.addListener(() {
        widget.onChange!(_effectiveController.text);
      });
    }

    super.initState();
  }

  @override
  Widget build(buildContext) {
    return Column(
      children: [
        widget.labelText != null
            ? Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  widget.labelText!,
                  style: TextStyle(
                    fontSize: 16,
                    height: 1.5,
                    color: ky2Color.black,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              )
            : const SizedBox(),
        Container(
          height: widget.height,
          width: widget.width,
          padding: EdgeInsets.only(left: 10),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(4),
            color: ky2Color.inputBackground,
          ),
          child: Material.TextField(
            keyboardType: widget.keyboardType,
            obscureText: widget.type == TextFieldType.password,
            style: widget.textStyle,
            controller: _effectiveController,
            inputFormatters: widget.inputFormatters,
            decoration: InputDecoration(
              enabledBorder:
                  const UnderlineInputBorder(borderSide: BorderSide.none),
              focusedBorder:
                  const UnderlineInputBorder(borderSide: BorderSide.none),
              hintText: widget.hintText,
              suffixIconConstraints: const BoxConstraints(
                maxHeight: 8,
                minWidth: 12,
              ),
              hintStyle: TextStyle(
                color: ky2Color.hintText,
                fontSize: 16,
                fontWeight: FontWeight.w300,
              ),
              contentPadding: const EdgeInsets.only(),
            ),
          ),
        ),
      ],
    );
  }
}
