package com.example.hasapp.service;

import com.example.hasapp.dao.PatientRepo;
import com.example.hasapp.dao.PatientRepoImpl;
import com.example.hasapp.dto.Patient;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.jdbc.Sql;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class PatientServiceTests {

    private PatientRepo patientDao;
    private PatientService service;


    @Autowired
    public void PatientServiceTest() {
        patientDao = new PatientRepoStubImpl();
        service = new PatientService(patientDao);
    }

    @Test
    @DisplayName("Add New Correct Patient Test")
    public void addNewPatientCorrectTest() {
        Patient patient = new Patient();
        patient.setpFName("Luan");
        patient.setpLName("Nguyen");
        patient.setPhoneNumber("8045556868");
        patient.setBirthday("2012-12-20");
        patient.setInsuranceProvider("Liberty");


        assertNull(service.addPatient(patient));


    }

    @Test
    @DisplayName("Add New Patient Empty Name Test")
    public void addNewPatientEmptyNameTest() {
        Patient patient = new Patient();
        patient.setpFName("Luan");
        patient.setpLName("");
        patient.setPhoneNumber("8045556868");
        patient.setBirthday("2012-12-20");
        patient.setInsuranceProvider("Liberty");

        Patient retrieved = service.addPatient(patient);
        assertEquals(retrieved.getError(),"Last name cannot be empty", "Error message not outputted correctly");


    }

    @Test
    @DisplayName("Add New Patient Wrong Date Format Test")
    public void addNewPatientWrongDateFormatTest() {
        Patient patient = new Patient();
        patient.setpFName("Luan");
        patient.setpLName("Nguyen");
        patient.setPhoneNumber("8045556868");
        patient.setBirthday("20-12-2015");
        patient.setInsuranceProvider("Liberty");

        Patient retrieved = service.addPatient(patient);
        assertEquals(retrieved.getError(),"Birthday in wrong format, must be in yyyy-mm-dd format", "Error message not outputted correctly");


    }

    @Test
    @DisplayName("Add New Patient Wrong Phone Format Test")
    public void addNewPatientWrongPhoneFormatTest() {
        Patient patient = new Patient();
        patient.setpFName("Luan");
        patient.setpLName("Nguyen");
        patient.setPhoneNumber("804-555-6868");
        patient.setBirthday("2015-12-25");
        patient.setInsuranceProvider("Liberty");

        Patient retrieved = service.addPatient(patient);
        assertEquals(retrieved.getError(),"Wrong phone number format, must be 10 digits, no dashes", "Error message not outputted correctly");


    }

    @Test
    @DisplayName("Update Patient Correct Input Test")
    public void updatePatientCorrectTest() {
        Patient patient = new Patient();
        patient.setPID(100);
        patient.setpFName("Luan");
        patient.setpLName("Nguyen");
        patient.setPhoneNumber("8045556868");
        patient.setBirthday("2015-12-25");
        patient.setInsuranceProvider("Liberty");


        service.updatePatient(patient,100);
        Patient retrieved = service.getPatientById(100);
        assertEquals(patient, retrieved,"Updated patient not correct");

    }

    @Test
    @DisplayName("Update Patient Correct Input Test")
    public void updatePatientWrongDateTest() {
        Patient patient = new Patient();
        patient.setPID(100);
        patient.setpFName("Luan");
        patient.setpLName("Nguyen");
        patient.setPhoneNumber("8045556868");
        patient.setBirthday("12-25-2015");
        patient.setInsuranceProvider("Liberty");


        Patient retrieved = service.updatePatient(patient,100);
        assertEquals(retrieved.getError(),"Birthday in wrong format, must be in yyyy-mm-dd format", "Error message not outputted correctly");

    }
}