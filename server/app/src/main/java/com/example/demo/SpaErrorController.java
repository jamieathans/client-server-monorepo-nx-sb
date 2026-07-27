package com.example.demo;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.boot.webmvc.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.demo.api.BaseRestController;

@Controller
public class SpaErrorController implements ErrorController {

    @GetMapping("/error")
    public Object handleError(HttpServletRequest request) {
        var statusCode = (Integer) request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        var requestUri = (String) request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI);

        if (statusCode == null) {
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
        }

        var httpStatus = HttpStatus.valueOf(statusCode);

        if (httpStatus == HttpStatus.NOT_FOUND) {
            // If the 404 did NOT originate from an API route, forward to index.html
            if (requestUri != null && !requestUri.startsWith(BaseRestController.API_PREFIX_PATH)) {
                return "forward:/index.html";
            }
        }

        // Maintain default JSON/API response behavior for APIs or other errors
        return ResponseEntity.status(httpStatus).body(httpStatus.getReasonPhrase());
    }
}
