import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:ky2/core/base_viewmodel.dart';
import 'package:ky2/models/home/home.dart';
import 'package:ky2/services/api/auth/auth_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

class MainViewModel extends BaseViewModel {
  List<Home> homes = [];

  void initState(BuildContext context) async {
    var prefs = await SharedPreferences.getInstance();
    String accessToken = prefs.getString('accessToken') ?? "";
    try{
      homes = await authService.home(accessToken);
      setState(ViewState.IDLE);
    } on DioError catch(e){
      print(e);
    }
  }
}
