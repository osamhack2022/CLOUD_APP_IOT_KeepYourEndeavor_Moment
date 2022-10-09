import 'dart:async';

import 'package:flutter/material.dart';
import 'package:ky2/core/base_viewmodel.dart';
import 'package:ky2/pages/main/main_page.dart';

class SplashViewModel extends BaseViewModel {
  void initState(BuildContext context) async {
    Future.delayed(const Duration(seconds: 3)).then(
      (_) => Navigator.of(context).push(MainPage.route()),
    );
  }
}
