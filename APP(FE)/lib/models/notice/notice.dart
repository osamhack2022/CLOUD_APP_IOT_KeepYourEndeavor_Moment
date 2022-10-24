class Notice {
  final String noticeId;
  final String title;
  final DateTime testDate;
  final String subject;

  Notice({required this.noticeId, required this.title, required this.testDate, required this.subject});

  factory Notice.fromJson(Map<String, dynamic> json) {
    return Notice(
      noticeId: json['notice_id'],
      title: json['title'],
      testDate: DateTime.parse(json['test_date']),
      subject: json['subject'],
    );
  }

}