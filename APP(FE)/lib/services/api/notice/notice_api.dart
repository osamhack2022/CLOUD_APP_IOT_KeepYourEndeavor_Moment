import 'package:ky2/models/notice/notice.dart';

abstract class NoticeAPI {
  Future<List<Notice>> getNoticeList(String accessToken);
}