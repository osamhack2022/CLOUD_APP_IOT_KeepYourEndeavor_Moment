import 'package:flutter/material.dart';
import 'package:ky2/core/base_screen.dart';
import 'package:ky2/utils/ky2_color.dart';

import '../../viewmodel/issue_viewmodel.dart';

class IssuePage extends StatelessWidget {
  const IssuePage({Key? key}) : super(key: key);

  static Route route() {
    return MaterialPageRoute<void>(builder: (_) => const IssuePage());
  }

  @override
  Widget build(BuildContext context) {
    return BaseScreen<IssueViewModel>(
      onModelReady: (model) {
        model.initState(context);
      },
      builder: (context, model, child) {
        return Scaffold(
          resizeToAvoidBottomInset: false,
          backgroundColor: Colors.white,
          body: _body(context, model),
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
            '생체인증 정보를 등록해서\n간편하게 로그인해보세요',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.normal,
            ),
            textAlign: TextAlign.start,
          ),
          SizedBox(height: 8),
          Text(
            model.count.toString(),
            style: const TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.start,
          ),
          SizedBox(height: 9),
        ],
      ),
    );
  }
}
