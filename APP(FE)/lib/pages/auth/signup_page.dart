import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:ky2/components/Button.dart';
import 'package:ky2/components/TextField.dart' as ky2;
import 'package:ky2/core/base_screen.dart';
import 'package:ky2/core/base_viewmodel.dart';
import 'package:ky2/pages/auth/signinfo_page.dart';
import 'package:ky2/utils/ky2_color.dart';
import 'package:ky2/viewmodel/main_viewmodel.dart';
import 'package:ky2/viewmodel/signup_viewmodel.dart';

class SignupPage extends StatelessWidget {
  const SignupPage({Key? key}) : super(key: key);

  static Route route() {
    return MaterialPageRoute<void>(builder: (_) => const SignupPage());
  }

  @override
  Widget build(BuildContext context) {
    return BaseScreen<SignUpViewModel>(
      onModelReady: (model) {
        model.initState(context);
      },
      builder: (context, model, child) {
        return Scaffold(
          appBar: AppBar(
            leading: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                GestureDetector(
                  onTap: () => Navigator.of(context).pop(),
                  child: Image.asset(
                    'assets/ic_back.png',
                    width: 30,
                    height: 30,
                  ),
                ),
              ],
            ),
            backgroundColor: ky2Color.white,
            elevation: 0,
          ),
          resizeToAvoidBottomInset: true,
          backgroundColor: Colors.white,
          body: model.state == ViewState.BUSY ? Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('블록체인 노드를 생성중...'),
                SizedBox(height: 15),
                CircularProgressIndicator()
              ],
            ),
          ):  _body(context, model),
        );
      },
    );
  }
}

extension on SignupPage {
  Widget _body(BuildContext context, SignUpViewModel model) {
    return Stack(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(24, 18, 24, 24),
          child: ListView(
            children: [
              const Text(
                '회원가입',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w800,
                ),
                textAlign: TextAlign.start,
              ),
              SizedBox(height: 8),
              const Text(
                '회원정보를 입력하고 회원가입을 진행해주세요!',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.normal,
                ),
                textAlign: TextAlign.start,
              ),
              const SizedBox(height: 21),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    '군번',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.normal,
                    ),
                    textAlign: TextAlign.start,
                  ),
                  SizedBox(height: 6),
                  ky2.TextField(
                    textSize: 16,
                    controller: model.id,
                    hintText: "군번을 입력해주세요",
                  ),
                ],
              ),
              const SizedBox(height: 14),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    '이름',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.normal,
                    ),
                    textAlign: TextAlign.start,
                  ),
                  SizedBox(height: 6),
                  ky2.TextField(
                    controller: model.name,
                    textSize: 16,
                    hintText: "이름을 입력해주세요",
                  ),
                ],
              ),
              const SizedBox(height: 18),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  const Text(
                    '직책',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.normal,
                    ),
                    textAlign: TextAlign.start,
                  ),
                  SizedBox(height: 6),
                  ky2.TextField(
                    controller: model.position,
                    textSize: 16,
                    hintText: "직책을 입력해주세요",
                  ),
                ],
              ),
              const SizedBox(height: 18),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  const Text(
                    '계급',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.normal,
                    ),
                    textAlign: TextAlign.start,
                  ),
                  SizedBox(height: 6),
                  ky2.TextField(
                    controller: model.className,
                    textSize: 16,
                    hintText: "계급을 입력해주세요",
                  ),
                ],
              ),
              const SizedBox(height: 18),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    '비밀번호',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.normal,
                    ),
                    textAlign: TextAlign.start,
                  ),
                  SizedBox(height: 6),
                  ky2.TextField(
                    textSize: 16,
                    hintText: "비밀번호를 입력해주세요",
                    type: ky2.TextFieldType.password,
                    controller: model.pwd,
                  ),
                ],
              ),
              const SizedBox(height: 50),
            ],
          ),
        ),
        Positioned(
          bottom: 24,
          right: 24,
          left: 24,
          child: Button(
            text: '다음',
            height: 48,
            fontSize: 16,
            borderRadius: const BorderRadius.all(Radius.circular(8)),
            onPressed: () {
              model.onClickNext(context);
            },
          ),
        )
      ],
    );
  }
}
