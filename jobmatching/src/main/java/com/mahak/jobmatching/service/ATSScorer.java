package com.mahak.jobmatching.service;

public class ATSScorer {

    public int calculateATSScore(String resumeText) {

        int score = 0;

        String text = resumeText.toLowerCase();

        // Skills
        if (text.contains("java")) score += 10;
        if (text.contains("sql")) score += 10;
        if (text.contains("spring")) score += 5;

        // Projects
        if (text.contains("project")) score += 15;

        // Experience
        if (text.contains("intern")) score += 10;
        if (text.contains("experience")) score += 10;

        // Education
        if (text.contains("b.tech")) score += 10;
        if (text.contains("computer science")) score += 5;

        // Resume Quality
        if (resumeText.length() > 300) score += 15;

        // Max 100
        if (score > 100) {
            score = 100;
        }

        return score;
    }
}