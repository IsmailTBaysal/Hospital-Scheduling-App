package com.example.hasapp.dao.mappers;

import com.example.hasapp.dto.Appointment;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class AppointmentMapper implements RowMapper<Appointment> {
    @Override
    public Appointment mapRow(ResultSet rs, int rowNum) throws SQLException {
        Appointment appointment = new Appointment();
        appointment.setAppointmentId(rs.getInt("AID"));
        appointment.setPatientId(rs.getInt("PID"));
        appointment.setDoctorId(rs.getInt("DID"));
        appointment.setAppointmentDateTime(rs.getObject("appointmentDateTime", LocalDateTime.class));
        appointment.setStatus(rs.getString("status"));
        appointment.setNote(rs.getString("note"));
        appointment.setHasPaid(rs.getBoolean("hasPaid"));
        return appointment;
    }
}
