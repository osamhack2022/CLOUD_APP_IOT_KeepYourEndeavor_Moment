import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:intl/intl.dart';

import '../utils/ky2_color.dart';

class Card extends StatelessWidget{
  final String title;
  final String rank;
  final DateTime date;
  final Color backgroundColor;
  const Card({Key? key, required this.title, required this.rank, required this.date, required this.backgroundColor}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.16),
            blurRadius: 10,
            offset: const Offset(0, 14),
          )
        ],
      ),
      child: Stack(
        children: [
          Container(
            width: MediaQuery.of(context).size.width,
            padding: const EdgeInsets.all(15),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(24),
              color: backgroundColor,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    color: ky2Color.white.withOpacity(0.8),
                    fontSize: 16,
                  ),
                ),
                SizedBox(height: 3),
                Text(
                  DateFormat('yyyy-MM-DD').format(date),
                  style: TextStyle(
                    color: ky2Color.white,
                  ),
                ),
                const SizedBox(height: 17),
                Text(
                  rank,
                  style: TextStyle(
                    fontSize: 28,
                    color: ky2Color.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
          Positioned(
              right: -25,
              bottom: -50,
              child: Opacity(
                opacity: 0.5,
                child: SvgPicture.asset(
                  'assets/logo.svg',
                ),
              )
          )
        ],
      ),
    );
  }

}