import 'package:get_it/get_it.dart';
import 'package:ky2/viewmodel/main_viewmodel.dart';
import 'package:ky2/viewmodel/splash_viewmodel.dart';

var diContainer = GetIt.instance;

void setupDiContainer() {
  diContainer.registerFactory(() => SplashViewModel());
  diContainer.registerFactory(() => MainViewModel());
}
