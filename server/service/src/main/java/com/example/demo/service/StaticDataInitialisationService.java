package com.example.demo.service;

import java.util.HashSet;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.data.entity.Role;
import com.example.demo.data.entity.RoleEntity;
import com.example.demo.data.entity.UserEntity;
import com.example.demo.data.repository.RoleRepository;
import com.example.demo.data.repository.UserRepository;

@Service
@Transactional
public class StaticDataInitialisationService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    public StaticDataInitialisationService(RoleRepository roleRepository, UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    private void initRolesAndAdminUser() {

        var roleAdmin = roleRepository.findByName(Role.ADMIN);
        if (roleAdmin == null) {
            roleAdmin = new RoleEntity();
            roleAdmin.setName(Role.ADMIN);
            roleRepository.save(roleAdmin);
        }

        var roleUser = roleRepository.findByName(Role.USER);
        if (roleUser == null) {
            roleUser = new RoleEntity();
            roleUser.setName(Role.USER);
            roleRepository.save(roleUser);
        }

        var adminUser = userRepository.findByUsername("admin");
        if (adminUser.isEmpty()) {
            var adminEntity = new UserEntity();

            adminEntity.setUsername("admin");
            var secureHash = new BCryptPasswordEncoder().encode("password");
            adminEntity.setPassword(secureHash);

            var roles = new HashSet<RoleEntity>();

            roleAdmin = roleRepository.findByName(Role.ADMIN);
            roles.add(roleAdmin);

            roleUser = roleRepository.findByName(Role.USER);
            roles.add(roleUser);

            adminEntity.setRoles(roles);

            userRepository.save(adminEntity);
        }
    }

    public void initialise() {
        initRolesAndAdminUser();
    }
}
