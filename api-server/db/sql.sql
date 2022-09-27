create database osam default character set utf8 collate utf8_general_ci;

CREATE TABLE `user` (
  `id` varchar(255) PRIMARY KEY,
  `pwd` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `authority` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT now(),
  `updated_at` timestamp NULL DEFAULT NULL
);

CREATE TABLE `affiliation` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(255),
  `cmd` varchar(255) NOT NULL,
  `cps` varchar(255),
  `div` varchar(255),
  `br` varchar(255),
  `bn` varchar(255),
  `co` varchar(255),
  `etc` varchar(255),
  `created_at` timestamp DEFAULT now() ,
  `updated_at` timestamp NULL DEFAULT NULL
);

CREATE TABLE `notice` (
  `id` varchar(255) PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `issue_id` varchar(255),
  `author_id` varchar(255) NOT NULL,
  `test_date` timestamp NULL DEFAULT NULL,
  `apply_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp DEFAULT now() ,
  `updated_at` timestamp NULL DEFAULT NULL
);

CREATE TABLE `issue` (
  `id` varchar(255) PRIMARY KEY,
  `type` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `issuer_id` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT now(),
  `updated_at` timestamp NULL DEFAULT NULL
);

CREATE TABLE `application` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `issue_id` varchar(255) NOT NULL,
  `rep_id` varchar(255) NOT NULL,
  `members` JSON NOT NULL,
  `message` TEXT,
  `created_at` timestamp DEFAULT now(),
  `updated_at` timestamp NULL DEFAULT NULL
);

ALTER TABLE `affiliation` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE `notice` ADD FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`) ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE `notice` ADD FOREIGN KEY (`author_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE `issue` ADD FOREIGN KEY (`issuer_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE `application` ADD FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`) ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE `application` ADD FOREIGN KEY (`rep_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE 
ON DELETE CASCADE;

INSERT INTO user VALUES ('21-00000000', '1q2w3e4r', '상병', '0번유저', '병사', '소총수', NULL, NULL); 
INSERT INTO user VALUES ('21-00000001', '1q2w3e4r', '상병', '1번유저', '병사', '소총수', NULL, NULL);
INSERT INTO user VALUES ('21-00000002', '1q2w3e4r', '상병', '2번유저', '병사', '소총수', NULL, NULL);
INSERT INTO user VALUES ('21-00000003', '1q2w3e4r', '상병', '3번유저', '병사', '소총수', NULL, NULL);
INSERT INTO user VALUES ('21-00000004', '1q2w3e4r', '상병', '4번유저','병사', '소총수', NULL, NULL);
INSERT INTO user VALUES ('21-00000005', '1q2w3e4r', '상병', '5번유저','병사', '소총수', NULL, NULL);
INSERT INTO user VALUES ('21-00000006', '1q2w3e4r', '상병', '6번유저','병사', '소총수', NULL, NULL);
INSERT INTO user VALUES ('21-00000007', '1q2w3e4r', '상병', '7번유저','병사', '소총수', NULL, NULL);
INSERT INTO user VALUES ('21-00000008', '1q2w3e4r', '상병', '8번유저','병사', '소총수', NULL, NULL);


INSERT INTO user VALUES ('10-00000000', '1q2w3e4r', '중사', '0번등록자','등록자', '등록부사관', NULL, NULL);
INSERT INTO user VALUES ('10-00000001', '1q2w3e4r', '중사', '1번등록자','등록자', '등록부사관', NULL, NULL);
INSERT INTO user VALUES ('10-00000002', '1q2w3e4r', '중사', '2번등록자','등록자', '등록부사관', NULL, NULL);

INSERT INTO user VALUES ('05-00001', '1q2w3e4r', '대위', '1번개설자', '개설자', '1번개설자', NULL, NULL);

INSERT INTO affiliation VALUES (NULL, '21-00000000', '제2작전사령부', '00군단', '00사단', '00여단' ,'00대대','00중대','00소대',NULL,NULL);
INSERT INTO affiliation VALUES (NULL, '21-00000001', '제2작전사령부', '00군단', '00사단', '00여단' ,'00대대','00중대','00소대',NULL,NULL);
INSERT INTO affiliation VALUES (NULL, '21-00000002', '제2작전사령부', '00군단', '00사단', '00여단' ,'00대대','00중대','00소대',NULL,NULL);
INSERT INTO affiliation VALUES (NULL, '21-00000003', '제2작전사령부', '00군단', '00사단', '00여단' ,'00대대','00중대','00소대',NULL,NULL);
INSERT INTO affiliation VALUES (NULL, '21-00000004', '제2작전사령부', '00군단', '00사단', '00여단' ,'00대대','00중대','00소대',NULL,NULL);
INSERT INTO affiliation VALUES (NULL, '21-00000005', '제2작전사령부', '00군단', '00사단', '00여단' ,'00대대','00중대','00소대',NULL,NULL);
INSERT INTO affiliation VALUES (NULL, '21-00000006', '제2작전사령부', '00군단', '00사단', '00여단' ,'00대대','00중대','00소대',NULL,NULL);
INSERT INTO affiliation VALUES (NULL, '21-00000007', '제2작전사령부', '00군단', '00사단', '00여단' ,'00대대','00중대','00소대',NULL,NULL);
INSERT INTO affiliation VALUES (NULL, '21-00000008', '제2작전사령부', '00군단', '00사단', '00여단' ,'00대대','00중대','00소대',NULL,NULL);
INSERT INTO affiliation VALUES (NULL, '10-00000000', '제2작전사령부', '00군단', '00사단', '00여단' ,'00대대','00중대','00소대',NULL,NULL);
INSERT INTO affiliation VALUES (NULL, '10-00000001', '제2작전사령부', '00군단', '00사단', '00여단' ,'00대대','00중대','00소대',NULL,NULL);
INSERT INTO affiliation VALUES (NULL, '10-00000002', '제2작전사령부', '00군단', '00사단', '00여단' ,'00대대','00중대','00소대',NULL,NULL);
INSERT INTO affiliation VALUES (NULL, '05-00001', '제2작전사령부', '00군단', '00사단', '00여단' ,'00대대','00중대','00소대',NULL,NULL);

