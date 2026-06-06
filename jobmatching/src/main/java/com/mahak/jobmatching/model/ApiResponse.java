package com.mahak.jobmatching.model;

import java.util.List;

import com.mahak.jobmatching.dto.AtsBreakdown;
import com.mahak.jobmatching.dto.SkillRoadmap;

public class ApiResponse {
    public List<JobMatchResult> jobs;
    public String aiSuggestion;
    private int atsScore;
    public String resumeTips;
    public List<String> matchingSkills;
    public List<String> missingSkills;
    public List<String> similarMatches;
    private AtsBreakdown breakdown;
    private List<String> improvementPlan;
    private List<SkillRoadmap> roadmap;

public List<String> getImprovementPlan() {
    return improvementPlan;
}

public void setImprovementPlan(
        List<String> improvementPlan) {
    this.improvementPlan = improvementPlan;
}

    public ApiResponse(List<JobMatchResult> jobs,
                   String aiSuggestion,
                   String resumeTips) {

    this.jobs = jobs;
    this.aiSuggestion = aiSuggestion;   
    this.resumeTips = resumeTips;
}

    public int getAtsScore() {
        return atsScore;
    }

    public void setAtsScore(int atsScore) {
        this.atsScore = atsScore;
    }
    public String getAiSuggestion() {
    return aiSuggestion;
}
public List<String> getMatchingSkills() {
    return matchingSkills;
}

public void setMatchingSkills(
        List<String> matchingSkills) {

    this.matchingSkills = matchingSkills;
}

public List<String> getMissingSkills() {
    return missingSkills;
}

public void setMissingSkills(
        List<String> missingSkills) {

    this.missingSkills = missingSkills;
}

public List<String> getSimilarMatches() {
    return similarMatches;
}

public void setSimilarMatches(
        List<String> similarMatches) {

    this.similarMatches = similarMatches;
}

    public AtsBreakdown getBreakdown() {
        return breakdown;
    }

    public void setBreakdown(AtsBreakdown breakdown) {
        this.breakdown = breakdown;
    }
    public List<SkillRoadmap> getRoadmap() {
    return roadmap;
}

public void setRoadmap(
        List<SkillRoadmap> roadmap) {
    this.roadmap = roadmap;
}
}