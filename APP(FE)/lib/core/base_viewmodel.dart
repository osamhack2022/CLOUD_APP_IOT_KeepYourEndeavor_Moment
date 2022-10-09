import 'package:flutter/widgets.dart';

enum ViewState { IDLE, BUSY }

class BaseViewModel extends ChangeNotifier {
  ViewState _state = ViewState.BUSY;

  ViewState get state => _state;

  void setState(ViewState viewState) {
    _state = viewState;
    notifyListeners();
  }

  void init() {
    setState(ViewState.IDLE);
  }
}
