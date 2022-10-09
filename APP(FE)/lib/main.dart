import 'package:flutter/material.dart';
import 'package:ky2/core/di_container.dart';
import 'package:ky2/pages/common/splash_page.dart';
import 'package:ky2/pages/main/main_page.dart';
import 'package:ky2/utils/ky2_color.dart';

Future<void> main() async {
  setupDiContainer();
  runApp(const Ky2App());
}

class Ky2App extends StatelessWidget {
  const Ky2App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GatewayApp',
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
