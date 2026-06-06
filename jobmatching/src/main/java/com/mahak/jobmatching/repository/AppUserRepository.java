package com.mahak.jobmatching.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mahak.jobmatching.model.AppUser;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
}