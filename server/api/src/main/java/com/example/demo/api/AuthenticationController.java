package com.example.demo.api;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class AuthenticationController extends BaseRestController {

    private static final String API_PREFIX_PATH = "/authentication";

    @GetMapping(API_PREFIX_PATH + "/is-authenticated")
    public boolean isAuthenticated() {
        return true;
    }
}
