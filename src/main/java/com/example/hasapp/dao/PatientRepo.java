package com.example.hasapp.dao;

import com.example.hasapp.dto.Patient;

import java.util.List;

public interface PatientRepo {
    Patient getPatientById(int id);
    List<Patient> getAllPatients();
    Patient addPatient(Patient patient);
    void updatePatient(Patient patient);
    void deletePatientById(int id);

}
