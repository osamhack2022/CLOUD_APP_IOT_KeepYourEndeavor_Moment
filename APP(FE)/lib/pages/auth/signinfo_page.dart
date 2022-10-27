import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:ky2/components/Button.dart';
import 'package:ky2/components/TextField.dart' as ky2;
import 'package:ky2/core/base_screen.dart';
import 'package:ky2/core/base_viewmodel.dart';
import 'package:ky2/pages/auth/bio_auth_page.dart';
import 'package:ky2/utils/ky2_color.dart';
import 'package:ky2/viewmodel/main_viewmodel.dart';
import 'package:ky2/viewmodel/signinfo_viewmodel.dart';

class SigninfoPage extends StatelessWidget {
  final String id;
  final String pwd;
  final String name;
  final String position;
  final String className;

  const SigninfoPage(
      {Key? key,
      required this.id,
      required this.pwd,
      required this.name,
      required this.position,
      required this.className})
      : super(key: key);

  static Route route({
    required String id,
    required String pwd,
    required String name,
    required String position,
    required String className,
  }) {
    return MaterialPageRoute<void>(
      builder: (_) => SigninfoPage(
        id: id,
        pwd: pwd,
        name: name,
        position: position,
        className: className,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return BaseScreen<SignInfoViewModel>(
      onModelReady: (model) {
        model.initState(context, id, pwd, name, position, className);
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
          ): _body(context, model),
        );
      },
    );
  }
}

extension on SigninfoPage {
  Widget _body(BuildContext context, SignInfoViewModel model) {
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
                children: <Widget>[
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
                    controller: model.cps,
                  ),
                ],
              ),
              const SizedBox(height: 18),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
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
                    controller: model.division,
                  ),
                ],
              ),
              const SizedBox(height: 18),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
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
                    controller: model.br,
                  ),
                ],
              ),
              const SizedBox(height: 18),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
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
                    controller: model.bn,
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
              model.onClickNext(context);
            },
          ),
        )
      ],
    );
  }
}
