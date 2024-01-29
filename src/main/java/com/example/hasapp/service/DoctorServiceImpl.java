package com.example.hasapp.service;

import com.example.hasapp.dao.DoctorRepo;
import com.example.hasapp.dto.Doctor;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DoctorServiceImpl implements DoctorServiceInterface {

    private final DoctorRepo doctorDao;

    @Autowired
    public DoctorServiceImpl(DoctorRepo doctorDao) {
        this.doctorDao = doctorDao;
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return doctorDao.getAllDoctors();
    }

    @Override
    public Doctor getDoctorById(int id) {
        return doctorDao.getDoctorById(id);
    }

    @Override
    public Doctor addNewDoctor(Doctor doctor) {
        validateDoctorData(doctor);
        return doctorDao.addDoctor(doctor);
    }

    @Override
    public Doctor updateDoctorData(int id, Doctor doctor) {
        validateDoctorData(doctor);
        if (id == doctor.getDid()) {
            doctorDao.updateDoctor(doctor);
        } else {
            throw new IllegalArgumentException("Mismatched doctor ID");
        }
        return doctor;
    }

    @Override
    public void deleteDoctorById(int id) {
        doctorDao.deleteDoctor(id);
    }

    private void validateDoctorData(Doctor doctor) throws IllegalArgumentException {
        if (doctor == null) {
            throw new ValidationException("Doctor cannot be null");
        }
        if (doctor.getDFName() == null || doctor.getDFName().isBlank()) {
            throw new ValidationException("Doctor's first name is required.");
        }
        if (doctor.getDLName() == null || doctor.getDLName().isBlank()) {
            throw new ValidationException("Doctor's last name is required.");
        }
        if (doctor.getSpecialty() == null || doctor.getSpecialty().isBlank()) {
            throw new ValidationException("Doctor's specialty is required.");
        }

    }
}