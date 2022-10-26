import 'package:get_it/get_it.dart';
import 'package:ky2/viewmodel/bio_viewmodel.dart';
import 'package:ky2/viewmodel/calendar_viewmodel.dart';
import 'package:ky2/viewmodel/issue_list_viewmodel.dart';
import 'package:ky2/viewmodel/issue_viewmodel.dart';
import 'package:ky2/viewmodel/login_viewmodel.dart';
import 'package:ky2/viewmodel/main_viewmodel.dart';
import 'package:ky2/viewmodel/signinfo_viewmodel.dart';
import 'package:ky2/viewmodel/signup_viewmodel.dart';
import 'package:ky2/viewmodel/splash_viewmodel.dart';

var diContainer = GetIt.instance;

void setupDiContainer() {
  diContainer.registerFactory(() => SplashViewModel());
  diContainer.registerFactory(() => MainViewModel());
  diContainer.registerFactory(() => CalendarViewModel());
  diContainer.registerFactory(() => IssueViewModel());
  diContainer.registerFactory(() => LoginViewModel());
  diContainer.registerFactory(() => BioViewModel());
  diContainer.registerFactory(() => SignUpViewModel());
  diContainer.registerFactory(() => SignInfoViewModel());
  diContainer.registerFactory(() => IssueListViewModel());
}
