package com.mahak.jobmatching.controller;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mahak.jobmatching.dto.AtsBreakdown;
import com.mahak.jobmatching.dto.SkillRoadmap;
import com.mahak.jobmatching.model.ApiResponse;
import com.mahak.jobmatching.model.Job;
import com.mahak.jobmatching.model.JobMatchResult;
import com.mahak.jobmatching.model.ResumeHistory;
import com.mahak.jobmatching.model.ResumeRequest;
import com.mahak.jobmatching.repository.ResumeHistoryRepository;
import com.mahak.jobmatching.service.AISuggester;
import com.mahak.jobmatching.service.ATSMatcherService;
import com.mahak.jobmatching.service.ATSScorer;
import com.mahak.jobmatching.service.GeminiService;
import com.mahak.jobmatching.service.JDParserService;
import com.mahak.jobmatching.service.MatchingEngine;
import com.mahak.jobmatching.service.ResumeScorer;
import com.mahak.jobmatching.service.RoadmapService;
import com.mahak.jobmatching.service.SimilarSkillService;
import com.mahak.jobmatching.util.PdfReaderUtil;
import com.mahak.jobmatching.util.SkillExtractor;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // 🔥 IMPORTANT FIX

public class JobController {
    @Autowired
private GeminiService geminiService;
    private final ResumeHistoryRepository resumeHistoryRepository;

    public JobController(ResumeHistoryRepository resumeHistoryRepository) {

    this.resumeHistoryRepository = resumeHistoryRepository;
}
    @Autowired
    private AISuggester aiSuggester;
    private final MatchingEngine matchingEngine = new MatchingEngine();
    private final ResumeScorer resumeScorer = new ResumeScorer();
    private final ATSScorer atsScorer = new ATSScorer();

    // ✅ TEST API
    @GetMapping("/jobs")
    public List<JobMatchResult> getJobs() {

        List<String> userSkills = Arrays.asList("Java", "DSA", "SQL", "React");
        List<Job> jobs = getJobList();

        return getMatchResults(userSkills, jobs);
    }

