class Issue {
  final String notice_title;
  final DateTime test_date;
  final String issue_id;
  final String issue_type;
  final String issue_subjcet;

  Issue({
    required this.notice_title,
    required this.test_date,
    required this.issue_id,
    required this.issue_type,
    required this.issue_subjcet,
  });

  factory Issue.fromJson(Map<String, dynamic> json) {
    return Issue(
      notice_title: json['notice_title'],
      test_date:  DateTime.parse(json['test_date']),
      issue_id: json['issue_id'],
      issue_type: json['issue_type'],
      issue_subjcet: json['issue_subjcet'],
    );
  }
}
