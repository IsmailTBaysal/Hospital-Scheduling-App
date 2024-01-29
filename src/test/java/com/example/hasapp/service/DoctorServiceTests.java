package com.example.hasapp.service;

import com.example.hasapp.dao.DoctorRepo;
import com.example.hasapp.dto.Doctor;
import jakarta.validation.ValidationException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class DoctorServiceTests {
    private DoctorServiceImpl doctorService;

    public DoctorServiceTests() {
        DoctorRepo doctorRepo = new DoctorRepoStubImpl();
        doctorService = new DoctorServiceImpl(doctorRepo);
    }

    @Test
    @DisplayName("Add New Correct Doctor Test")
    void addNewCorrectDoctor() {
        Doctor doctor = new Doctor();
        doctor.setDFName("John");
        doctor.setDLName("Doe");
        doctor.setSpecialty("Cardiology");

        Doctor result = doctorService.addNewDoctor(doctor);
        assertNotNull(result, "Doctor should not be null");
    }

    @Test
    @DisplayName("Add New Doctor Empty First Name Test")
    void addNewDoctorEmptyFirstName() {
        Doctor doctor = new Doctor();
        doctor.setDLName("Doe");
        doctor.setSpecialty("Cardiology");

        Exception exception = assertThrows(ValidationException.class, () -> {
            doctorService.addNewDoctor(doctor);
        });

        assertEquals("Doctor's first name is required.", exception.getMessage());
    }

    @Test
    @DisplayName("Add New Doctor Empty Last Name Test")
    void addNewDoctorEmptyLastName() {
        Doctor doctor = new Doctor();
        doctor.setDFName("John");
        doctor.setSpecialty("Cardiology");

        Exception exception = assertThrows(ValidationException.class, () -> {
            doctorService.addNewDoctor(doctor);
        });

        assertEquals("Doctor's last name is required.", exception.getMessage());
    }

    @Test
    @DisplayName("Add New Doctor Empty Specialty Test")
    void addNewDoctorEmptySpecialty() {
        Doctor doctor = new Doctor();
        doctor.setDFName("John");
        doctor.setDLName("Doe");

        Exception exception = assertThrows(ValidationException.class, () -> {
            doctorService.addNewDoctor(doctor);
        });

        assertEquals("Doctor's specialty is required.", exception.getMessage());
    }

    @Test
    @DisplayName("Get All Doctors Test")
    void getAllDoctors() {
        List<Doctor> doctors = doctorService.getAllDoctors();
        assertNotNull(doctors, "List of doctors should not be null");
    }

    @Test
    @DisplayName("Get Doctor by ID Test")
    void getDoctorById() {
        int doctorId = 200;
        Doctor doctor = doctorService.getDoctorById(doctorId);
        assertNotNull(doctor, "Doctor should not be null");
        assertEquals(doctorId, doctor.getDid(), "Returned doctor ID should match input ID");
    }

    @Test
    @DisplayName("Update Doctor Data Test")
    void updateDoctorData() {
        Doctor existingDoctor = new Doctor();
        existingDoctor.setDid(200);
        existingDoctor.setDFName("John");
        existingDoctor.setDLName("Doe");
        existingDoctor.setSpecialty("Cardiology");

        String updatedLastName = "UpdatedLastName";
        existingDoctor.setDLName(updatedLastName);

        Doctor updatedDoctor = doctorService.updateDoctorData(existingDoctor.getDid(), existingDoctor);

        assertNotNull(updatedDoctor, "Updated doctor should not be null");
        assertEquals(updatedLastName, updatedDoctor.getDLName(), "Last name should be updated");
    }

    @Test
    @DisplayName("Delete Doctor by ID Test")
    void deleteDoctorById() {
        int doctorId = 200;

        try {
            doctorService.deleteDoctorById(doctorId);
            // Optionally, add more assertions based on the expected behavior after successful deletion
        } catch (Exception e) {
            fail("Should not throw an exception: " + e.getMessage());
        }
    }

}
