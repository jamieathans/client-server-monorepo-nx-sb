package com.example.demo.dto;

import org.jspecify.annotations.Nullable;

import java.util.List;

public record UserDto(
                String id,
                List<Role> roles,
                String username,
                String firstName,
                String surname,
                String email,
                @Nullable String password) {

        public UserDto(String id,
                        List<Role> roles,
                        String username,
                        String firstName,
                        String surname,
                        String email) {

                this(id, roles, username, firstName, surname, email, null);
        }
}
