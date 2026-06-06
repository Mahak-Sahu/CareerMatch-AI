package com.mahak.jobmatching.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mahak.jobmatching.model.ResumeHistory;

public interface ResumeHistoryRepository extends JpaRepository<ResumeHistory, Long> {
        List<ResumeHistory> findByUserEmailOrderByCreatedAtDesc(String userEmail);
}