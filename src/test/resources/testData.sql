-- data for doctors
INSERT INTO doctor (dFName, dLName, specialty, officeNumber) VALUES
('John', 'Doe', 'Cardiology', 'Room 101'),
('Jane', 'Smith', 'Dermatology', 'Room 202'),
('Michael', 'Johnson', 'Pediatrics', 'Room 303'),
('Emily', 'White', 'Orthopedics', 'Room 404'),
('David', 'Brown', 'Ophthalmology', 'Room 505');

-- data for patients
INSERT INTO patient (pFName, pLName, birthday, phoneNumber, insuranceProvider) VALUES
('Alice', 'Johnson', '1990-05-15', '8045551234', 'HealthCare Inc'),
('Bob', 'Williams', '1985-08-20', '8045555678', 'MedicalGuard'),
('Charlie', 'Davis', '1978-12-10', '8045559876', 'WellnessFirst'),
('Eva', 'Miller', '1995-03-25', '8045554321', 'MediLife'),
('Frank', 'Taylor', '1982-11-05', '8045558765', 'TotalCare');

-- data for appointments
INSERT INTO appointment (appointmentDateTime, pId, dId, status, note, hasPaid) VALUES
('2024-02-15', 1, 1, 'Scheduled', 'Regular checkup', true),
('2024-03-10', 2, 3, 'Completed', 'Follow-up appointment', true),
('2024-04-05', 3, 2, 'Scheduled', 'Initial consultation', false),
('2024-05-20', 4, 4, 'Scheduled', 'Orthopedic examination', true),
('2024-06-15', 5, 5, 'Completed', 'Eye checkup', true),
('2024-07-01', 1, 2, 'Scheduled', 'Dental checkup', false),
('2024-08-12', 3, 5, 'Completed', 'Pediatric visit', true);

