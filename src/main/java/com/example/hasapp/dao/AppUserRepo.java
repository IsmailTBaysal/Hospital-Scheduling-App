package com.example.hasapp.dao;

import com.example.hasapp.dto.AppUser;

public interface AppUserRepo {
    AppUser findByUsername(String username);

    AppUser add(AppUser appUser);
}
