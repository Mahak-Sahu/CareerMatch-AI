package com.mahak.jobmatching.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SimilarSkillService {

    private static final Map<String, List<String>> SIMILAR_SKILLS = new HashMap<>();

    static {

        // Backend Frameworks
        SIMILAR_SKILLS.put("Spring Boot",
                Arrays.asList("Spring", "Node.js", "Express.js", "Django", "Flask", "ASP.NET"));

        // Databases
        SIMILAR_SKILLS.put("PostgreSQL",
                Arrays.asList("MySQL", "MongoDB", "SQL Server"));

        SIMILAR_SKILLS.put("MySQL",
                Arrays.asList("PostgreSQL", "MariaDB"));

        // Cloud
        SIMILAR_SKILLS.put("AWS",
                Arrays.asList("Azure", "GCP"));

        // Frontend
        SIMILAR_SKILLS.put("React",
                Arrays.asList("Angular", "Vue.js"));

        // Containers
        SIMILAR_SKILLS.put("Docker",
                Arrays.asList("Kubernetes"));

    }

    public static List<String> findSimilarSkills(
            List<String> missingSkills,
            String resumeText
    ) {

        List<String> similarMatches = new ArrayList<>();

        String lowerResume = resumeText.toLowerCase();

        for (String missing : missingSkills) {

            if (SIMILAR_SKILLS.containsKey(missing)) {

                List<String> equivalents =
                        SIMILAR_SKILLS.get(missing);

                for (String equivalent : equivalents) {

                    if (lowerResume.contains(equivalent.toLowerCase())) {

                        similarMatches.add(
                                missing + " → Similar Experience with " + equivalent
                        );

                        break;
                    }
                }
            }
        }

        return similarMatches;
    }
}