package com.mahak.jobmatching.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ATSMatcherService {

    // 🔥 Similar Technology Mapping
private static final Map<String, List<String>>
        SIMILAR_SKILLS = new HashMap<>();

static {

    // Backend Frameworks
    SIMILAR_SKILLS.put("Spring Boot",
            Arrays.asList(
                    "ASP.NET",
                    ".NET Core",
                    "Django",
                    "Express.js",
                    "Flask"
            ));

    // Frontend
    SIMILAR_SKILLS.put("React",
            Arrays.asList(
                    "Angular",
                    "Vue.js"
            ));

    // Databases
    SIMILAR_SKILLS.put("MySQL",
            Arrays.asList(
                    "PostgreSQL",
                    "MongoDB",
                    "Oracle",
                    "SQL"
            ));

    // Cloud
    SIMILAR_SKILLS.put("AWS",
            Arrays.asList(
                    "Azure",
                    "GCP"
            ));

    // DevOps
    SIMILAR_SKILLS.put("Docker",
            Arrays.asList(
                    "Kubernetes"
            ));
}

    // ✅ Matching Skills
    public static List<String> getMatchingSkills(
            List<String> resumeSkills,
            List<String> jdSkills) {

        List<String> matches = new ArrayList<>();

        for (String jdSkill : jdSkills) {

            for (String resumeSkill : resumeSkills) {

                if (resumeSkill.equalsIgnoreCase(jdSkill)) {

                    matches.add(jdSkill);
                }
            }
        }

        return matches;
    }

    // ✅ Similar Skill Match
public static List<String> getSimilarMatches(
        List<String> resumeSkills,
        List<String> jdSkills) {

    List<String> similarMatches =
            new ArrayList<>();

    for (String jdSkill : jdSkills) {

        if (SIMILAR_SKILLS.containsKey(jdSkill)) {

            List<String> similarSkills =
                    SIMILAR_SKILLS.get(jdSkill);

            for (String resumeSkill :
                    resumeSkills) {

                for (String similar :
                        similarSkills) {

                    if (resumeSkill.equalsIgnoreCase(similar)) {

                        similarMatches.add(
                                resumeSkill +
                                " ≈ " +
                                jdSkill
                        );
                    }
                }
            }
        }
    }

    return similarMatches;
}

    // ✅ Missing Skills
    public static List<String> getMissingSkills(
            List<String> resumeSkills,
            List<String> jdSkills) {

        List<String> missing = new ArrayList<>();

        for (String jdSkill : jdSkills) {

            boolean found = false;

            for (String resumeSkill : resumeSkills) {

                if (resumeSkill.equalsIgnoreCase(jdSkill)) {

                    found = true;
                    break;
                }
            }

            if (!found) {

                missing.add(jdSkill);
            }
        }

        return missing;
    }

    // ✅ ATS Match Score
    public static int calculateATSScore(

        List<String> matchingSkills,

        List<String> similarMatches,

        List<String> jdSkills) {

    if (jdSkills.isEmpty()) {
        return 0;
    }

    double exactWeight = 1.0;

    double similarWeight = 0.7;

    double totalScore =

            (matchingSkills.size() * exactWeight)

            +

            (similarMatches.size() * similarWeight);

    double finalScore =

            (totalScore / jdSkills.size()) * 100;

    return (int) finalScore;
}
}