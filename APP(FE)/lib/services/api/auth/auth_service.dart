import 'package:dio/dio.dart';
import 'package:ky2/models/auth/user.dart';
import 'package:ky2/models/home/home.dart';
import 'package:ky2/services/api/auth/auth_api.dart';
import 'package:ky2/services/api/service.dart';

final _AuthService authService = _AuthService();

class _AuthService extends APIService with AuthAPI {
  @override
  Future<String> signIn(String id, String pwd) async {
    Response res = await dio.post('/auth/signin/', data: {
      'id': id,
      'pwd': pwd
    });

    return res.data['token'];
  }

  @override
  Future<void> signup(User user) async{
    Response res = await dio.post('/auth/signup/', data: user.toJson());
  }

  @override
  Future<List<Home>> home(String accessToken) async {
    Response res = await dio.get('/home', options: Options(
        headers: {"Authorization": accessToken}));

    return (res.data['usersData'] as List).map((e) => Home.fromJson(e)).toList();
  }
}