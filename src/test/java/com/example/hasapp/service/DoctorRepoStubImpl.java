package com.example.hasapp.service;

import com.example.hasapp.dao.DoctorRepo;
import com.example.hasapp.dto.Doctor;

import java.util.Collections;
import java.util.List;

public class DoctorRepoStubImpl implements DoctorRepo {

    private Doctor onlyDoctor;

    public DoctorRepoStubImpl() {
        onlyDoctor = new Doctor();
        onlyDoctor.setDid(200);
        onlyDoctor.setDFName("John");
        onlyDoctor.setDLName("Doe");
        onlyDoctor.setSpecialty("Cardiology");
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return Collections.emptyList();
    }

    @Override
    public Doctor getDoctorById(int id) {
        if (id == onlyDoctor.getDid()) {
            onlyDoctor.setDFName("Doctor Not Found");
            onlyDoctor.setDLName("Doctor Not Found");
            onlyDoctor.setSpecialty("");
        }
        return onlyDoctor;
    }

    @Override
    public Doctor addDoctor(Doctor doctor) {
        if (doctor.getDFName().isEmpty() || doctor.getDLName().isEmpty()) {
            doctor.setDFName("First Name blank, doctor NOT added");
            doctor.setDLName("Last Name blank, doctor NOT added");
            doctor.setSpecialty("");
        }
        return doctor;
    }

    @Override
    public void updateDoctor(Doctor doctor) {
        onlyDoctor.setDFName(doctor.getDFName());
        onlyDoctor.setDLName(doctor.getDLName());
        onlyDoctor.setSpecialty(doctor.getSpecialty());
    }

    @Override
    public void deleteDoctor(int id) {
        // Pass through method, no tests
    }
}