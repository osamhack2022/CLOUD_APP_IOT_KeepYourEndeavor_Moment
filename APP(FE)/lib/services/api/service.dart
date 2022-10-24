import 'package:dio/dio.dart';

abstract class APIService {
  Map<String, String> defaultHeader() => {
    'Content-Type': 'application/json',
  };

  Map<String, String> authorizationHeader(String accessToken) => {
    'Authorization': accessToken,
    'Content-Type': 'application/json',
  };

  Dio get dio {
    var _dio = Dio(BaseOptions(baseUrl: "http://172.30.1.48:8080/"));

    return _dio;
  }
}
