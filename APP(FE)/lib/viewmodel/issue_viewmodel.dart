import 'dart:convert';
import 'dart:typed_data';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bluetooth_serial/flutter_bluetooth_serial.dart';
import 'package:ky2/components/Button.dart';
import 'package:ky2/core/base_viewmodel.dart';
import 'package:ky2/services/api/auth/auth_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

class IssueViewModel extends BaseViewModel {
  String count = "";
  String issueid = "";
  BluetoothConnection? connection;
  void initState(BuildContext context, String issue_id) async {

    issueid = issue_id;
    await FlutterBluetoothSerial.instance.cancelDiscovery();

    var _streamSubscription =
        FlutterBluetoothSerial.instance.startDiscovery().listen((r)async {
          setState(ViewState.BUSY);
      if(r.device.address == '20:16:07:18:50:75'){
        connection = await BluetoothConnection.toAddress('20:16:07:18:50:75');
        setState(ViewState.IDLE);
        connection!.input?.listen((Uint8List data) {
          print(data);
          print('Data incoming: ${ascii.decode(data)}');
          connection!.output.add(data); // Sending data
          if(ascii.decode(data) != '!'){
            count += ascii.decode(data);
            setState(ViewState.IDLE);
          }
          if (ascii.decode(data).contains('!')) {

            connection!.finish(); // Closing connection
            print('Disconnecting by local host');
          }
        }).onDone(() {
          print('Disconnected by remote request');
        });
      }
    });



    //print(FlutterBlue.instance.connectedDevices);
  }

  void onClickSendData(BuildContext context)async {
    try{
      var prefs = await SharedPreferences.getInstance();
      String accessToken = prefs.getString('accessToken') ?? "";
      String id = prefs.getString('id') ?? "";
      print(id);
      print(accessToken);
      print(issueid);
      print(count);

      await authService.createBlock(accessToken, id, issueid ,count);

      showDialog(
        context: context,
        builder: (BuildContext context) {
          // return object of type Dialog
          return AlertDialog(
            title: const Text("등록 완료"),
            content: const Text("평가 결과를 블록체인에 등록했습니다!"),
            actions: <Widget>[
              Button(text: '확인', borderRadius: BorderRadius.circular(4),onPressed: (){
                Navigator.pop(context);
              },)
            ],
            shape: const RoundedRectangleBorder(
                borderRadius: BorderRadius.all(Radius.circular(8.0))),
          );
        },
      );

    } on DioError catch(e){
      print(e);
      showDialog(
        context: context,
        builder: (BuildContext context) {
          // return object of type Dialog
          return AlertDialog(
            title: const Text("오류발생!"),
            content: const Text("서버 오류가 발생했습니다!"),
            actions: <Widget>[
              Button(text: '확인', borderRadius: BorderRadius.circular(4),onPressed: (){
                Navigator.pop(context);
              },)
            ],
            shape: const RoundedRectangleBorder(
                borderRadius: BorderRadius.all(Radius.circular(8.0))),
          );
        },
      );
    }
  }
}
