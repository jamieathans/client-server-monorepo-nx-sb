package com.example.demo.service;

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

        return new EntityUserDetails(userEntity.get());
    }
}