    // ✅ REAL API
    @PostMapping("/analyze")
    public ApiResponse analyzeResume(@RequestBody ResumeRequest request) {

        // 1. Resume text
        String resumeText = request.getResumeText();
        String jobDescription =
            request.getJobDescription();

        List<String> jdSkills =
            JDParserService.extractSkills(jobDescription);

        String detectedRole =
            JDParserService.detectRole(jobDescription);

       // 2. Extract skills
        List<String> userSkills = SkillExtractor.extractSkills(resumeText);

        System.out.println("JD Skills List = " + jdSkills);
System.out.println("User Skills List = " + userSkills);


        // 3. Jobs list
        List<Job> jobs = getJobList();

        // 4. Matching
        List<JobMatchResult> results = getMatchResults(userSkills, jobs);

        List<String> matchingSkills =
        ATSMatcherService.getMatchingSkills(
                userSkills,
                jdSkills);


        List<String> missingSkills =
        ATSMatcherService.getMissingSkills(
                userSkills,
                jdSkills);
        
        List<String> similarMatches =
        SimilarSkillService.findSimilarSkills(
                missingSkills,
                resumeText
        );

        missingSkills.removeIf(skill ->
        similarMatches.stream()
                .anyMatch(similar -> similar.contains(skill))
        );

        
        List<SkillRoadmap> roadmap =
        RoadmapService.generateRoadmap(
                missingSkills
        );
        System.out.println(
    "Roadmap = " + roadmap
);

        List<String> improvementPlan = new ArrayList<>();

for(String skill : missingSkills){

    switch(skill.toLowerCase()){

        case "docker":
            improvementPlan.add(
                "Add a Dockerized project (+8 ATS)"
            );
            break;

        case "aws":
            improvementPlan.add(
                "Learn AWS EC2/S3 basics (+10 ATS)"
            );
            break;

        case "spring boot":
            improvementPlan.add(
                "Build a Spring Boot REST API project (+12 ATS)"
            );
            break;

        default:
            improvementPlan.add(
                "Add " + skill + " to your skillset"
            );
    }
}

        int jdScore =
(int)(((matchingSkills.size() * 1.0)
+
(similarMatches.size() * 0.7))
/
Math.max(jdSkills.size(), 1)
* 50);
int projectScore = 0;

if (resumeText.toLowerCase().contains("project")) {
    projectScore = 10;
}
int educationScore = 0;

if (resumeText.toLowerCase().contains("b.tech")
    ||
    resumeText.toLowerCase().contains("computer science")) {

    educationScore = 10;
}
int githubScore = 0;

if (resumeText.toLowerCase().contains("github")) {
    githubScore = 5;
}
int linkedinScore = 0;

if (resumeText.toLowerCase().contains("linkedin")) {
    linkedinScore = 5;
}
int certificationScore = 0;

if (resumeText.toLowerCase().contains("certification")
        ||
    resumeText.toLowerCase().contains("certifications")) {

    certificationScore = 5;
}
int qualityScore = 0;

if (resumeText.length() > 1500) {
    qualityScore = 15;
}
else if (resumeText.length() > 1000) {
    qualityScore = 10;
}
else {
    qualityScore = 5;
}
int atsMatchScore =

        jdScore +
        projectScore +
        educationScore +
        githubScore +
        linkedinScore +
        certificationScore +
        qualityScore;

if (atsMatchScore > 100) {
    atsMatchScore = 100;
}

        System.out.println("================================");
System.out.println("Matching Skills = " + matchingSkills.size());
System.out.println("Similar Matches = " + similarMatches.size());
System.out.println("JD Skills = " + jdSkills.size());
// System.out.println("ATS Match Score = " + atsMatchScore);
System.out.println("================================");

        AtsBreakdown breakdown = new AtsBreakdown();

breakdown.setMatching(jdScore);

breakdown.setSimilar(projectScore);

breakdown.setKeyword(
        githubScore
        +
        linkedinScore
);

breakdown.setQuality(
        qualityScore
        +
        educationScore
        +
        certificationScore
);

breakdown.setMissing(
        -missingSkills.size()
);

        

        // 5. Score
        double score = ResumeScorer.calculateOverallScore(results);
        int atsScore = atsScorer.calculateATSScore(resumeText);

        // 6. Prompt (dynamic better)
        String prompt = """
You are CareerMatch AI, an expert ATS recruiter, career coach, and hiring manager.

Analyze the candidate profile and job match.

Candidate Skills:
""" + userSkills + """

Top Matched Job:
""" + results.get(0).jobTitle + """

Missing Skills:
""" + results.get(0).missingSkills + """

Overall Resume Score:
""" + score + """

TASK:
Return ONLY valid JSON.

IMPORTANT RULES:
- Return ONLY JSON
- No markdown
- No explanations
- No code blocks
- No extra text before or after JSON
- Keep recommendations concise and actionable
- Use ATS and recruiter perspective
- Strengths: max 4 items
- Learn Next: max 4 items
- Resume Tips: max 4 items
- Recruiter Insight: 1-2 lines
- Project Idea: practical project aligned with target role

JSON FORMAT:

{
  "careerSummary": "",
  
  "recommendedCareerPath": "",
  
  "resumeImprovementTips": [
    "",
    "",
    ""
  ],
  
  "strengths": [
    "",
    "",
    ""
  ],
  
  "learnNext": [
    "",
    "",
    ""
  ],
  
  "recommendedProject": "",
  
  "recruiterInsight": "",
  
  "bestRole": "",
  
  "proTip": ""
}

GUIDELINES:

careerSummary:
- 2 short recruiter-style sentences

recommendedCareerPath:
- Best career path based on resume and job match

resumeImprovementTips:
- Missing skills
- ATS improvements
- Resume optimization suggestions

strengths:
- Candidate's strongest areas

learnNext:
- Most important next skills

recommendedProject:
- Portfolio-worthy project for target role

recruiterInsight:
- What a recruiter would think after reading this resume

bestRole:
- Most suitable role

proTip:
- One powerful career growth tip

Return ONLY valid JSON.
""";
        // 7. AI call
        String aiSuggestion = geminiService.getCareerSuggestion(prompt);
        String resumeTips = aiSuggester.generateResumeTips(resumeText);

        // 8. Response
        ApiResponse response =
        new ApiResponse(results, aiSuggestion, resumeTips);
        response.setBreakdown(breakdown);
        response.setAtsScore(atsMatchScore);
        response.setMatchingSkills(matchingSkills);
        response.setMissingSkills(missingSkills);
        response.setSimilarMatches(similarMatches);
        response.setBreakdown(breakdown);
        response.setImprovementPlan(improvementPlan);
        response.setRoadmap(roadmap);


        return response;
    }
    @PostMapping("/upload")
public ResponseEntity<?> uploadResume(
        @RequestParam("file") MultipartFile file,
        @RequestParam("jobDescription") String jobDescription,
        @RequestParam("email") String email) {

    try {

        File convFile = new File(
                System.getProperty("java.io.tmpdir")
                + "/" + file.getOriginalFilename());

        file.transferTo(convFile);

        String resumeText =
                PdfReaderUtil.extractText(convFile);

        ResumeRequest request = new ResumeRequest();
        request.setResumeText(resumeText);
        request.setJobDescription(jobDescription);
        ApiResponse response = analyzeResume(request);
        String aiSuggestion = response.getAiSuggestion();
        ResumeHistory history = new ResumeHistory();
        history.setUserEmail(email);
        history.setAtsScore(response.getAtsScore());
        history.setAiSuggestion(aiSuggestion);
        history.setResumeText(resumeText);
        history.setJobDescription(jobDescription);
        history.setCreatedAt(LocalDateTime.now());
        resumeHistoryRepository.save(history);
        return ResponseEntity.ok(response);
    } catch (Exception e) {

        e.printStackTrace();

        return ResponseEntity
                .badRequest()
                .body("Error uploading PDF");
    }
}

    // 🔥 Jobs
    private List<Job> getJobList() {

        return Arrays.asList(
                new Job("Java Developer", Arrays.asList("Java", "SQL", "Spring Boot")),
                new Job("Frontend Developer", Arrays.asList("React", "JavaScript", "CSS")),
                new Job("Full Stack Developer", Arrays.asList("Java", "React", "Node.js")),
                new Job("Backend Developer", Arrays.asList("Java", "SQL", "Spring Boot", "API")),
                new Job("Software Engineer", Arrays.asList("Java", "DSA", "SQL", "Git"))
        );
    }

    // 🔥 Matching logic
    private List<JobMatchResult> getMatchResults(List<String> userSkills, List<Job> jobs) {

        List<JobMatchResult> results = new ArrayList<>();

        for (Job job : jobs) {

            double match = MatchingEngine.calculateMatchPercentage(userSkills, job.requiredSkills);

            List<String> missing = MatchingEngine.findMissingSkills(userSkills, job.requiredSkills);

            results.add(new JobMatchResult(job.title, match, missing));
        }

        results.sort((a, b) -> Double.compare(b.matchPercentage, a.matchPercentage));

        return results;
    }
}