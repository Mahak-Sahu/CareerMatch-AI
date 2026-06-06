package com.mahak.jobmatching.model;
import java.util.List;

public class JobMatchResult {
    public String jobTitle;
    public double matchPercentage;
    public List<String> missingSkills;

    public JobMatchResult(String jobTitle, double matchPercentage, List<String> missingSkills) {
        this.jobTitle = jobTitle;
        this.matchPercentage = matchPercentage;
        this.missingSkills = missingSkills;
    }
}
