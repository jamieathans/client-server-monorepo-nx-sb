package com.example.demo.data.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.data.entity.Role;
import com.example.demo.data.entity.RoleEntity;

public interface RoleRepository extends JpaRepository<RoleEntity, UUID> {
    RoleEntity findByName(Role name);
}
