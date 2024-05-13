CREATE TABLE user (
    name varchar(255) PRIMARY KEY,
    image_path varchar(1000)
);

CREATE TABLE milestone (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY ,
                           name varchar(255) NOT NULL ,
                           description varchar(255),
                           end_date DATE,
                           is_open TINYINT(1) default 1 NOT NULL
);

CREATE TABLE label (
                       name varchar(255) PRIMARY KEY ,
                       background_color varchar(20) NOT NULL ,
                       text_color varchar(20) NOT NULL ,
                       description varchar(255)
);

CREATE TABLE issue (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       title VARCHAR(255) NOT NULL ,
                       milestone_id BIGINT,
                       reporter VARCHAR(255) NOT NULL ,
                       created_at DATETIME NOT NULL  ,
                       is_open TINYINT(1) default 1 NOT NULL,
                       label varchar(255),
                       foreign key (milestone_id) references milestone(id),
                       foreign key (label) references label(name),
                       foreign key (reporter) references user(id)
);

CREATE TABLE comment (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         issue_id BIGINT NOT NULL ,
                         reporter varchar(255) NOT NULL ,
                         created_at DATETIME NOT NULL ,
                         contents text NOT NULL ,
                         foreign key (issue_id) references issue(id),
                         foreign key (reporter) references user(id)
);

CREATE TABLE issue_assignee (
                                issue_id BIGINT NOT NULL ,
                                user_id varchar(255) NOT NULL ,
                                PRIMARY KEY (issue_id, user_id),
                                foreign key (issue_id) references issue(id),
                                foreign key (user_id) references user(id)
)