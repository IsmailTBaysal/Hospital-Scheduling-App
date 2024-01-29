package com.example.hasapp.dao;

import com.example.hasapp.dto.Doctor;

import java.util.List;

public interface DoctorRepo {

    List<Doctor> getAllDoctors();
    Doctor getDoctorById(int id);
    Doctor addDoctor(Doctor doctor);
    void updateDoctor(Doctor doctor);
    void deleteDoctor(int id);
}
