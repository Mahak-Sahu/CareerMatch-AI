package com.mahak.jobmatching.controller;

import com.mahak.jobmatching.model.ResumeHistory;
import com.mahak.jobmatching.repository.ResumeHistoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "*")
public class HistoryController {

    @Autowired
    private ResumeHistoryRepository resumeHistoryRepository;

    @GetMapping("/{email}")
    public List<ResumeHistory> getUserHistory(
            @PathVariable String email) {

        return resumeHistoryRepository
                .findByUserEmailOrderByCreatedAtDesc(email);
    }
}