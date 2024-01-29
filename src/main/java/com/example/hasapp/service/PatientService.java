package com.example.hasapp.service;

import com.example.hasapp.dao.PatientRepo;
import com.example.hasapp.dao.PatientRepoImpl;
import com.example.hasapp.dto.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    PatientRepo patientDAO;


    public PatientService(PatientRepo patientDAO) {
        this.patientDAO = patientDAO;
    }

    public List<Patient> getAllPatients(){
        List<Patient> patients = patientDAO.getAllPatients();
        return patients;

    }

    public Patient addPatient(Patient patient){

        if(validatePatientInput(patient) == false){
            return setError(patient);
        }


        Patient addedPatient = patientDAO.addPatient(patient);
        return addedPatient;

    }

    public Patient updatePatient(Patient patient, int id){
        if (id != patient.getPID()) {
            patient.setpFName("IDs do not match, patient not updated");
            patient.setpLName("IDs do not match, patient not updated");
            patient.setError("IDs do not match, patient not updated");
            return patient;
        }else {
            if(validatePatientInput(patient) == false){
                return setError(patient);
            }
            patientDAO.updatePatient(patient);
            return patient;
        }

    }

    public void deletePatientById(int id) {
        //YOUR CODE STARTS HERE

        patientDAO.deletePatientById(id);
        //YOUR CODE ENDS HERE
    }

    public Patient getPatientById(int id) {
        //YOUR CODE STARTS HERE
        try {
            return patientDAO.getPatientById(id);
        } catch (DataAccessException ex) {
            Patient patient = new Patient();
            patient.setPID(id);
            patient.setpFName("Patient Not Found");
            patient.setpLName("Patient Not Found");
            patient.setError("Patient Not Found");
            return patient;
        }
        //YOUR CODE ENDS HERE
    }


    public boolean validatePatientInput(Patient patient){
        if(patient.getpFName().isEmpty()){
            return false;
        }
        else if(patient.getpLName().isEmpty()){
            return false;
        }
        else if(patient.getBirthdayConverted() == null){
            return false;
        }
        else if(patient.getPhoneNumber().length() != 12){
            return false;
        }
        else{
            return true;
        }
    }

    public Patient setError(Patient patient){
        if(patient.getpFName().isEmpty()){
            patient.setError("First name cannot be empty");
            return patient;
        }
        else if(patient.getpLName().isEmpty()){
            patient.setError("Last name cannot be empty");
            return patient;
        }
        else if(patient.getPhoneNumber().length() != 12){
            patient.setError("Wrong phone number format, must be XXX-XXX-XXXX");
            return patient;
        }
        else if(patient.getBirthdayConverted() == null){
            patient.setError("Birthday in wrong format, must be in yyyy-mm-dd format");
            return patient;
        }

        else{
            return patient;
        }

    }
}
