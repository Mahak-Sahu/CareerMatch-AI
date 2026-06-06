package com.mahak.jobmatching.dto;

public class SkillRoadmap {

    private String skill;
    private String difficulty;
    private String timeRequired;
    private int atsImpact;

    public SkillRoadmap() {
    }

    public SkillRoadmap(
            String skill,
            String difficulty,
            String timeRequired,
            int atsImpact) {

        this.skill = skill;
        this.difficulty = difficulty;
        this.timeRequired = timeRequired;
        this.atsImpact = atsImpact;
    }

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getTimeRequired() {
        return timeRequired;
    }

    public void setTimeRequired(String timeRequired) {
        this.timeRequired = timeRequired;
    }

    public int getAtsImpact() {
        return atsImpact;
    }

    public void setAtsImpact(int atsImpact) {
        this.atsImpact = atsImpact;
    }
}   