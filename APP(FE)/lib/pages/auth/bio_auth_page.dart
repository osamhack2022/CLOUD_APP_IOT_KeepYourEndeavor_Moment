import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:ky2/components/Button.dart';
import 'package:ky2/components/TextField.dart' as ky2;
import 'package:ky2/core/base_screen.dart';
import 'package:ky2/pages/main/main_tab.dart';
import 'package:ky2/utils/ky2_color.dart';
import 'package:ky2/viewmodel/bio_viewmodel.dart';
import 'package:ky2/viewmodel/main_viewmodel.dart';

class BioAuthPage extends StatelessWidget {
  const BioAuthPage({Key? key}) : super(key: key);

  static Route route() {
    return MaterialPageRoute<void>(builder: (_) => const BioAuthPage());
  }

  @override
  Widget build(BuildContext context) {
    return BaseScreen<BioViewModel>(
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

extension on BioAuthPage {
  Widget _body(BuildContext context) {
    return Stack(
      children: [
        Container(
          width: MediaQuery.of(context).size.width,
          padding: const EdgeInsets.fromLTRB(24, 18, 24, 24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                '생체인증 등록',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w800,
                ),
                textAlign: TextAlign.start,
              ),
              SizedBox(height: 8),
              const Text(
                '생체인증 정보를 등록해서\n간편하게 로그인해보세요',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.normal,
                ),
                textAlign: TextAlign.start,
              ),
              const SizedBox(height: 140),
              SizedBox(
                width: MediaQuery.of(context).size.width,
                child: Column(
                  children: [
                    SvgPicture.asset(
                      'assets/bio_lillust.svg',
                      width: 250,
                    )
                  ],
                ),
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
              Navigator.of(context).push(MainTab.route());
            },
          ),
        )
      ],
    );
  }
}
