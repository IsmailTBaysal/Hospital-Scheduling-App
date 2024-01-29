package com.example.hasapp.service;

import com.example.hasapp.dto.Appointment;

import java.util.List;

public interface AppointmentService {
    List<Appointment> getAllAppointments();

    Appointment getAppointmentById(int id);
    List<Appointment> getAppointmentsByPatientId(int patientId);
    List<Appointment> getAppointmentsByDoctorId(int doctorId);

    Appointment addNewAppointment(Appointment appointment);

    Appointment updateAppointmentData(int id, Appointment appointment);

    void deleteAppointmentById(int id);
}
