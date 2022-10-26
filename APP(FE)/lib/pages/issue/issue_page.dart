import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:ky2/components/Button.dart';
import 'package:ky2/core/base_screen.dart';
import 'package:ky2/core/base_viewmodel.dart';
import 'package:ky2/utils/ky2_color.dart';

import '../../viewmodel/issue_viewmodel.dart';

class IssuePage extends StatelessWidget {
  final String issueId;

  const IssuePage({Key? key, required this.issueId}) : super(key: key);

  static Route route(String issueId) {
    return MaterialPageRoute<void>(
        builder: (_) => IssuePage(
              issueId: issueId,
            ));
  }

  @override
  Widget build(BuildContext context) {
    return BaseScreen<IssueViewModel>(
      onModelReady: (model) {
        model.initState(context, issueId);
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
                        Text('블루투스 기기 찾는중'),
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

extension on IssuePage {
  Widget _body(BuildContext context, IssueViewModel model) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 0, 24, 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            '체력측정',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.start,
          ),
          SizedBox(height: 8),
          const Text(
            'Ky2 전용 체력측정 기기를 통해\n정밀한 측정이 가능합니다.',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.normal,
            ),
            textAlign: TextAlign.start,
          ),
          SizedBox(height: 24),
          Container(
            decoration: BoxDecoration(
              color: const Color(0xffF5F9FA),
              borderRadius: BorderRadius.circular(4),
            ),
            padding: const EdgeInsets.all(15),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        model.connection != null
                            ? SvgPicture.asset('assets/circle.svg')
                            : SvgPicture.asset('assets/circle_red.svg'),
                        const SizedBox(width: 5),
                        const Text(
                          'HC-06',
                          style: TextStyle(
                            fontSize: 14,
                            color: Color(0xffBDC1CB),
                          ),
                        )
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(
                      '팔굽혀펴기',
                      style: const TextStyle(
                          fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 20)
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      model.count,
                      style: TextStyle(
                        fontSize: 36,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Column(
                      children: [
                        Text(
                          '회',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(
                          height: 5,
                        )
                      ],
                    )
                  ],
                )
              ],
            ),
          ),
          Expanded(child: SizedBox()),
          Button(
            text: '결과 등록',
            disabled: model.count == "",
            borderRadius: BorderRadius.circular(4),
            height: 48,
            onPressed: (){
              model.onClickSendData(context);
              Navigator.of(context).pop();
            },
          )
        ],
      ),
    );
  }
}
