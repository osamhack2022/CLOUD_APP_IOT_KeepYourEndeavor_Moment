import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:ky2/components/TextField.dart' as ky2;
import 'package:ky2/core/base_screen.dart';
import 'package:ky2/viewmodel/main_viewmodel.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({Key? key}) : super(key: key);

  static Route route() {
    return MaterialPageRoute<void>(builder: (_) => const LoginPage());
  }

  @override
  Widget build(BuildContext context) {
    return BaseScreen<MainViewModel>(
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

extension on LoginPage {
  Widget _body(BuildContext context) {
    return Center(
        child: Column(
      children: [
        SvgPicture.asset('assets/splash_logo.svg'),
        const ky2.TextField(
          hintText: "군번을 입력해주세요",
        ),
      ],
    ));
  }
}
