import 'package:flutter/material.dart';
import 'package:ky2/core/base_viewmodel.dart';

class LoginViewModel extends BaseViewModel {
  final TextEditingController id = TextEditingController();
  final TextEditingController pwd = TextEditingController();

  void initState(BuildContext context) async {

  }

  void onClickLogin(){
    print(id.value.text);
    print(pwd.value.text);
  }
}
