package com.example.demo.api;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.Role;
import com.example.demo.dto.UserDto;

@RestController
public class UsersController extends BaseRestController {

    private static final String API_PREFIX_PATH = "/users";

    @GetMapping(API_PREFIX_PATH + "/me")
    public UserDto me(@AuthenticationPrincipal UserDetails userDetails) {

        var username = userDetails.getUsername();
        var roles = userDetails.getAuthorities().stream().map(a -> Role.valueOf(a.getAuthority())).toList();

        var userDto = new UserDto(username, roles.toArray(Role[]::new));

        return userDto;
    }
}
