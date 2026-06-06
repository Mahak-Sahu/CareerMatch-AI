package com.mahak.jobmatching.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JDParserService {

    // 🔥 Skill Categories
    private static final Map<String, List<String>> SKILL_CATEGORIES =
            new HashMap<>();

    static {

        // Backend
        SKILL_CATEGORIES.put("Backend", Arrays.asList(
                "Java",
                "Spring",
                "Spring Boot",
                "Node.js",
                "Express.js",
                "Python",
                "Django",
                "Flask",
                "ASP.NET",
                ".NET Core",
                "PHP",
                "Laravel",
                "REST API",
                "Microservices",
                "Hibernate"
        ));

        // Frontend
        SKILL_CATEGORIES.put("Frontend", Arrays.asList(
                "React",
                "Angular",
                "Vue.js",
                "HTML",
                "CSS",
                "JavaScript",
                "TypeScript",
                "Tailwind CSS",
                "Bootstrap"
        ));

        // Database
        SKILL_CATEGORIES.put("Database", Arrays.asList(
                "SQL",
                "MySQL",
                "PostgreSQL",
                "MongoDB",
                "Oracle",
                "Redis",
                "Firebase"
        ));

        // DevOps & Cloud
        SKILL_CATEGORIES.put("DevOps", Arrays.asList(
                "Docker",
                "Kubernetes",
                "AWS",
                "Azure",
                "GCP",
                "Jenkins",
                "CI/CD",
                "Terraform"
        ));

        // AI/ML
        SKILL_CATEGORIES.put("AI/ML", Arrays.asList(
                "Machine Learning",
                "Deep Learning",
                "TensorFlow",
                "PyTorch",
                "OpenCV",
                "NLP",
                "LLM",
                "Generative AI"
        ));

        // Mobile
        SKILL_CATEGORIES.put("Mobile", Arrays.asList(
                "Android",
                "Flutter",
                "React Native",
                "Kotlin",
                "Swift"
        ));
    }

    // 🔥 Extract Skills
    public static List<String> extractSkills(String jobDescription) {

        List<String> foundSkills = new ArrayList<>();

        String jd = jobDescription.toLowerCase();

        for (List<String> skills : SKILL_CATEGORIES.values()) {

            for (String skill : skills) {

                if (jd.contains(skill.toLowerCase())) {

                    foundSkills.add(skill);
                }
            }
        }

        return foundSkills;
    }

    // 🔥 Detect Role
    public static String detectRole(String jd) {

        jd = jd.toLowerCase();

        if (jd.contains("backend")) {
            return "Backend Developer";
        }

        if (jd.contains("frontend")) {
            return "Frontend Developer";
        }

        if (jd.contains("full stack")) {
            return "Full Stack Developer";
        }

        if (jd.contains("devops")) {
            return "DevOps Engineer";
        }

        if (jd.contains("machine learning")
                || jd.contains("ai")) {

            return "AI/ML Engineer";
        }

        return "Software Engineer";
    }
}