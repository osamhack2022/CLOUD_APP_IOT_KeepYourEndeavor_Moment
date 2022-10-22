import 'package:ky2/models/auth/signin_response.dart';
import 'package:ky2/models/auth/user.dart';

abstract class AuthAPI {
  Future<String> signIn(String id, String pwd);

  Future<void> signup(User user);
}
