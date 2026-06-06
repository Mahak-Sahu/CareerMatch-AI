package com.mahak.jobmatching.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mahak.jobmatching.model.AppUser;

public interface UserRepository extends JpaRepository<AppUser, Long> {

    AppUser findByEmail(String email);
}