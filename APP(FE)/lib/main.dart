import 'dart:io';

import 'package:flutter/material.dart';
import 'package:ky2/core/di_container.dart';
import 'package:ky2/pages/common/splash_page.dart';
import 'package:ky2/pages/main/main_tab.dart';
import 'package:ky2/utils/ky2_color.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:flutter/services.dart';

Future<void> main() async {
  setupDiContainer();
  initializeDateFormatting().then((value) => runApp(const Ky2App()));
}

class Ky2App extends StatelessWidget {
  const Ky2App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations(
        [DeviceOrientation.portraitUp, DeviceOrientation.portraitDown]);
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarBrightness: Brightness.light,
      statusBarIconBrightness:
      Platform.isIOS ? Brightness.light : Brightness.dark,
    ));
    return MaterialApp(
      title: 'ky2',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: ky2Color.primary,
        splashColor: ky2Color.white,
        disabledColor: const Color(0xffefefef),
        visualDensity: VisualDensity.adaptivePlatformDensity,
        fontFamily: "NotoSansCJKkr",
      ),
      onGenerateRoute: (_) => SplashPage.route(),
    );
  }
}
