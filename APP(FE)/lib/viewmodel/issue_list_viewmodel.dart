import 'dart:convert';
import 'dart:typed_data';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bluetooth_serial/flutter_bluetooth_serial.dart';
import 'package:ky2/core/base_viewmodel.dart';
import 'package:ky2/models/auth/issue.dart';
import 'package:ky2/services/api/auth/auth_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

class IssueListViewModel extends BaseViewModel {
  List<Issue> issueList = [];
  void initState(BuildContext context) async {
    var prefs = await SharedPreferences.getInstance();
    String accessToken = prefs.getString('accessToken') ?? "";

    issueList = await authService.issueList(accessToken);
    setState(ViewState.IDLE);
  }
}
