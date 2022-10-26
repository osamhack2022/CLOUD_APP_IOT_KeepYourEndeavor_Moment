import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:ky2/core/base_viewmodel.dart';
import 'package:ky2/pages/main/main_tab.dart';
import 'package:ky2/services/api/auth/auth_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginViewModel extends BaseViewModel {
  final TextEditingController id = TextEditingController();
  final TextEditingController pwd = TextEditingController();

  void initState(BuildContext context) async {
    setState(ViewState.IDLE);
  }

  void onClickLogin(BuildContext context) async{
    print(id.value.text);
    print(pwd.value.text);

    try{
      setState(ViewState.BUSY);
      var prefs = await SharedPreferences.getInstance();
      String token = await authService.signIn(id.value.text, pwd.value.text);
      prefs.setString('accessToken', token);
      prefs.setString('id', id.value.text);
      setState(ViewState.IDLE);
      Navigator.of(context).push(MainTab.route());
    } on DioError catch (e){
      print(e);
    }
  }
}
