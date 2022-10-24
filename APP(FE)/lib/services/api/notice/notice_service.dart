import 'package:dio/dio.dart';
import 'package:ky2/models/notice/notice.dart';
import 'package:ky2/services/api/notice/notice_api.dart';
import 'package:ky2/services/api/service.dart';

final _NoticeService noticeService = _NoticeService();

class _NoticeService extends APIService with NoticeAPI {
  @override
  Future<List<Notice>> getNoticeList(String accessToken) async{
    Response res = await dio.get('/notice', options: Options(
        headers: {"Authorization": accessToken}));

    return (res.data['notices'] as List).map((e) => Notice.fromJson(e)).toList();
  }
}