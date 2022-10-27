import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:ky2/components/Button.dart';
import 'package:ky2/core/base_viewmodel.dart';
import 'package:ky2/models/notice/notice.dart';
import 'package:ky2/services/api/application/application_service.dart';
import 'package:ky2/services/api/notice/notice_service.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:table_calendar/table_calendar.dart';


class CalendarViewModel extends BaseViewModel {
  List<Notice> eventList = [
  ];
  List<Notice> selectedEvent = [];
  DateTime _focusedDay = DateTime.now();
  DateTime? _selectedDay;

  void initState(BuildContext context) async {
    _selectedDay = _focusedDay;
    selectedEvent = eventList.where((element) => isSameDay(_selectedDay, element.testDate)).toList();
    getNoticeList();
    setState(ViewState.IDLE);
  }
  void onSelectedDay(DateTime selectedDay, DateTime focusedDay) {
    if (!isSameDay(_selectedDay, selectedDay)) {
      _selectedDay = selectedDay;
      _focusedDay = focusedDay;
      selectedEvent = eventList.where((element) => isSameDay(_selectedDay, element.testDate)).toList();
      setState(ViewState.IDLE);
    }
  }

  void getNoticeList() async{
      try{
        var prefs = await SharedPreferences.getInstance();
        String accessToken = prefs.getString('accessToken') ?? "";
        print(accessToken);
        eventList = await noticeService.getNoticeList(accessToken);

      } on DioError catch(e){
        print(e);
      }
  }

  void registerNotice(BuildContext context, String noticeId) async{
    var prefs = await SharedPreferences.getInstance();
    String accessToken = prefs.getString('accessToken') ?? "";
    String id = prefs.getString('id') ?? "";

    try{
      await applicationService.registerApplication(accessToken, id, noticeId);
      showDialog(
        context: context,
        builder: (BuildContext context) {
          // return object of type Dialog
          return AlertDialog(
            title: const Text("접수 완료"),
            content: const Text("해당 시험에 접수했습니다!"),
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

      showDialog(
        context: context,
        builder: (BuildContext context) {
          // return object of type Dialog
          print(e.response);
          return AlertDialog(
            title: const Text('오류발생'),
            content: Text(e.message),
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

  get focusDay => _focusedDay;
  get selectDay => _selectedDay;
}
