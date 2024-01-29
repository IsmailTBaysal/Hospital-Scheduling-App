package com.example.hasapp.controller;


import com.example.hasapp.dto.Appointment;
import com.example.hasapp.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointment")
@CrossOrigin
public class AppointmentController {
    @Autowired
    AppointmentService appointmentService;

    @GetMapping("/appointments")
    public List<Appointment> getAllAppointments(){
        return appointmentService.getAllAppointments();
    }
    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable int id){
        return appointmentService.getAppointmentById(id);
    }
    @GetMapping("/patient/{patientId}")
    public List<Appointment> getAppointmentsByPatientId(@PathVariable int patientId) {
        return appointmentService.getAppointmentsByPatientId(patientId);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getAppointmentsByDoctorId(@PathVariable int doctorId) {
        return appointmentService.getAppointmentsByDoctorId(doctorId);
    }

    @PostMapping("/add")
    public Appointment addAppointment(@RequestBody Appointment appointment) {
        return appointmentService.addNewAppointment(appointment);
    }
    @PutMapping("/{id}")
    public Appointment updateAppointment(@PathVariable int id, @RequestBody Appointment appointment) {
        return appointmentService.updateAppointmentData(id, appointment);
    }
    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable int id) {
        appointmentService.deleteAppointmentById(id);
    }
    }
