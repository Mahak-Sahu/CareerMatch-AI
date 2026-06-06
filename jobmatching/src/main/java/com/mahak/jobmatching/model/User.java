package com.mahak.jobmatching.model;
import java.util.List;

public class User {

    public String name;
    public List<String> skills;

    public User(String name, List<String> skills) {
        this.name = name;
        this.skills = skills;
    }
}