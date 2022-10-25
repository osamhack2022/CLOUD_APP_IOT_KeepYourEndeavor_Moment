class Home {
  final String issue_id;
  final String result;
  final String user;
  final String generated_time;
  final String issue_subject;
  final String issue_type;

  Home({
    required this.issue_id,
    required this.result,
    required this.issue_type,
    required this.user,
    required this.generated_time,
    required this.issue_subject,
  });

  factory Home.fromJson(Map<String, dynamic> json) {
    print(json);
    return Home(
      issue_id: json['issue_id'],
      result: json['result'],
      user: json['user'],
      issue_type: json['issue_type'],
      generated_time: json['generated_time'],
      issue_subject: json['issue_subject'],
    );
  }
}
