import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter_bluetooth_serial/flutter_bluetooth_serial.dart';
import 'package:ky2/core/base_viewmodel.dart';

class IssueViewModel extends BaseViewModel {
  String count = "";
  void initState(BuildContext context) async {
    var _streamSubscription =
        FlutterBluetoothSerial.instance.startDiscovery().listen((r)async {
      if(r.device.address == '20:16:07:18:50:75'){
        BluetoothConnection connection = await BluetoothConnection.toAddress(r.device.address);
        connection.input?.listen((Uint8List data) {
          print(data);
          print('Data incoming: ${ascii.decode(data)}');
          connection.output.add(data); // Sending data
          if(ascii.decode(data) != '!'){
            count += ascii.decode(data);
            setState(ViewState.IDLE);
          }
          if (ascii.decode(data).contains('!')) {

            connection.finish(); // Closing connection
            print('Disconnecting by local host');
          }
        }).onDone(() {
          print('Disconnected by remote request');
        });
      }
    });

    //print(FlutterBlue.instance.connectedDevices);
  }
}
