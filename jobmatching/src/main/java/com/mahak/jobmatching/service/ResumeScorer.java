package com.mahak.jobmatching.service;
import java.util.List;

import com.mahak.jobmatching.model.JobMatchResult;

public class ResumeScorer {

    public static double calculateOverallScore(List<JobMatchResult> results) {

        double total = 0;

        for (JobMatchResult result : results) {
            total += result.matchPercentage;
        }

        return total / results.size();
    }

    public static String getScoreCategory(double score) {

        if (score >= 80) {
            return "Strong Profile";
        } else if (score >= 60) {
            return "Moderate Profile";
        } else {
            return "Needs Significant Improvement";
        }
    }
}