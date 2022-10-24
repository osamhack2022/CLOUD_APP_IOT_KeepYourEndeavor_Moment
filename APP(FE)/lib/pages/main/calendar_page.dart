import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:ky2/components/Button.dart';
import 'package:ky2/components/TextField.dart' as ky2;
import 'package:ky2/core/base_screen.dart';
import 'package:ky2/utils/ky2_color.dart';
import 'package:ky2/viewmodel/calendar_viewmodel.dart';
import 'package:ky2/viewmodel/main_viewmodel.dart';

import 'package:table_calendar/table_calendar.dart';

class CalendarPage extends StatelessWidget {
  const CalendarPage({Key? key}) : super(key: key);

  static Route route() {
    return MaterialPageRoute<void>(builder: (_) => const CalendarPage());
  }

  @override
  Widget build(BuildContext context) {
    return BaseScreen<CalendarViewModel>(
      onModelReady: (model) {
        model.initState(context);
      },
      builder: (context, model, child) {
        return Scaffold(
          resizeToAvoidBottomInset: false,
          backgroundColor: Colors.white,
          body: _body(context, model),
        );
      },
    );
  }
}

extension on CalendarPage {
  Widget _body(BuildContext context, CalendarViewModel model) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 24, 24, 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(
            height: 48,
          ),
          TableCalendar(
            headerStyle: const HeaderStyle(
              formatButtonVisible: false,
              leftChevronVisible: false,
              rightChevronVisible: false,
              titleTextStyle: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
              ),
              headerPadding: EdgeInsets.fromLTRB(4, 24, 24, 24),
            ),
            selectedDayPredicate: (day) => isSameDay(model.selectDay, day),
            calendarStyle: CalendarStyle(
              todayDecoration: BoxDecoration(
                color: ky2Color.black,
                shape: BoxShape.circle,
              ),
              todayTextStyle: const TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
              selectedDecoration: BoxDecoration(
                color: ky2Color.primary,
                shape: BoxShape.circle,
              ),
              selectedTextStyle: const TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            firstDay: DateTime.utc(2010, 10, 16),
            lastDay: DateTime.utc(2030, 3, 14),
            focusedDay: DateTime.utc(2022, 10, 20),
            onDaySelected: model.onSelectedDay,
            locale: 'ko-KR',
            eventLoader: (day) {
              return model.eventList
                  .where((element) => isSameDay(element.testDate, day))
                  .toList();
            },
          ),
          Expanded(
              child: ListView.builder(
            itemCount: model.selectedEvent.length,
            itemBuilder: (context, index) {
              return Container(
                margin: const EdgeInsets.symmetric(
                  horizontal: 6.0,
                  vertical: 4.0,
                ),
                decoration: BoxDecoration(
                  color: const Color(0xffF5F9FA),
                  borderRadius: BorderRadius.circular(4),
                ),
                padding: const EdgeInsets.all(12),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            SvgPicture.asset('assets/circle.svg'),
                            const SizedBox(width: 5),
                            const Text(
                              '08:00~09:30',
                              style: TextStyle(
                                fontSize: 14,
                                color: Color(0xffBDC1CB),
                              ),
                            )
                          ],
                        ),
                        const SizedBox(height: 6),
                        Text(
                          model.selectedEvent[index].title,
                          style: const TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          model.selectedEvent[index].subject,
                          style: const TextStyle(
                            fontSize: 14,
                            color: Color(0xffBDC1CB),
                          ),
                        )
                      ],
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        GestureDetector(
                          child: Container(
                            child: const Text(
                              '신청',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            decoration: BoxDecoration(
                              color: ky2Color.primary,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            padding: const EdgeInsets.fromLTRB(12, 6, 12, 6),
                          ),
                          onTap: (){
                            model.registerNotice(context, model.selectedEvent[index].noticeId);
                          },
                        )
                      ],
                    )
                  ],
                ),
              );
            },
          )),
        ],
      ),
    );
  }
}
