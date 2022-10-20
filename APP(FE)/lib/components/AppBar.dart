import 'package:flutter/material.dart';
import 'package:flutter/material.dart' as Material;
import 'package:flutter_svg/flutter_svg.dart';
import 'package:ky2/utils/ky2_color.dart';

class AppBar extends StatelessWidget implements PreferredSizeWidget {
  AppBar({
    required this.preferredSize,
    required this.backgroundColor,
    this.title,
    this.leftButton,
    this.leftButtonExist = false,
    this.leftButtonColor,
    this.leftButtonAction,
    this.rightButton,
    this.opacity,
    this.bottom,
    this.bottomHeight,
    this.actionRightMargin = 14,
    this.brightness,
  });

  @override
  final Size preferredSize;

  final Color backgroundColor;
  final String? title;
  final Widget? leftButton;
  final bool? leftButtonExist;
  final Color? leftButtonColor;
  final Function? leftButtonAction;
  final Widget? rightButton;
  final double? opacity;
  final Widget? bottom;
  final double? bottomHeight;

  final double actionRightMargin;

  final Brightness? brightness;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: PreferredSize(
        preferredSize: null,
        child: Material.AppBar(
          leading: this.leftButtonExist
              ? this.leftButton ??
                  GestureDetector(
                    onTap: () async {
                      if (this.leftButtonAction != null) {
                        await this.leftButtonAction(context);
                        return;
                      }
                      Navigator.pop(context);
                    },
                    child: Container(
                      padding: EdgeInsets.fromLTRB(0, 19, 0, 19),
                      child: SvgPicture.asset(
                        "asset/icons/backward-arrow.svg",
                      ),
                    ),
                  )
              : SizedBox(),
          centerTitle: true,
          title: this.title != null
              ? Text(
                  this.title,
                  style: TextStyle(
                    fontSize: 17,
                    fontWeight: FontWeight.bold,
                    color: ky2Color.black,
                  ),
                )
              : SizedBox(),
          actions: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                this.rightButton,
                SizedBox(width: this.actionRightMargin)
              ].where((element) => element != null).toList(),
            )
          ],
          bottom: this.bottom != null
              ? this.bottom is PreferredSizeWidget
                  ? this.bottom
                  : PreferredSize(
                      child: this.bottom,
                      preferredSize: Size.fromHeight(
                        this.bottomHeight ?? 60,
                      ),
                    )
              : null,
          backgroundColor: this.opacity != null
              ? this.backgroundColor.withOpacity(this.opacity)
              : this.backgroundColor,
          elevation: 0.0,
          brightness: brightness,
        ),
      ),
    );
  }
}
