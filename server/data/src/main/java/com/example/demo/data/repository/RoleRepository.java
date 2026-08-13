package com.example.demo.data.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.data.entity.RoleEntity;
import com.example.demo.dto.Role;

public interface RoleRepository extends JpaRepository<RoleEntity, UUID> {
    RoleEntity findByName(Role name);
}
