import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

import 'package:flutter_svg/flutter_svg.dart';
import 'package:ky2/pages/main/calendar_page.dart';
import 'package:ky2/pages/main/main_page.dart';
import 'package:ky2/pages/main/more_page.dart';

import 'package:ky2/utils/ky2_color.dart';

class MainTab extends StatefulWidget {
  static Route route() {
    return MaterialPageRoute<void>(
      builder: (_) => MainTab(),
    );
  }

  @override
  _MainTabState createState() => _MainTabState();
}

class _MainTabState extends State<MainTab> with SingleTickerProviderStateMixin {
  TabController? tabController;

  @override
  void initState() {
    super.initState();
    tabController = TabController(length: 3, vsync: this);
    tabController!.addListener(() {
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ky2Color.white,
      body: TabBarView(
        controller: tabController,
        physics: const NeverScrollableScrollPhysics(),

        children: [
          MainPage(),
          CalendarPage(),
          MorePage(),
        ],
      ),
      bottomNavigationBar: Container(
        color: ky2Color.white,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Container(
              decoration: BoxDecoration(
                color: ky2Color.white.withOpacity(0.94),
              ),
              height: 60,
              child: TabBar(
                labelPadding: EdgeInsets.zero,
                indicatorPadding: EdgeInsets.zero,
                indicatorColor: ky2Color.white,
                controller: tabController,
                isScrollable: false,
                tabs: [
                  Container(
                    margin: const EdgeInsets.only(right: 10),
                    height: 74,
                    child: Column(children: <Widget>[
                      const SizedBox(
                        height: 3,
                      ),
                      SvgPicture.asset(
                        tabController!.index == 0
                            ? "assets/ic_home_active.svg"
                            : "assets/ic_home_grey.svg",
                        height: 28,
                        width: 28,
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      Text(
                        "홈",
                        style: TextStyle(
                          fontSize: 14,
                          height: 1,
                          color: tabController!.index == 0
                              ? ky2Color.primary
                              : ky2Color.subText,
                        ),
                      ),
                    ]),
                  ),
                  Container(
                    margin: const EdgeInsets.only(left: 10),
                    height: 74,
                    child: Column(children: <Widget>[
                      const SizedBox(
                        height: 3,
                      ),
                      SvgPicture.asset(
                        tabController!.index == 1
                            ? "assets/ic_calendar_active.svg"
                            : "assets/ic_calendar_grey.svg",
                        height: 28,
                        width: 28,
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      Text(
                        "일정",
                        style: TextStyle(
                          fontSize: 14,
                          height: 1,
                          color: tabController!.index == 1
                              ? ky2Color.primary
                              : ky2Color.subText,
                        ),
                      ),
                    ]),
                  ),
                  Container(
                    margin: const EdgeInsets.only(left: 10),
                    height: 74,
                    child: Column(children: <Widget>[
                      const SizedBox(
                        height: 3,
                      ),
                      SvgPicture.asset(
                        tabController!.index == 2
                            ? "assets/ic_menu_active.svg"
                            : "assets/ic_menu_grey.svg",
                        height: 28,
                        width: 28,
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      Text(
                        "더보기",
                        style: TextStyle(
                          fontSize: 14,
                          height: 1,
                          color: tabController!.index == 2
                              ? ky2Color.primary
                              : ky2Color.subText,
                        ),
                      ),
                    ]),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
