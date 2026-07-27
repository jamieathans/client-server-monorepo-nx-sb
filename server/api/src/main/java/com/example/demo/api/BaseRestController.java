package com.example.demo.api;

import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(BaseRestController.API_PREFIX_PATH)
public abstract class BaseRestController {
    public static final String API_PREFIX_PATH = "/api";
}
