package com.example.demo.service;

import java.util.HashSet;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.data.entity.Role;
import com.example.demo.data.entity.RoleEntity;
import com.example.demo.data.entity.UserEntity;
import com.example.demo.data.repository.RoleRepository;
import com.example.demo.data.repository.UserRepository;

@Service
public class StaticDataInitialisationService extends BaseService {

    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    public StaticDataInitialisationService(
            PasswordEncoder passwordEncoder,
            RoleRepository roleRepository,
            UserRepository userRepository) {

        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    private void initRolesAndAdminUser() {

        var roleAdmin = roleRepository.findByName(Role.ADMIN);
        if (roleAdmin == null) {
            roleAdmin = new RoleEntity();
            roleAdmin.setName(Role.ADMIN);
            roleAdmin = roleRepository.save(roleAdmin);
        }

        var roleUser = roleRepository.findByName(Role.USER);
        if (roleUser == null) {
            roleUser = new RoleEntity();
            roleUser.setName(Role.USER);
            roleUser = roleRepository.save(roleUser);
        }

        var adminUser = userRepository.findByUsername("admin");
        if (adminUser.isEmpty()) {
            var adminEntity = new UserEntity();

            adminEntity.setUsername("admin");
            adminEntity.setPassword(passwordEncoder.encode("password"));

            var roles = new HashSet<RoleEntity>();
            roles.add(roleAdmin);
            roles.add(roleUser);
            adminEntity.setRoles(roles);

            userRepository.save(adminEntity);
        }
    }

    public void initialise() {
        initRolesAndAdminUser();
    }
}
