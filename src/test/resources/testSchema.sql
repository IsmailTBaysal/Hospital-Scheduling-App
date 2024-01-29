DROP DATABASE IF EXISTS testHospital;

create database testHospital;
use testHospital;

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
