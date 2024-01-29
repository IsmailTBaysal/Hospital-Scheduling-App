package com.example.hasapp.service;

import com.example.hasapp.dao.PatientRepo;
import com.example.hasapp.dto.Patient;

import java.util.List;

public class PatientRepoStubImpl implements PatientRepo {

    public Patient onlyPatient;

    public PatientRepoStubImpl() {
        onlyPatient = new Patient();
        onlyPatient.setPID(100);
        onlyPatient.setpFName("John");
        onlyPatient.setpLName("Lennon");
        onlyPatient.setBirthday("1985-12-23");
        onlyPatient.setPhoneNumber("8045558686");
        onlyPatient.setInsuranceProvider("Liberty");
    }


    @Override
    public Patient getPatientById(int id) {
        if(id == onlyPatient.getPID()){
            return onlyPatient;
        }
        else return null;
    }

    @Override
    public List<Patient> getAllPatients() {
        return null;
    }

    @Override
    public Patient addPatient(Patient patient) {
        return null;
    }

    @Override
    public void updatePatient(Patient patient) {
        onlyPatient.setpFName(patient.getpFName());
        onlyPatient.setpLName(patient.getpLName());
        onlyPatient.setBirthday(patient.getBirthday());
        onlyPatient.setPhoneNumber(patient.getPhoneNumber());
        onlyPatient.setInsuranceProvider(patient.getInsuranceProvider());
    }

    @Override
    public void deletePatientById(int id) {

    }
}