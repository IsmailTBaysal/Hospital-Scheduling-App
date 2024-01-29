package com.example.hasapp.dao;

import com.example.hasapp.dto.Appointment;
import com.example.hasapp.dto.Doctor;
import com.example.hasapp.dto.Patient;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface AppointmentRepo {
    List<Appointment> getAllAppointments();
    Appointment getAppointmentById(int id);
    Appointment addAppointment(Appointment appointment);
    void updateAppointment(Appointment appointment);
    void deleteAppointmentById(int id);
    List<Appointment> getAppointmentsByPatientId(int patientId);
    List<Appointment> getAppointmentsByDoctorId(int doctorId);
}
