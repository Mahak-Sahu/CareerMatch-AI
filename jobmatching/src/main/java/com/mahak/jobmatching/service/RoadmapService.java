package com.mahak.jobmatching.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.mahak.jobmatching.dto.SkillRoadmap;

public class RoadmapService {

    private static final Map<String, SkillRoadmap> ROADMAPS =
            new HashMap<>();

    static {

        ROADMAPS.put(
                "Docker",
                new SkillRoadmap(
                        "Docker",
                        "Easy",
                        "3 Days",
                        8
                )
        );

        ROADMAPS.put(
                "AWS",
                new SkillRoadmap(
                        "AWS",
                        "Medium",
                        "1 Week",
                        10
                )
        );

        ROADMAPS.put(
                "Spring Boot",
                new SkillRoadmap(
                        "Spring Boot",
                        "Medium",
                        "1 Week",
                        12
                )
        );
        
    }

    public static List<SkillRoadmap> generateRoadmap(List<String> missingSkills) {

    List<SkillRoadmap> result = new ArrayList<>();

    for (String skill : missingSkills) {

        if (ROADMAPS.containsKey(skill)) {

            result.add(
                ROADMAPS.get(skill)
            );

        } else {

            result.add(
                new SkillRoadmap(
                    skill,
                    "Medium",
                    "1 Week",
                    5
                )
            );

        }
    }

    return result;
}
}