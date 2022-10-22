import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:ky2/components/Button.dart';
import 'package:ky2/components/TextField.dart' as ky2;
import 'package:ky2/core/base_screen.dart';
import 'package:ky2/viewmodel/main_viewmodel.dart';
import 'package:ky2/components/Card.dart' as ky2;
import 'package:ky2/utils/ky2_color.dart';

class MainPage extends StatelessWidget {
  const MainPage({Key? key}) : super(key: key);

  static Route route() {
    return MaterialPageRoute<void>(builder: (_) => const MainPage());
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

extension on MainPage {
  Widget _body(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 24, 24, 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.only(top: 12),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                GestureDetector(
                  child: SvgPicture.asset(
                    'assets/ic_notification.svg',
                    width: 24,
                  ),
                )
              ],
            ),
          ),
          SizedBox(height: 18),
          const Text(
            '강은솔님의',
            style: TextStyle(
              fontSize: 32,
            ),
          ),
          Row(
            children: [
              Column(
                children: const [
                  SizedBox(
                    height: 3,
                  ),
                  Text(
                    '2',
                    style: TextStyle(
                      color: Colors.blue,
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              const Text(
                '개의 활동',
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                ),
              )
            ],
          ),
          const SizedBox(height: 15),
          ky2.Card(
            title: '체력측정',
            rank: '특급',
            date: DateTime(2022, 5, 11),
            backgroundColor: ky2Color.primary,
          ),
          SizedBox(height: 11),
          ky2.Card(
            title: '인권교육',
            rank: '이수',
            date: DateTime(2022, 5, 11),
            backgroundColor: Color(0xff58C922),
          )
        ],
      ),
    );
  }
}
