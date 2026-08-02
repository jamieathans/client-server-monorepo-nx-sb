package com.example.demo.api;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class AuthenticationController extends BaseRestController {

    public static final String API_PREFIX_PATH = "/authentication";

    @GetMapping(API_PREFIX_PATH + "/is-authenticated")
    public void isAuthenticated() {
        // Intentionally empty, just return status 200 if authenticated.
    }
}
