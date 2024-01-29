package com.example.hasapp.service;

import com.example.hasapp.dao.AppointmentRepo;
import com.example.hasapp.dto.Appointment;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepo appointmentRepo;
    @Autowired
    public AppointmentServiceImpl(AppointmentRepo appointmentRepo) {
        this.appointmentRepo = appointmentRepo;
    }
    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepo.getAllAppointments();
    }
    @Override
    public Appointment getAppointmentById(int id) {
        return appointmentRepo.getAppointmentById(id);
    }

    @Override
    public List<Appointment> getAppointmentsByPatientId(int patientId) {
        return appointmentRepo.getAppointmentsByPatientId(patientId);
    }

    @Override
    public List<Appointment> getAppointmentsByDoctorId(int doctorId) {
        return appointmentRepo.getAppointmentsByDoctorId(doctorId);
    }

    @Override
    public Appointment addNewAppointment(Appointment appointment) {
        validateAppointmentData(appointment);
        return appointmentRepo.addAppointment(appointment);
    }

    @Override
    public Appointment updateAppointmentData(int id, Appointment appointment) {
        validateAppointmentData(appointment);
        if (id == appointment.getAppointmentId()) {
            appointmentRepo.updateAppointment(appointment);
        } else {
            throw new IllegalArgumentException("Mismatched appointment ID");
        }
        return appointment;
    }

    @Override
    public void deleteAppointmentById(int id) {
        appointmentRepo.deleteAppointmentById(id);
    }

    private void validateAppointmentData(Appointment appointment) throws IllegalArgumentException {
        if (appointment == null) {
            throw new ValidationException("Appointment cannot be null");
        }
//        if (appointment.getAppointmentId() <= 0) {
//            throw new ValidationException("Invalid appointment ID");
//        }
        if (appointment.getDoctorId() <= 0) {
            throw new ValidationException("Invalid doctor ID");
        }
        if (appointment.getPatientId() <= 0) {
            throw new ValidationException("Invalid patient ID");
        }
        if (appointment.getAppointmentDateTime() == null) {
            throw new ValidationException("Appointment date cannot be null");
        }
        if (appointment.getAppointmentDateTime().isBefore(LocalDate.now().atStartOfDay())) {
            throw new ValidationException("Appointment date must be in the future.");
        }
        if (appointment.getStatus() == null || appointment.getStatus().trim().isEmpty()) {
            throw new ValidationException("Appointment status is required.");
        }
//        if (!isTimeSlotAvailable(appointment.getDoctorId(), appointment.getAppointmentDateTime())) {
//            throw new ValidationException("The selected time slot is not available.");
//        }
    }

//    public boolean isTimeSlotAvailable(int doctorId, LocalDateTime appointmentDateTime) {
//        Duration standardAppointmentDuration = Duration.ofMinutes(30);
//
//        LocalDateTime appointmentEndTime = appointmentDateTime.plus(standardAppointmentDuration);
//
//        List<Appointment> existingAppointments = appointmentRepo.getAppointmentsByDoctorId(doctorId);
//
//        for (Appointment existingAppointment : existingAppointments) {
//            LocalDateTime existingStart = existingAppointment.getAppointmentDateTime();
//            LocalDateTime existingEnd = existingStart.plus(standardAppointmentDuration);
//
//            if (appointmentDateTime.isBefore(existingEnd) && appointmentEndTime.isAfter(existingStart)) {
//                return false; // Conflict found, time slot is not available
//            }
//        }
//        return true; // No conflict found, time slot is available
//    }
}
