package com.example.hasapp.service;

import com.example.hasapp.dao.AppUserRepo;
import com.example.hasapp.dto.AppUser;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AppUserService implements UserDetailsService {

    private final AppUserRepo appUserRepo;
    private final PasswordEncoder passwordEncoder;

    public AppUserService(AppUserRepo appUserRepo, PasswordEncoder passwordEncoder) {
        this.appUserRepo = appUserRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AppUser loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepo.findByUsername(username);

        if (appUser == null || !appUser.isEnabled()) {
            throw new UsernameNotFoundException(String.format("%s not found.", username));
        }

        return appUser;
    }

    public Result<AppUser> add(String username, String password, String email) {
        Result<AppUser> result = validate(username, password, email);
        if (!result.isSuccess()) {
            return result;
        }

        password = passwordEncoder.encode(password);

        AppUser appUser = new AppUser(0, username, password, true, email, List.of("USER"));

        result.setPayload(appUserRepo.add(appUser));

        return result;
    }


    private Result<AppUser> validate(String username, String password, String email) {
        Result<AppUser> result = new Result<>();

        if (username == null || username.isBlank()) {
            result.addMessage("username is required");
        }

        if (password == null || password.isBlank()) {
            result.addMessage("password is required");
        }

        if (email == null || email.isBlank()) {
            result.addMessage("email is required");
        } else if (!isValidEmail(email)) {
            result.addMessage("invalid email format");
        }

        if (!result.isSuccess()) {
            return result;
        }

        if (username.length() > 50) {
            result.addMessage("username must be 50 characters max");
        }

//        if (!validatePassword(password)) {
//            result.addMessage("password must be at least 8 characters and contain a digit, a letter, and a non-digit/non-letter");
//        }

        try {
            if (loadUserByUsername(username) != null) {
                result.addMessage("the provided username already exists");
            }
        } catch (UsernameNotFoundException e) {

        }

        return result;
    }

    private boolean isValidEmail(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@(.+)$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }


//    private boolean validatePassword(String password) {
//        if (password.length() < 8) {
//            return false;
//        }
//
//        int digits = 0;
//        int letters = 0;
//        int others = 0;
//        for (char c : password.toCharArray()) {
//            if (Character.isDigit(c)) {
//                digits++;
//            } else if (Character.isLetter(c)) {
//                letters++;
//            } else {
//                others++;
//            }
//        }
//
//        return digits > 0 && letters > 0 && others > 0;
//    }
}
