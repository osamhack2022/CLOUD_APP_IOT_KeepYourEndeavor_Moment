import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:ky2/components/Button.dart';
import 'package:ky2/components/TextField.dart' as ky2;
import 'package:ky2/core/base_screen.dart';
import 'package:ky2/pages/auth/bio_auth_page.dart';
import 'package:ky2/utils/ky2_color.dart';
import 'package:ky2/viewmodel/main_viewmodel.dart';

class SigninfoPage extends StatelessWidget {
  const SigninfoPage({Key? key}) : super(key: key);

  static Route route() {
    return MaterialPageRoute<void>(builder: (_) => const SigninfoPage());
  }

  @override
  Widget build(BuildContext context) {
    return BaseScreen<MainViewModel>(
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
          body: _body(context),
        );
      },
    );
  }
}

extension on SigninfoPage {
  Widget _body(BuildContext context) {
    return Stack(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(24, 18, 24, 24),
          child: ListView(
            children: [
              const Text(
                '부대정보',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w800,
                ),
                textAlign: TextAlign.start,
              ),
              SizedBox(height: 8),
              const Text(
                '정확한 부대 정보를 입력해주세요 해당하는 부분이 없다면 공백으로 남겨도 됩니다!',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.normal,
                ),
                textAlign: TextAlign.start,
              ),
              const SizedBox(height: 21),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const <Widget>[
                  Text(
                    '사령부',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.normal,
                    ),
                    textAlign: TextAlign.start,
                  ),
                  SizedBox(height: 6),
                  ky2.TextField(
                    textSize: 16,
                    hintText: "00지작사",
                  ),
                ],
              ),
              const SizedBox(height: 14),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const <Widget>[
                  Text(
                    '군단',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.normal,
                    ),
                    textAlign: TextAlign.start,
                  ),
                  SizedBox(height: 6),
                  ky2.TextField(
                    textSize: 16,
                    hintText: "00군단",
                  ),
                ],
              ),
              const SizedBox(height: 18),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const <Widget>[
                  Text(
                    '사단',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.normal,
                    ),
                    textAlign: TextAlign.start,
                  ),
                  SizedBox(height: 6),
                  ky2.TextField(
                    textSize: 16,
                    hintText: "00사단",
                    type: ky2.TextFieldType.password,
                  ),
                ],
              ),
              const SizedBox(height: 18),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const <Widget>[
                  Text(
                    '여단',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.normal,
                    ),
                    textAlign: TextAlign.start,
                  ),
                  SizedBox(height: 6),
                  ky2.TextField(
                    textSize: 16,
                    hintText: "00여단",
                    type: ky2.TextFieldType.password,
                  ),
                ],
              ),
              const SizedBox(height: 18),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const <Widget>[
                  Text(
                    '대대',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.normal,
                    ),
                    textAlign: TextAlign.start,
                  ),
                  SizedBox(height: 6),
                  ky2.TextField(
                    textSize: 16,
                    hintText: "00대대",
                    type: ky2.TextFieldType.password,
                  ),
                ],
              ),
              const SizedBox(height: 80),
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
              Navigator.of(context).push(BioAuthPage.route());
            },
          ),
        )
      ],
    );
  }
}
