package com.example.hasapp.dao;

import com.example.hasapp.dao.mappers.PatientMapper;
import com.example.hasapp.dto.Patient;
import jakarta.transaction.Transactional;
import net.sf.jsqlparser.expression.DateTimeLiteralExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

@Repository
public class PatientRepoImpl implements PatientRepo{




    @Autowired
    private final JdbcTemplate jdbc;

    public PatientRepoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbc = jdbcTemplate;
    }

    @Override
    public Patient getPatientById(int id) {
        try {
            final String SELECT_PATIENT_BY_ID = "SELECT * FROM Patient WHERE PID = ?";
            return jdbc.queryForObject(SELECT_PATIENT_BY_ID, new PatientMapper(), id);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<Patient> getAllPatients() {
        try {
            final String SELECT_ALL_PATIENT = "SELECT * FROM Patient";
            return jdbc.query(SELECT_ALL_PATIENT, new PatientMapper());
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public Patient addPatient(Patient patient) {


        final String INSERT_Patient = "INSERT INTO Patient(pFName, pLName, birthday, phoneNumber, insuranceProvider) "
                + "VALUES(?,?,?,?,?)";
        jdbc.update(INSERT_Patient,
                patient.getpFName(),
                patient.getpLName(),
                patient.getBirthday(),
                patient.getPhoneNumber(),
                patient.getInsuranceProvider()
                );

        int newId = jdbc.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        patient.setPID(newId);
        return patient;
    }

    @Override
    public void updatePatient(Patient patient) {
        final String UPDATE_Patient = "UPDATE Patient SET pFName = ?, pLName = ?, birthday = ?, phoneNumber = ?, insuranceProvider =? "
                + "WHERE PID = ?";
        jdbc.update(UPDATE_Patient,
                patient.getpFName(),
                patient.getpLName(),
                patient.getBirthday(),
                patient.getPhoneNumber(),
                patient.getInsuranceProvider(),
                patient.getPID());
    }

    @Override
    @Transactional
    public void deletePatientById(int id) {

        final String DELETE_APPOINTMENT_PATIENT = "DELETE FROM Appointment WHERE PID = ?";
        jdbc.update(DELETE_APPOINTMENT_PATIENT, id);


        final String DELETE_PATIENT = "DELETE FROM Patient WHERE PID = ?";
        jdbc.update(DELETE_PATIENT, id);



    }



}
