import 'package:dio/dio.dart';
import 'package:ky2/services/api/application/application_api.dart';
import 'package:ky2/services/api/service.dart';

final _ApplicationService applicationService = _ApplicationService();

class _ApplicationService extends APIService with ApplicationAPI {
  @override
  Future<void> registerApplication(String accessToken, String id, String noticeId) async{
    print(accessToken);
    print(id);
    print(noticeId);
    await dio.post(
      'application/$noticeId/regist',
      options: Options(
        headers: {"Authorization": accessToken},
      ),
      data: {
        'member': id,
        'message': "신청합니다!"
      }
    );
  }
}
