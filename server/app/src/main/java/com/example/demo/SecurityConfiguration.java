package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

import com.example.demo.api.BaseRestController;
import com.example.demo.api.GitRepoController;

@Configuration
@EnableWebSecurity
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
                        "/admin/**",
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
                                .logout(logout -> logout
                                                .logoutUrl(BaseRestController.API_PREFIX_PATH
                                                                + "/authentication/logout")
                                                // Prevent redirection; return 200 OK instead
                                                .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(
                                                                HttpStatus.OK)))
                                .exceptionHandling(ex -> ex
                                                .authenticationEntryPoint(
                                                                new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)));

                return httpSecurity.build();
        }

        /*
        @Bean
        public UserDetailsService userDetailsService() {
                @SuppressWarnings("deprecation")
                var userBuilder = User.withDefaultPasswordEncoder();

                var jamie = userBuilder.username("jamie").password("password").roles("USER").build();

                return new InMemoryUserDetailsManager(jamie);
        }
        */

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }
}
