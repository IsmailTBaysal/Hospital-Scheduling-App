package com.example.hasapp.service;

import com.example.hasapp.dao.AppointmentRepo;
import com.example.hasapp.dto.Appointment;
import jakarta.validation.ValidationException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class AppointmentServiceTests {
    private AppointmentServiceImpl appointmentService;

    public AppointmentServiceTests() {
        AppointmentRepo appointmentRepo = new AppointmentRepoStubImpl();
        appointmentService = new AppointmentServiceImpl(appointmentRepo);
    }

    @Test
    @DisplayName("Add New Correct Appointment Test")
    void addNewCorrectAppointment() {
        Appointment appointment = new Appointment();
        appointment.setDoctorId(1);
        appointment.setPatientId(1);
        appointment.setAppointmentDateTime(LocalDateTime.now());
        appointment.setNote("TEST NOTE");
        appointment.setStatus("TEST STATUS");
        appointment.setHasPaid(false);


        Appointment result = appointmentService.addNewAppointment(appointment);
        assertNotNull(result, "Appointment should not be null");
    }
    @Test
    @DisplayName("Add New Appointment Empty Patient ID Test")
    void addNewAppointmentEmptyPatientId() {
        Appointment appointment = new Appointment();
        appointment.setDoctorId(1);
        appointment.setAppointmentDateTime(LocalDateTime.now());
        appointment.setNote("TEST NOTE");
        appointment.setStatus("TEST STATUS");
        appointment.setHasPaid(false);

        Exception exception = assertThrows(ValidationException.class, () -> {
            appointmentService.addNewAppointment(appointment);
        });

        assertEquals("Invalid patient ID", exception.getMessage());

    }

    @Test
    @DisplayName("Add New Appointment Empty Doctor ID Test")
    void addNewAppointmentEmptyDoctorId() {
        Appointment appointment = new Appointment();
        appointment.setPatientId(1);
        appointment.setAppointmentDateTime(LocalDateTime.now());
        appointment.setNote("TEST NOTE");
        appointment.setStatus("TEST STATUS");
        appointment.setHasPaid(false);

        Exception exception = assertThrows(ValidationException.class, () -> {
            appointmentService.addNewAppointment(appointment);
        });

        assertEquals("Invalid doctor ID", exception.getMessage());

    }

    @Test
    @DisplayName("Add New Old Date Appointment Test")
    void addNewOldDateAppointment() {
        Appointment appointment = new Appointment();
        appointment.setDoctorId(1);
        appointment.setPatientId(1);
        appointment.setAppointmentDateTime(LocalDateTime.parse("2022-12-22T00:00:00")); // Corrected date format
        appointment.setNote("TEST NOTE");
        appointment.setStatus("TEST STATUS");
        appointment.setHasPaid(false);

        Exception exception = assertThrows(ValidationException.class, () -> {
            appointmentService.addNewAppointment(appointment);
        });

        assertEquals("Appointment date must be in the future.", exception.getMessage());
    }


    @Test
    void updateCorrectAppointmentData() {
        AppointmentRepoStubImpl stubRepo = new AppointmentRepoStubImpl();
        Appointment existingAppointment = stubRepo.onlyAppointment;

        String updatedNote = "Updated Note";
        existingAppointment.setNote(updatedNote);

        appointmentService.updateAppointmentData(existingAppointment.getAppointmentId(),existingAppointment);

        Appointment updatedAppointment = stubRepo.onlyAppointment;

        assertNotNull(updatedAppointment, "Updated appointment should not be null");
        assertEquals(updatedNote, updatedAppointment.getNote(), "Note should be updated");
    }




}
