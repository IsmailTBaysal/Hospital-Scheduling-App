package com.example.hasapp.dao;

import com.example.hasapp.dao.mappers.AppUserMapper;
import com.example.hasapp.dto.AppUser;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashMap;
import java.util.List;
@Repository
public class AppUserRepoImpl implements AppUserRepo{
    private final JdbcTemplate jdbcTemplate;

    public AppUserRepoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional
    public AppUser findByUsername(String username) {

        String sql = """
                select
                     u.user_id,
                     u.username,
                     u.password_hash,
                     u.enabled,
                     u.email
                from user u
                where u.username = ?;
                """;
        return jdbcTemplate.query(sql, new AppUserMapper(getAuthorities(username)), username).stream()
                .findFirst().orElse(null);
    }

    @Override
    @Transactional
    public AppUser add(AppUser appUser) {
        SimpleJdbcInsert insert = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName("user")
                .usingColumns("username", "password_hash", "enabled", "email")
                .usingGeneratedKeyColumns("user_id");

        HashMap<String, Object> args = new HashMap<>();
        args.put("username", appUser.getUsername());
        args.put("password_hash", appUser.getPassword());
        args.put("enabled", appUser.isEnabled());
        args.put("email", appUser.getEmail());

        int id = insert.executeAndReturnKey(args).intValue();
        appUser.setId(id);

        updateRoles(appUser);

        return appUser;
    }

    private void updateRoles(AppUser appUser) {
        jdbcTemplate.update("delete from user_role where user_id = ?;", appUser.getId());
        for (var authority : appUser.getAuthorities()) {
            String sql = """
                    insert into user_role (user_id, role_id)
                    values (?, (select role_id from role where `name` = ?));
                    """;
            jdbcTemplate.update(sql, appUser.getId(), authority.getAuthority());
        }
    }

    private List<String> getAuthorities(String username) {
        final String sql = """
                select
                    r.name
                from role r
                inner join user_role ur on ur.role_id = r.role_id
                inner join user u on u.user_id = ur.user_id
                where u.username = ?;
                """;
        return jdbcTemplate.query(sql, (rs, i) -> rs.getString("name"), username);
    }
}
