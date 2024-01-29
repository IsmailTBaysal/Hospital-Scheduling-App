package com.example.hasapp.dao;

import com.example.hasapp.dao.mappers.DoctorMapper;
import com.example.hasapp.dto.Doctor;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DoctorRepoImpl implements DoctorRepo{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public DoctorRepoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Doctor getDoctorById(int id) {
        try {
            final String SELECT_DOCTOR_BY_ID = "SELECT * FROM Doctor WHERE DID = ?";
            return jdbcTemplate.queryForObject(SELECT_DOCTOR_BY_ID, new DoctorMapper(), id);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<Doctor> getAllDoctors() {
        try {
            final String SELECT_ALL_DOCTORS = "SELECT * FROM Doctor";
            return jdbcTemplate.query(SELECT_ALL_DOCTORS, new DoctorMapper());
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public Doctor addDoctor(Doctor doctor) {
        final String INSERT_DOCTOR = "INSERT INTO Doctor(dFName, dLName, specialty, officeNumber) "
                + "VALUES(?,?,?,?)";
        jdbcTemplate.update(INSERT_DOCTOR,
                doctor.getDFName(),
                doctor.getDLName(),
                doctor.getSpecialty(),
                doctor.getOfficeNumber()
        );

        int newId = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        doctor.setDid(newId);
        return doctor;
    }

    @Override
    public void updateDoctor(Doctor doctor) {
        final String UPDATE_DOCTOR = "UPDATE Doctor SET dFName = ?, dLName = ?, specialty = ?, officeNumber = ? "
                + "WHERE DID = ?";
        jdbcTemplate.update(UPDATE_DOCTOR,
                doctor.getDFName(),
                doctor.getDLName(),
                doctor.getSpecialty(),
                doctor.getOfficeNumber(),
                doctor.getDid());
    }

    @Override
    @Transactional
    public void deleteDoctor(int id) {
        // Delete associated appointments first
        deleteAppointmentsByDoctorId(id);

        // Then delete the doctor
        final String DELETE_DOCTOR = "DELETE FROM Doctor WHERE DID = ?";
        jdbcTemplate.update(DELETE_DOCTOR, id);
    }

    private void deleteAppointmentsByDoctorId(int doctorId) {
        final String DELETE_APPOINTMENT_DOCTOR = "DELETE FROM Appointment WHERE DID = ?";
        jdbcTemplate.update(DELETE_APPOINTMENT_DOCTOR, doctorId);
    }

}