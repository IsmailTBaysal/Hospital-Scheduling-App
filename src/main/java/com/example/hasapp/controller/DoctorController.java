package com.example.hasapp.controller;

import com.example.hasapp.dto.Doctor;
import com.example.hasapp.service.DoctorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctor")
@CrossOrigin
public class DoctorController {

    @Autowired
    private DoctorServiceImpl doctorServiceImpl;

    @GetMapping("/doctors")
    public List<Doctor> getAllDoctors() {
        // get all the doctors
        return doctorServiceImpl.getAllDoctors();
    }

    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable int id) {
        // get the doctor by id
        return doctorServiceImpl.getDoctorById(id);
    }

    @PostMapping("/add")
    public Doctor addDoctor(@RequestBody Doctor doctor) {
        // add a doctor
        return doctorServiceImpl.addNewDoctor(doctor);
    }

    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable int id, @RequestBody Doctor doctor) {
        // update a doctor
        return doctorServiceImpl.updateDoctorData(id, doctor);
    }

    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable int id) {
        // delete a doctor
        doctorServiceImpl.deleteDoctorById(id);
    }
}