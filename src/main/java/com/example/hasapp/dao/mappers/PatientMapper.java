package com.example.hasapp.dao.mappers;

import com.example.hasapp.dto.Patient;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public final class PatientMapper implements RowMapper<Patient> {

    @Override
    public Patient mapRow(ResultSet rs, int index) throws SQLException {
        Patient patient = new Patient();
        patient.setPID(rs.getInt("PID"));
        patient.setpFName(rs.getString("pFName"));
        patient.setpLName(rs.getString("pLName"));




        patient.setBirthday(rs.getString("birthday"));

        patient.setPhoneNumber(rs.getString("phoneNumber"));
        patient.setInsuranceProvider(rs.getString("insuranceProvider"));

        return patient;
    }
}