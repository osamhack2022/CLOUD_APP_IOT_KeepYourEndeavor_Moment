import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:ky2/components/Button.dart';
import 'package:ky2/core/base_screen.dart';
import 'package:ky2/core/base_viewmodel.dart';
import 'package:ky2/pages/issue/issue_page.dart';
import 'package:ky2/utils/ky2_color.dart';
import 'package:ky2/viewmodel/issue_list_viewmodel.dart';

import '../../viewmodel/issue_viewmodel.dart';

class IssueListPage extends StatelessWidget {
  const IssueListPage({Key? key}) : super(key: key);

  static Route route() {
    return MaterialPageRoute<void>(builder: (_) => const IssueListPage());
  }

  @override
  Widget build(BuildContext context) {
    return BaseScreen<IssueListViewModel>(
      onModelReady: (model) {
        model.initState(context);
      },
      builder: (context, model, child) {
        return Scaffold(
          resizeToAvoidBottomInset: false,
          backgroundColor: Colors.white,
          body: model.state == ViewState.BUSY
              ? Container(
                  width: double.infinity,
                  height: double.infinity,
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text('신청한 평가 불러오는 중...'),
                        SizedBox(height: 15),
                        CircularProgressIndicator()
                      ],
                    ),
                  ),
                )
              : _body(context, model),
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
        );
      },
    );
  }
}

extension on IssueListPage {
  Widget _body(BuildContext context, IssueListViewModel model) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 0, 24, 24),
      child: ListView(
        children: [
          const Text(
            '신청한 평가',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.start,
          ),
          SizedBox(height: 8),
          const Text(
            '신청한 평가 목록입니다.\n체력측정은 선택하여 응시가 가능합니다.',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.normal,
            ),
            textAlign: TextAlign.start,
          ),
          SizedBox(height: 24),
          ...model.issueList.map(
            (issue) => Container(
              decoration: BoxDecoration(
                color: const Color(0xffF5F9FA),
                borderRadius: BorderRadius.circular(4),
              ),
              padding: const EdgeInsets.all(12),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          SvgPicture.asset('assets/circle.svg'),
                          const SizedBox(width: 5),
                          const Text(
                            '08:00~09:30',
                            style: TextStyle(
                              fontSize: 14,
                              color: Color(0xffBDC1CB),
                            ),
                          )
                        ],
                      ),
                      const SizedBox(height: 6),
                      Text(
                        issue.notice_title,
                        style: const TextStyle(
                            fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        issue.issue_subjcet,
                        style: const TextStyle(
                          fontSize: 14,
                          color: Color(0xffBDC1CB),
                        ),
                      )
                    ],
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      GestureDetector(
                        child: Container(
                          child: const Text(
                            '평가보기',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          decoration: BoxDecoration(
                            color: ky2Color.primary,
                            borderRadius: BorderRadius.circular(4),
                          ),
                          padding: const EdgeInsets.fromLTRB(12, 6, 12, 6),
                        ),
                        onTap: () {
                          Navigator.of(context).push(IssuePage.route(issue.issue_id));
                        },
                      )
                    ],
                  )
                ],
              ),
            ),
          ),
          Expanded(child: SizedBox()),
          model.issueList.length == 0 ? Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(height: 100),
              Text(
                '아직 신청한 평가가 없습니다..\n 일정에서 신청해주세요!',
                style: TextStyle(
                  fontSize: 16,
                  color: ky2Color.placeholder,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ): SizedBox(),
          Expanded(child: SizedBox()),
        ],
      ),
    );
  }
}
