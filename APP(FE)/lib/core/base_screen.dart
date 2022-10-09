import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './base_viewmodel.dart';
import './di_container.dart';

class BaseScreen<T extends BaseViewModel> extends StatefulWidget {
  final Widget Function(BuildContext context, T model, Widget? child) builder;
  final Function(T)? onModelReady;
  final Function(T)? onModelDispose;

  const BaseScreen(
      {Key? key, required this.builder, this.onModelReady, this.onModelDispose})
      : super(key: key);

  @override
  _BaseScreenState createState() => _BaseScreenState<T>();
}

class _BaseScreenState<T extends BaseViewModel> extends State<BaseScreen<T>> {
  T model = diContainer<T>();

  @override
  void initState() {
    super.initState();

    if (widget.onModelReady != null) {
      widget.onModelReady!(model);
    } else {
      model.init();
    }
  }

  @override
  void dispose() async {
    if (widget.onModelDispose != null) await widget.onModelDispose!(model);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<T>(
      create: (context) => model,
      child: Container(
        color: Colors.white,
        child: Consumer<T>(
          builder: widget.builder,
        ),
      ),
    );
  }
}
