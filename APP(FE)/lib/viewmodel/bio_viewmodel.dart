import 'package:flutter/material.dart';
import 'package:ky2/core/base_viewmodel.dart';

import 'package:local_auth/local_auth.dart';


class BioViewModel extends BaseViewModel {

  void initState(BuildContext context) async {
    bool canCheckBiometrics = await LocalAuthentication().canCheckBiometrics;
    if(canCheckBiometrics){
      var localAuth = LocalAuthentication();
      bool didAuthenticate = await localAuth.authenticate(
        localizedReason: '블록체인 키를 저장하기 위해서 생체인증정보를 등록해주세요',
        authMessages: [
        ]
      );
    }
  }
}
