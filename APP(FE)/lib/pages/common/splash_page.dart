import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:ky2/core/base_screen.dart';
import 'package:ky2/utils/ky2_color.dart';
import 'package:ky2/viewmodel/splash_viewmodel.dart';

class SplashPage extends StatelessWidget {
  const SplashPage({Key? key}) : super(key: key);

  static Route route() {
    return MaterialPageRoute<void>(
      builder: (_) => const SplashPage(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return BaseScreen<SplashViewModel>(
      onModelReady: (model) {
        model.initState(context);
      },
      builder: (context, model, child) {
        return Scaffold(
          resizeToAvoidBottomInset: false,
          backgroundColor: Colors.white,
          body: _body(context),
        );
      },
    );
  }
}

extension on SplashPage {
  Widget _body(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Column(
            children: [
              SvgPicture.asset('assets/splash_logo.svg'),
              Text(
                '블록체인 기반 병자격 인증앱',
                style: TextStyle(
                  color: ky2Color.placeholder,
                  fontSize: 10,
                ),
              )
            ],
          )
        ],
      ),
    );
  }
}
