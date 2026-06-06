package com.mahak.jobmatching.service;
import java.util.ArrayList;
import java.util.List;

public class MatchingEngine {

    public static double calculateMatchPercentage(List<String> userSkills, List<String> jobSkills) {

    if (jobSkills.isEmpty()) return 0.0;

    List<String> normalizedUser = normalize(userSkills);
    List<String> normalizedJob = normalize(jobSkills);

    int matchCount = 0;

    for (String skill : normalizedJob) {
        if (normalizedUser.contains(skill)) {
            matchCount++;
        }
    }

    return Math.round(((double) matchCount / normalizedJob.size()) * 10000.0) / 100.0;
}

    public static List<String> findMissingSkills(List<String> userSkills, List<String> jobSkills) {

    List<String> normalizedUser = normalize(userSkills);
    List<String> normalizedJob = normalize(jobSkills);

    List<String> missingSkills = new ArrayList<>();

    for (int i = 0; i < normalizedJob.size(); i++) {
        if (!normalizedUser.contains(normalizedJob.get(i))) {
            missingSkills.add(jobSkills.get(i)); // original name preserve
        }
    }

    return missingSkills;
}
    public static String getFitCategory(double matchPercentage) {

        if (matchPercentage >= 80) {
            return "Excellent Fit";
        } else if (matchPercentage >= 60) {
            return "Good Fit";
        } else {
            return "Needs Improvement";
        }
    }
    private static List<String> normalize(List<String> skills) {
        List<String> out = new ArrayList<>();
        for (String s : skills) {
            if (s != null) {
                out.add(s.trim().toLowerCase());
            }
        }
        return out;
    }
}