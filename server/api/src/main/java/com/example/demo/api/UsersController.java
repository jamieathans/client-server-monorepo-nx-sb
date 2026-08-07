package com.example.demo.api;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UserDto;

@RestController
public class UsersController extends BaseRestController {

    private static final String API_PREFIX_PATH = "/users";

    @GetMapping(API_PREFIX_PATH + "/me")
    public UserDto me(Authentication authentication) {

        var user = new UserDto(authentication.getName());

        return user;
    }
}
