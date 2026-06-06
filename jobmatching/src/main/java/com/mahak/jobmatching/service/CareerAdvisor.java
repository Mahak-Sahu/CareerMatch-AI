package com.mahak.jobmatching.service;
import java.util.ArrayList;
import java.util.List;

public class CareerAdvisor {

    public static List<String> generateRoadmap(List<String> missingSkills) {

        List<String> roadmap = new ArrayList<>();

        for (String skill : missingSkills) {

            roadmap.add("Learn " + skill);

            if (skill.equalsIgnoreCase("Spring Boot")) {
                roadmap.add("Build Java backend projects");
            }

            if (skill.equalsIgnoreCase("Node.js")) {
                roadmap.add("Practice backend development with Node.js");
            }

            if (skill.equalsIgnoreCase("SQL")) {
                roadmap.add("Practice database queries and schema design");
            }

            if (skill.equalsIgnoreCase("JavaScript")) {
                roadmap.add("Strengthen frontend logic and ES6 concepts");
            }
        }

        return roadmap;
    }
}