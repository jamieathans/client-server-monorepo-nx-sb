package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.FactorGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.data.entity.UserEntity;
import com.example.demo.data.repository.RoleRepository;
import com.example.demo.data.repository.UserRepository;
import com.example.demo.dto.UserDto;

@Service
public class UsersService extends BaseService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UsersService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
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

        var allUsers = userRepository.findAllByOrderByUsernameAsc();

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

    public void updateUser(UserDto userDto, UserDetails loggedInUserDetails) {

        var userEntity = userRepository.findById(UUID.fromString(userDto.id())).get();

        var isEditingTheLoggedInUser = userEntity.getUsername().equalsIgnoreCase(loggedInUserDetails.getUsername());

        userEntity.setUsername(userDto.username());
        userEntity.setFirstName(userDto.firstName());
        userEntity.setSurname(userDto.surname());
        userEntity.setEmail(userDto.email());

        if (userDto.password() != null) {
            userEntity.setPassword(passwordEncoder.encode(userDto.password()));
        }

        userEntity.getRoles().clear();

        for (var role : userDto.roles()) {

            var roleEntity = roleRepository.findByName(role);

            userEntity.getRoles().add(roleEntity);
        }

        if (isEditingTheLoggedInUser) {
            updateAuthentication(userEntity);
        }
    }

    private static void updateAuthentication(UserEntity userEntity) {

        var currentAuthentication = SecurityContextHolder.getContext().getAuthentication();

        var factorGrantedAuthorityOptional = currentAuthentication.getAuthorities().stream()
                .filter(ga -> ga instanceof FactorGrantedAuthority).findFirst();

        var newPrincipal = new EntityUserDetails(userEntity);

        var newAuthorities = new ArrayList<GrantedAuthority>(newPrincipal.getAuthorities());

        if (factorGrantedAuthorityOptional.isPresent()) {
            newAuthorities.add(factorGrantedAuthorityOptional.get());
        }

        var newAuthentication = UsernamePasswordAuthenticationToken.authenticated(
                newPrincipal,
                currentAuthentication.getCredentials(),
                newAuthorities);

        newAuthentication.setDetails(currentAuthentication.getDetails());

        SecurityContextHolder.getContext().setAuthentication(newAuthentication);
    }
}
