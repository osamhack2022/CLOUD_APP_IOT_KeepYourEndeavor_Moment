import 'package:flutter/material.dart';
import 'package:ky2/core/base_screen.dart';
import 'package:ky2/viewmodel/main_viewmodel.dart';

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
    return Center(
        child: Column(
      children: [
        const Text("Main Page"),
        const Expanded(
          flex: 342,
          child: SizedBox(),
        ),
      ],
    ));
  }
}
