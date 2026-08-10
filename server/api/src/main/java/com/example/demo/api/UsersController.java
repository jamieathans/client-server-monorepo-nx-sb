package com.example.demo.api;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UserDto;
import com.example.demo.service.UsersService;

@RestController
public class UsersController extends BaseRestController {

    private static final String API_PREFIX_PATH = "/users";

    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping(API_PREFIX_PATH + "/me")
    public UserDto me(@AuthenticationPrincipal UserDetails userDetails) {

        var userDto = usersService.getUserByUsername(userDetails.getUsername());

        return userDto.get();
    }

    @GetMapping(API_PREFIX_PATH)
    public List<UserDto> allUsers() {
        
        return usersService.getAllUsers();
    }
}
