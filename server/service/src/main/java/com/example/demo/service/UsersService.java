package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.data.entity.UserEntity;
import com.example.demo.data.repository.UserRepository;
import com.example.demo.dto.UserDto;

@Service
public class UsersService extends BaseService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UsersService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

    private static Optional<UserDto> mapOptional(Optional<UserEntity> optionalUserEntity) {

        if (optionalUserEntity.isEmpty()) {
            return Optional.empty();
        }

        var userDto = map(optionalUserEntity.get());

        return Optional.of(userDto);
    }

    public Optional<UserDto> getUserByUsername(String username) {

        var userEntity = userRepository.findByUsername(username);

        return mapOptional(userEntity);
    }

    public List<UserDto> getAllUsers() {

        var allUsers = userRepository.findAll();

        return allUsers.stream().map(UsersService::map).toList();
    }

    public Optional<UserDto> getUserById(UUID id) {

        var userEntity = userRepository.findById(id);

        return mapOptional(userEntity);
    }

    public boolean checkUsernameAvailability(UUID userId, String username) {

        var userIdEntity = userRepository.findById(userId).get();

        if (userIdEntity.getUsername().contentEquals(username)) {
            // The username is the currently set one for the user.
            return true;
        }

        var usernameEntityOptional = userRepository.findByUsername(username);

        // User not found for this username, so it is available.
        return usernameEntityOptional.isEmpty();
    }

    public void updateUser(UserDto userDto) {

        var userEntity = userRepository.findById(UUID.fromString(userDto.id())).get();

        userEntity.setUsername(userDto.username());
        userEntity.setFirstName(userDto.firstName());
        userEntity.setSurname(userDto.surname());
        userEntity.setEmail(userDto.email());

        if (userDto.password() != null) {
            userEntity.setPassword(passwordEncoder.encode(userDto.password()));
        }
    }
}
