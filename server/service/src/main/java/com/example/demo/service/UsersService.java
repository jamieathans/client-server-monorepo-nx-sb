package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.data.entity.UserEntity;
import com.example.demo.data.repository.UserRepository;
import com.example.demo.dto.UserDto;

@Service
public class UsersService extends BaseService {

    private final UserRepository userRepository;

    public UsersService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private static UserDto map(UserEntity userEntity) {

        var roles = userEntity.getRoles().stream().map(r -> r.getName()).toList();

        var userDto = new UserDto(
                userEntity.getId().toString(),
                roles,
                userEntity.getUsername(),
                userEntity.getFirstName(),
                userEntity.getSurname(),
                userEntity.getEmail());

        return userDto;
    }

    public Optional<UserDto> getUserByUsername(String username) {
        var userEntity = userRepository.findByUsername(username);

        if (userEntity.isEmpty()) {
            return Optional.empty();
        }

        var userDto = map(userEntity.get());

        return Optional.of(userDto);
    }

    public List<UserDto> getAllUsers() {
        var allUsers = userRepository.findAll();

        return allUsers.stream().map(UsersService::map).toList();
    }
}
