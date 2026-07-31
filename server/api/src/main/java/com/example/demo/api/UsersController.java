package com.example.demo.api;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AuthenticatedUserDto;

@RestController
public class UsersController extends BaseRestController {

    private static final String API_PREFIX_PATH = "/users";

    @GetMapping(API_PREFIX_PATH + "/me")
    public AuthenticatedUserDto me(Authentication authentication) {

        var user = new AuthenticatedUserDto(authentication.getName());

        return user;
    }
}
