class User {
  final String id;
  final String pwd;
  final String className;
  final String name;
  final String position;
  final String cmd;
  final String cps;
  final String division;
  final String br;
  final String bn;
  final String co;
  final String etc;
  final String authority = '병사';

  User({
    required this.id,
    required this.pwd,
    required this.className,
    required this.name,
    required this.position,
    required this.cmd,
    required this.cps,
    required this.division,
    required this.br,
    required this.bn,
    required this.co,
    required this.etc,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      pwd: json['pwd'],
      className: json['class'],
      name: json['name'],
      position: json['position'],
      cmd: json['cmd'],
      cps: json['cps'],
      division: json['division'],
      br: json['br'],
      bn: json['bn'],
      co: json['co'],
      etc: json['etc'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'pwd': pwd,
      'class': className,
      'name': name,
      'position': position,
      'authority': authority,
      'cmd': cmd,
      'cps': cps,
      'division': division,
      'br': br,
      'bn': bn,
      'co': co,
      'etc': etc
    };
  }
}
