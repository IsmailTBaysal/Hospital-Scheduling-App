package com.example.hasapp.dao;

import com.example.hasapp.dto.Appointment;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.jdbc.Sql;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
public class AppointmentRepoImplTests {

    private AppointmentRepoImpl appointmentRepo;


    @Autowired
    public AppointmentRepoImplTests( AppointmentRepoImpl appointmentRepo) {
        this.appointmentRepo = appointmentRepo;
    }
    @Test
    @Sql({"/testSchema.sql", "/testData.sql"})
    @DisplayName("Test saving a new appointment")
    public void addNewAppointmentTest(){
        Appointment newAppointment =  new Appointment();
        newAppointment.setPatientId(1);
        newAppointment.setDoctorId(1);
        newAppointment.setAppointmentDateTime(LocalDateTime.now());


        int oldListSize = appointmentRepo.getAllAppointments().size();

        appointmentRepo.addAppointment(newAppointment);
        List<Appointment> newList = appointmentRepo.getAllAppointments();
        assertNotNull(newList);
        assertEquals(oldListSize + 1, newList.size());
    }

    @Test
    @Sql({"/testSchema.sql", "/testData.sql"})
    @DisplayName("Test retrieving all appointments")
    void testGetAllAppointments() {
        List<Appointment> appointments = appointmentRepo.getAllAppointments();
        assertNotNull(appointments);
        assertFalse(appointments.isEmpty());
    }

    @Test
    @Sql({"/testSchema.sql", "/testData.sql"})
    @DisplayName("Test finding an appointment by ID")
    void testGetAppointmentById() {
        Appointment appointment = appointmentRepo.getAppointmentById(1);
        assertNotNull(appointment);
        assertEquals(1, appointment.getAppointmentId());
    }

    @Test
    @Sql({"/testSchema.sql", "/testData.sql"})
    @DisplayName("Test updating an existing appointment")
    void testUpdateAppointment() {

        Appointment originalAppointment = appointmentRepo.getAppointmentById(1);
        assertNotNull(originalAppointment, "Appointment should exist");

        String updatedNote = "Updated note";
        originalAppointment.setNote(updatedNote);

        appointmentRepo.updateAppointment(originalAppointment);

        Appointment updatedAppointment = appointmentRepo.getAppointmentById(1);


        assertNotNull(updatedAppointment, "Updated appointment should not be null");
        assertEquals(updatedNote, updatedAppointment.getNote(), "Note should be updated");

    }
    @Test
    @Sql({"/testSchema.sql", "/testData.sql"})
    @DisplayName("Test deleting an appointment by ID")
    void testDeleteAppointmentById() {
        int countBeforeDeletion = appointmentRepo.getAllAppointments().size();
        appointmentRepo.deleteAppointmentById(1);

        int countAfterDeletion =appointmentRepo.getAllAppointments().size();
        assertEquals(countBeforeDeletion - 1, countAfterDeletion, "The count after deletion should be one less than before deletion.");
    }


    @Test
    @Sql({"/testSchema.sql", "/testData.sql"})
    @DisplayName("Test retrieving appointments by patient ID")
    void testGetAppointmentsByPatientId() {
        List<Appointment> appointments = appointmentRepo.getAppointmentsByPatientId(1);

        assertNotNull(appointments, "Appointments list should not be null");
        assertFalse(appointments.isEmpty(), "Appointments list should not be empty");
        assertTrue(appointments.stream().allMatch(a -> a.getPatientId() == 1), "All appointments should belong to the patient ID");
    }
    @Test
    @DisplayName("Test retrieving appointments by doctor ID")
    void testGetAppointmentsByDoctorId() {
        List<Appointment> appointments = appointmentRepo.getAppointmentsByDoctorId(1);

        // Assert
        assertNotNull(appointments, "Appointments list should not be null");
        assertFalse(appointments.isEmpty(), "Appointments list should not be empty");
        assertTrue(appointments.stream().allMatch(a -> a.getDoctorId() == 1), "All appointments should belong to the doctor ID");
    }


}
