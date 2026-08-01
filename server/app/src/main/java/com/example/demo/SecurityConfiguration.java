package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

import com.example.demo.api.BaseRestController;
import com.example.demo.api.GitRepoController;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfiguration {

        // Static assets from front end build.
        private static final String[] FRONT_END_ASSETS = {
                        "/",
                        "/index.html",
                        "/favicon.ico",
                        "/*.css",
                        "/*.js",
                        "/assets/**",
        };

        private static final String[] FRONT_END_ROUTES = {
                        "/notifications/**",
                        "/loaders/**",
                        "/login/**",
        };

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) {

                httpSecurity.csrf(csrf -> csrf.spa())
                                .authorizeHttpRequests(authorize -> authorize
                                                .requestMatchers(SecurityConfiguration.FRONT_END_ASSETS).permitAll()
                                                .requestMatchers(SecurityConfiguration.FRONT_END_ROUTES).permitAll()
                                                // Required to forward the front end routes to index.html via the
                                                // SpaErrorController.
                                                .requestMatchers("/error").permitAll()
                                                // Allow checking if app needs refreshing.
                                                .requestMatchers(BaseRestController.API_PREFIX_PATH
                                                                + GitRepoController.PROPERTIES_PATH)
                                                .permitAll()
                                                .anyRequest().authenticated())
                                .formLogin(form -> form
                                                .loginProcessingUrl(BaseRestController.API_PREFIX_PATH
                                                                + "/authentication/login")
                                                .successHandler((req, res, auth) -> res
                                                                .setStatus(HttpStatus.OK.value()))
                                                .failureHandler((req, res, auth) -> res
                                                                .setStatus(HttpStatus.UNAUTHORIZED.value())))
                                .exceptionHandling(ex -> ex
                                                .authenticationEntryPoint(
                                                                new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)));

                return httpSecurity.build();
        }

        @Bean
        public UserDetailsService userDetailsService() {
                @SuppressWarnings("deprecation")
                var userBuilder = User.withDefaultPasswordEncoder();

                var jamie = userBuilder.username("jamie").password("password").roles("USER").build();

                return new InMemoryUserDetailsManager(jamie);
        }
}
