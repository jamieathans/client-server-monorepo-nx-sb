package com.example.demo.dto;

import java.util.List;

public record UserDto(
        String id,
        List<Role> roles,
        String username,
        String firstName,
        String surname,
        String email) {
}
