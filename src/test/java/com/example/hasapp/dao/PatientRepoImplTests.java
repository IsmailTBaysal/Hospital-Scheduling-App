package com.example.hasapp.dao;

import com.example.hasapp.dto.Patient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class PatientRepoImplTests {
    private JdbcTemplate jdbcTemplate;
    private PatientRepoImpl patientDao;


    @Autowired
    public void PatientRepoImplTest(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        patientDao = new PatientRepoImpl(jdbcTemplate);
    }

    @Test
    @Sql({"/testSchema.sql", "/testData.sql"})
    @DisplayName("Add New Patient Test")
    public void addNewPatientTest() {
        Patient patient = new Patient();
        patient.setpFName("Luan");
        patient.setpLName("Nguyen");
        patient.setPhoneNumber("8045556868");
        patient.setBirthday("2012-12-20");
        patient.setInsuranceProvider("Liberty");

        int oldListSize = patientDao.getAllPatients().size();

        patientDao.addPatient(patient);
        List<Patient> newList = patientDao.getAllPatients();
        assertNotNull(newList);
        assertEquals(oldListSize + 1, newList.size());


    }

    @Test
    @Sql({"/testSchema.sql", "/testData.sql"})
    @DisplayName("Get A List Of All Patients")
    public void getListOfAllPatientsTest() {
        List<Patient> newList = patientDao.getAllPatients();
        assertNotNull(newList);
        assertEquals(5, newList.size());
    }

    @Test
    @Sql({"/testSchema.sql", "/testData.sql"})
    @DisplayName("Find Patient By Id")
    public void findPatientByIdTest() {
        Patient patient = patientDao.getPatientById(2);
        assertNotNull(patient);
        assertEquals("Bob", patient.getpFName());
        assertEquals("Williams", patient.getpLName());
        assertEquals("1985-08-20", patient.getBirthday());
        assertEquals("8045555678", patient.getPhoneNumber());
        assertEquals("MedicalGuard", patient.getInsuranceProvider());
    }

    @Test
    @Sql({"/testSchema.sql", "/testData.sql"})
    @DisplayName("Update Patient Info")
    public void updateCourseInfoTest() {
        Patient patient = new Patient();
        patient.setPID(2);
        patient.setpFName("Luan");
        patient.setpLName("Nguyen");
        patient.setBirthday("1985-08-20");
        patient.setPhoneNumber("8045555678");
        patient.setInsuranceProvider("MedicalGuard");

        patientDao.updatePatient(patient);


        Patient retrieved = patientDao.getPatientById(2);
        assertNotNull(retrieved);
        assertEquals("Luan", retrieved.getpFName());
        assertEquals("Nguyen", retrieved.getpLName());
        assertEquals("1985-08-20", retrieved.getBirthday());
        assertEquals("8045555678", retrieved.getPhoneNumber());
        assertEquals("MedicalGuard", retrieved.getInsuranceProvider());
    }

    @Test
    @DisplayName("Delete Patient Test")
    @Sql({"/testSchema.sql", "/testData.sql"})
    @Transactional
    public void deletePatientTest() {
        //Delete patient with id 8 as they are not enrolled in any classes
        patientDao.deletePatientById(2);
        assertNotNull(patientDao.getAllPatients());
        assertEquals(4, patientDao.getAllPatients().size());
    }
}
