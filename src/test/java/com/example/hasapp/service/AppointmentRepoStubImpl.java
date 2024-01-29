package com.example.hasapp.service;

import com.example.hasapp.dao.AppointmentRepo;
import com.example.hasapp.dto.Appointment;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

public class AppointmentRepoStubImpl implements AppointmentRepo {
    public Appointment onlyAppointment;

    public AppointmentRepoStubImpl() {
        onlyAppointment = new Appointment();
        onlyAppointment.setAppointmentId(999);
        onlyAppointment.setPatientId(998);
        onlyAppointment.setDoctorId(997);
        onlyAppointment.setAppointmentDateTime(LocalDateTime.now());
        onlyAppointment.setNote("TEST");
        onlyAppointment.setStatus("Scheduled");
        onlyAppointment.setHasPaid(false);
    }


    @Override
    public List<Appointment> getAllAppointments() {
        return null;
    }

    @Override
    public Appointment getAppointmentById(int id) {
        if (id == onlyAppointment.getAppointmentId()) {
            return onlyAppointment;
        } else return null;
    }

    @Override
    public Appointment addAppointment(Appointment appointment) {
        appointment.setAppointmentId(123); // Mock ID
        return appointment;
    }

    @Override
    public void updateAppointment(Appointment appointment) {
        onlyAppointment.setAppointmentDateTime(appointment.getAppointmentDateTime());
        onlyAppointment.setNote(appointment.getNote());
        onlyAppointment.setStatus(appointment.getStatus());
        onlyAppointment.setHasPaid(appointment.getHasPaid());
    }

    @Override
    public void deleteAppointmentById(int id) {

    }

    @Override
    public List<Appointment> getAppointmentsByPatientId(int patientId) {
        if (onlyAppointment.getPatientId() == patientId) {
            return Collections.singletonList(onlyAppointment);
        } else {
            return Collections.emptyList();
        }
    }

    @Override
    public List<Appointment> getAppointmentsByDoctorId(int doctorId) {
        if (onlyAppointment.getDoctorId() == doctorId) {
            return Collections.singletonList(onlyAppointment);
        } else {
            return Collections.emptyList();
        }
    }
}
