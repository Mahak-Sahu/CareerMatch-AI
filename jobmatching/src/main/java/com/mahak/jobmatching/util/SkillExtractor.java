package com.mahak.jobmatching.util;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class SkillExtractor {

    static List<String> knownSkills = Arrays.asList(

    // Languages
    "Java",
    "Python",
    "JavaScript",
    "SQL",

    // Frontend
    "HTML",
    "CSS",
    "React",
    "Angular",

    // Backend
    "Spring",
    "Spring Boot",
    "Node.js",
    "Flask",
    "Django",
    "API",

    // Database
    "MySQL",
    "MongoDB",

    // Cloud & DevOps
    "AWS",
    "Docker",
    "Kubernetes",
    "Linux",

    // Tools
    "Git",
    "GitHub",

    // AI/ML
    "Machine Learning",
    "OpenCV",

    // Concepts
    "DSA",
    "Data Structures",
    "Algorithms",
    "OOP"
);

    public static List<String> extractSkills(String resumeText) {

        List<String> extractedSkills = new ArrayList<>();

        for (String skill : knownSkills) {
            if (resumeText.toLowerCase().contains(skill.toLowerCase())) {
                extractedSkills.add(skill);
            }
        }

        return extractedSkills;
    }
}