import 'dart:async';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:ky2/core/base_viewmodel.dart';
import 'package:ky2/pages/auth/bio_auth_page.dart';
import 'package:ky2/pages/auth/login_page.dart';
import 'package:ky2/pages/auth/signinfo_page.dart';
import 'package:ky2/services/api/auth/auth_service.dart';

import '../models/auth/user.dart';

class SignInfoViewModel extends BaseViewModel {
  String? id;
  String? pwd;
  String? name;
  String? className;
  String? position;
  final TextEditingController cmd = TextEditingController();
  final TextEditingController cps = TextEditingController();
  final TextEditingController division = TextEditingController();
  final TextEditingController br = TextEditingController();
  final TextEditingController bn = TextEditingController();
  final TextEditingController co = TextEditingController();
  final TextEditingController etc = TextEditingController();

  void initState(
    BuildContext context,
    String _id,
    String _pwd,
    String _name,
    String _position,
    String _className,
  ) async {
    print(_id);
    print(_pwd);
    print(_name);
    print(_position);
    print(_className);
    id = _id;
    pwd = _pwd;
    name = _name;
    position = _position;
    className = _className;
    setState(ViewState.IDLE);
  }

  void onClickNext(BuildContext context) async {
    print(id);
    print(pwd);
    print(name);
    print(position);
    print(className);
    if(
      id != null && pwd != null && name != null && position != null && className != null
    ){
      User user = User(
        id: id!,
        pwd: pwd!,
        className: className!,
        name: name!,
        position: position!,
        cmd: cmd.text,
        cps: cps.text,
        division: division.text,
        br: br.text,
        bn: bn.text,
        co: co.text,
        etc: etc.text,
      );

      try{
        setState(ViewState.BUSY);
        await authService.signup(user);
        setState(ViewState.IDLE);
        Navigator.of(context).push(BioAuthPage.route());
      } on DioError catch (e){
        print(e);
      }
    }
    else{
      print('???');
    }
  }
}
