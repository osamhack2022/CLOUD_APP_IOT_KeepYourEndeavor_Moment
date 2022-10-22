import 'package:flutter/material.dart';
import 'package:ky2/core/base_viewmodel.dart';
import 'package:table_calendar/table_calendar.dart';


class Event {
  String title;
  DateTime date;
  Event(this.title, this.date);

  @override
  String toString() => title;
}

class CalendarViewModel extends BaseViewModel {
  List<Event> eventList = [
    Event('이벤트', DateTime(2022, 10, 20)),
    Event('이벤트', DateTime(2022, 10, 21))
  ];
  List<Event> selectedEvent = [];
  DateTime _focusedDay = DateTime.now();
  DateTime? _selectedDay;

  void initState(BuildContext context) async {
    _selectedDay = _focusedDay;
    selectedEvent = eventList.where((element) => isSameDay(_selectedDay, element.date)).toList();
    setState(ViewState.IDLE);
  }
  void onSelectedDay(DateTime selectedDay, DateTime focusedDay) {
    if (!isSameDay(_selectedDay, selectedDay)) {
      _selectedDay = selectedDay;
      _focusedDay = focusedDay;
      selectedEvent = eventList.where((element) => isSameDay(_selectedDay, element.date)).toList();
      setState(ViewState.IDLE);
    }
  }

  get focusDay => _focusedDay;
  get selectDay => _selectedDay;
}
