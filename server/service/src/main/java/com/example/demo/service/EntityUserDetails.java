package com.example.demo.service;

import java.util.Collection;
import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.demo.data.entity.UserEntity;

public class EntityUserDetails implements UserDetails {

    private final String username;
    private final String password;
    private final List<? extends GrantedAuthority> authorities;

    public EntityUserDetails(UserEntity userEntity) {
        username = userEntity.getUsername();
        password = userEntity.getPassword();
        authorities = userEntity.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name())).toList();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public @Nullable String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

}
