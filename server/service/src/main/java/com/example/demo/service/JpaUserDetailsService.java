package com.example.demo.service;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.data.repository.UserRepository;

@Service
public class JpaUserDetailsService extends BaseService implements UserDetailsService {

    private final UserRepository userRepository;

    public JpaUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var userEntity = userRepository.findByUsername(username);

        if (userEntity.isEmpty()) {
            throw new UsernameNotFoundException("%s not found".formatted(username));
        }

        var usename = userEntity.get().getUsername();
        var password = userEntity.get().getPassword();
        var authorities = userEntity.get().getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name())).toList();

        return new UserDetails() {

            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return authorities;
            }

            @Override
            public String getPassword() {
                return password;
            }

            @Override
            public String getUsername() {
                return usename;
            }
        };
    }
}
