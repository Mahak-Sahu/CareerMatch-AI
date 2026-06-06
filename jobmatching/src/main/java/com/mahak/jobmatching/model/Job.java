package com.mahak.jobmatching.model;

import java.util.List;

public class Job {

    public String title;
    public List<String> requiredSkills;

    public Job(String title, List<String> requiredSkills) {
        this.title = title;
        this.requiredSkills = requiredSkills;
    }
}