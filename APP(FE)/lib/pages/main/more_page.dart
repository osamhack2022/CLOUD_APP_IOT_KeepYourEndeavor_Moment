import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:ky2/components/Button.dart';
import 'package:ky2/components/TextField.dart' as ky2;
import 'package:ky2/core/base_screen.dart';
import 'package:ky2/pages/auth/signup_page.dart';
import 'package:ky2/pages/issue/issue_list_page.dart';
import 'package:ky2/pages/issue/issue_page.dart';
import 'package:ky2/utils/ky2_color.dart';
import 'package:ky2/viewmodel/main_viewmodel.dart';

class MorePage extends StatelessWidget {
  const MorePage({Key? key}) : super(key: key);

  static Route route() {
    return MaterialPageRoute<void>(builder: (_) => const MorePage());
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

extension on MorePage {
  Widget _body(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 24, 24, 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 44),
          const SizedBox(height: 9),
          const Text(
            '더보기',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.start,
          ),
          const SizedBox(height: 20),
          const Text(
            '평가',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.normal,
            ),
          ),
          SizedBox(height: 10),
          Container(
            child: SizedBox(),
            width: MediaQuery.of(context).size.width,
            height: 1,
            color: ky2Color.dividerColor,
          ),
          SizedBox(height: 10),
          GestureDetector(
            onTap: (){
              Navigator.of(context).push(IssueListPage.route());
            },
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '내가 신청한 평가',
                  style: TextStyle(color: ky2Color.black, fontSize: 16),
                ),
                SvgPicture.asset('assets/ic_right.svg')
              ],
            ),
          ),
          SizedBox(height: 50),

          Text(
            '앱정보',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.normal,
            ),
          ),
          SizedBox(height: 10),
          Container(
            child: SizedBox(),
            width: MediaQuery.of(context).size.width,
            height: 1,
            color: ky2Color.dividerColor,
          ),
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '앱 버전',
                style: TextStyle(color: ky2Color.black, fontSize: 16),
              ),
              Text(
                'v1.0.0',
                style: TextStyle(color: ky2Color.black, fontSize: 16),
              ),
            ],
          ),
          const SizedBox(height: 20),
          GestureDetector(
            child: const Text(
              '회원탈퇴',
              style: TextStyle(color: Colors.red, fontSize: 16),
            ),
          ),

        ],
      ),
    );
  }
}
