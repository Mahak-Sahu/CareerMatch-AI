package com.mahak.jobmatching.service;
import org.springframework.stereotype.Service;
@Service
public class AISuggester {

    public static String generateSuggestion(double score) {

        if (score >= 80) {
            return "You are highly job-ready. Focus on advanced specialization and leadership skills.";
        } 
        else if (score >= 60) {
            return "You have a solid foundation. Strengthen missing technical skills to improve competitiveness.";
        } 
        else {
            return "Your profile needs significant improvement. Focus on core technical skills, stronger projects, and practical experience.";
        }
    }
    public String generateResumeTips(String resumeText) {

    StringBuilder tips = new StringBuilder();

    if (!resumeText.toLowerCase().contains("spring")) {
        tips.append("✅ Add Spring Boot projects\n");
    }

    if (!resumeText.toLowerCase().contains("github")) {
        tips.append("✅ Add GitHub profile link\n");
    }

    if (!resumeText.toLowerCase().contains("sql")) {
        tips.append("✅ Add SQL/database skills\n");
    }

    if (!resumeText.toLowerCase().contains("internship")) {
        tips.append("✅ Mention internships or experience\n");
    }

    return tips.toString();
}
}