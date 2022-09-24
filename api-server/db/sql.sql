CREATE TABLE `user` (
  `id` varchar(255) PRIMARY KEY,
  `pwd` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `authority` varchar(255) DEFAULT "normal",
  `position` varchar(255) NOT NULL DEFAULT "normal" COMMENT 'squad leader,platoon leader...',
  `created_at` timestamp DEFAULT now() COMMENT 'create time',
  `updated_at` timestamp DEFAULT now() COMMENT 'update time'
);

CREATE TABLE `affiliation` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(255) COMMENT 'user.id is foreign key of this id',
  `div` varchar(255) NOT NULL COMMENT 'division',
  `br` varchar(255) NOT NULL COMMENT 'brigade',
  `bn` varchar(255) NOT NULL COMMENT 'battalion',
  `co` varchar(255) NOT NULL COMMENT 'company',
  `etc` varchar(255) COMMENT 'platoon or picket ...',
  `created_at` timestamp DEFAULT now() COMMENT 'create time',
  `updated_at` timestamp DEFAULT now() COMMENT 'update time'
);

CREATE TABLE `notice` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL COMMENT 'userId which authority is manager came',
  `subject` varchar(255) NOT NULL COMMENT 'the subject for this notice wants to take an examination',
  `deadline` timestamp NOT NULL,
  `created_at` timestamp DEFAULT now() COMMENT 'create time',
  `updated_at` timestamp DEFAULT now() COMMENT 'update time'
);

CREATE TABLE `representative_application` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `notice_id` int COMMENT 'notice.id is a foreign key of this id',
  `rep_id` varchar(255) NOT NULL COMMENT 'representative_application_id',
  `members` JSON NOT NULL,
  `message` TEXT,
  `created_at` timestamp DEFAULT now() COMMENT 'create time',
  `updated_at` timestamp DEFAULT now() COMMENT 'update time'
);

ALTER TABLE `affiliation` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `notice` ADD FOREIGN KEY (`author`) REFERENCES `user` (`id`);

ALTER TABLE `representative_application` ADD FOREIGN KEY (`notice_id`) REFERENCES `notice` (`id`);

ALTER TABLE `representative_application` ADD FOREIGN KEY (`rep_id`) REFERENCES `user` (`id`);
