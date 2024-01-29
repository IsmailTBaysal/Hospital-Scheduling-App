package com.example.hasapp.dao.mappers;

import com.example.hasapp.dto.AppUser;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class AppUserMapper implements RowMapper<AppUser> {
    private final List<String> authorities;

    public AppUserMapper(List<String> authorities) {
        this.authorities = authorities;
    }

    @Override
    public AppUser mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new AppUser(
                rs.getInt("user_id"),
                rs.getString("username"),
                rs.getString("password_hash"),
                rs.getBoolean("enabled"),
                rs.getString("email"),
                authorities
        );
    }
}
