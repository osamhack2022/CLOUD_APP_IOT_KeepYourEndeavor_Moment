import 'package:ky2/models/notice/notice.dart';

abstract class ApplicationAPI {
  Future<void> registerApplication(String accessToken, String id, String noticeId);
}