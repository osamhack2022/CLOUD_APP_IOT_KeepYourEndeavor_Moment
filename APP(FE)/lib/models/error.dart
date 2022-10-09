import 'package:flutter/cupertino.dart';

class APIError extends Error {
  final String message;
  final int statusCode;

  APIError({
    required this.statusCode,
    required this.message,
  });

  factory APIError.fromJSON(Map<String, dynamic> json, [statusCode]) {
    return APIError(
        message: json["errors"]["message"], statusCode: statusCode ?? 0);
  }
}

class GatewayError extends Error {
  final String message;

  GatewayError({
    required this.message,
  });
}
