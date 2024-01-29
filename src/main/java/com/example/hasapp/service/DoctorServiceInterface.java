package com.example.hasapp.service;

import com.example.hasapp.dto.Doctor;

import java.util.List;

public interface DoctorServiceInterface {

    List<Doctor> getAllDoctors();

    Doctor getDoctorById(int id);

    Doctor addNewDoctor(Doctor doctor);

    Doctor updateDoctorData(int id, Doctor doctor);

    void deleteDoctorById(int id);
}
