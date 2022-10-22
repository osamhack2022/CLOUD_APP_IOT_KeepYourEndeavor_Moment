import 'dart:async';

import 'package:flutter/material.dart';
import 'package:ky2/core/base_viewmodel.dart';
import 'package:ky2/pages/auth/login_page.dart';
import 'package:ky2/pages/main/main_tab.dart';

class SplashViewModel extends BaseViewModel {
  void initState(BuildContext context) async {
    Future.delayed(const Duration(seconds: 3)).then(
      (_) => Navigator.of(context).push(LoginPage.route()),
    );
  }
}
