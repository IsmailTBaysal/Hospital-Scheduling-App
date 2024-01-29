package com.example.hasapp.dao.mappers;

import com.example.hasapp.dto.Doctor;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class DoctorMapper implements RowMapper<Doctor> {
    @Override
    public Doctor mapRow(ResultSet rs, int rowNum) throws SQLException {
        // create a new Doctor object and set the properties
        // with the data from the database
        Doctor doctor = new Doctor();
        doctor.setDid(rs.getInt("did")); // doctor id
        doctor.setDFName(rs.getString("dFName")); // doctor first name
        doctor.setDLName(rs.getString("dLName")); // doctor last name
        doctor.setSpecialty(rs.getString("specialty")); // doctor specialty
        doctor.setOfficeNumber(rs.getString("officeNumber")); // doctor office number
        return doctor; // return the Doctor object
    }
}
