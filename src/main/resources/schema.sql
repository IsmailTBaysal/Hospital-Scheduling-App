DROP DATABASE IF EXISTS hospital;

create database hospital;
use hospital;

-- Table structure for doctor

DROP TABLE IF EXISTS doctor;
CREATE TABLE doctor (
                        did int AUTO_INCREMENT PRIMARY KEY,
                        dFName varchar(255) DEFAULT NULL,
                        dLName varchar(255) DEFAULT NULL,
                        specialty varchar(255) DEFAULT NULL,
                        officeNumber varchar(255) DEFAULT NULL
);

-- Table structure for patient

DROP TABLE IF EXISTS patient;
CREATE TABLE patient (
                         pid int AUTO_INCREMENT PRIMARY KEY,
                         pFName varchar(255) DEFAULT NULL,
                         pLName varchar(255) DEFAULT NULL,
                         birthday DATE DEFAULT NULL,
                         phoneNumber varchar(255) DEFAULT NULL,
                         insuranceProvider varchar(255) DEFAULT NULL
);

-- Table structure for appointment

DROP TABLE IF EXISTS appointment;
CREATE TABLE appointment (
                             aid INT AUTO_INCREMENT PRIMARY KEY,
                             pid INT,
                             did INT,
                             appointmentDateTime DATETIME,
                             status VARCHAR(10),
                             note VARCHAR(255),
                             hasPaid BOOLEAN,
                             FOREIGN KEY (pid) REFERENCES patient(pid),
                             FOREIGN KEY (did) REFERENCES doctor(did)
);


DROP TABLE IF EXISTS user;
CREATE TABLE user (
                      user_id INT NOT NULL AUTO_INCREMENT,
                      username VARCHAR(50) NOT NULL,
                      password_hash VARCHAR(255) NOT NULL,
                      enabled BOOLEAN NOT NULL,
                      email VARCHAR(255),
                      PRIMARY KEY (user_id),
                      UNIQUE (username)
);

DROP TABLE IF EXISTS role;
CREATE TABLE role (
                      role_id INT NOT NULL AUTO_INCREMENT,
                      name VARCHAR(50) NOT NULL,
                      PRIMARY KEY (role_id),
                      UNIQUE (name)
);

DROP TABLE IF EXISTS user_role;
CREATE TABLE user_role (
                           user_id INT NOT NULL,
                           role_id INT NOT NULL,
                           PRIMARY KEY (user_id, role_id),
                           FOREIGN KEY (user_id) REFERENCES user (user_id),
                           FOREIGN KEY (role_id) REFERENCES role (role_id)
);