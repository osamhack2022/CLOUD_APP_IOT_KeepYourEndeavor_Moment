import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:ky2/core/base_viewmodel.dart';
import 'package:ky2/services/api/auth/auth_service.dart';

class LoginViewModel extends BaseViewModel {
  final TextEditingController id = TextEditingController();
  final TextEditingController pwd = TextEditingController();

  void initState(BuildContext context) async {

  }

  void onClickLogin() async{
    print(id.value.text);
    print(pwd.value.text);

    try{
      String token = await authService.signIn(id.value.text, pwd.value.text);
      print(token);
    } on DioError catch (e){
      print(e);
    }
  }
}
