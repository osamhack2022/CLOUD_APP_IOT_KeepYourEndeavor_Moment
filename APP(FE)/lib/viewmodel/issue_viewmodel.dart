import 'package:flutter/material.dart';
import 'package:flutter_blue/flutter_blue.dart';
import 'package:ky2/core/base_viewmodel.dart';

class IssueViewModel extends BaseViewModel {
  FlutterBlue flutterBlue = FlutterBlue.instance;
  void initState(BuildContext context) async {
    //flutterBlue.startScan(timeout: const Duration(seconds: 4));

  }
}
