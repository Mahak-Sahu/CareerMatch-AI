package com.mahak.jobmatching.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Service
public class GeminiService {
    @Value("${gemini.api.key}")
private String apiKey;
    

    public  String getCareerSuggestion(String prompt) {

        try {

            String apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

            URL url = new URL(apiUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            // SIMPLE SAFE JSON
            

Gson gson = new Gson();
Map<String, Object> body = Map.of(
    "contents",
    List.of(
        Map.of(
            "parts",
            List.of(
                Map.of(
                    "text",
                    prompt
                )
            )
        )
    )
);
String jsonInput = gson.toJson(body);

            OutputStream os = conn.getOutputStream();
            os.write(jsonInput.getBytes());
            os.flush();
            os.close();

            int responseCode = conn.getResponseCode();

            BufferedReader reader;

            if (responseCode == 200) {
                reader = new BufferedReader(
                        new InputStreamReader(conn.getInputStream())
                );
            } else {
                reader = new BufferedReader(
                        new InputStreamReader(conn.getErrorStream())
                );
            }

            StringBuilder response = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                response.append(line);
            }

            reader.close();

            // DEBUG PRINT
            System.out.println("RAW AI RESPONSE: " + response);
            System.out.println("PROMPT ======");
System.out.println(prompt);

System.out.println("JSON INPUT ======");
System.out.println(jsonInput);

           if (responseCode != 200) {
    System.out.println("AI ERROR RESPONSE:");
    System.out.println(response);
    // जब API त्रुटि हो तो यह फालबैक JSON लौटाएं:
    return """
    {
      "careerSummary":"AI service temporarily unavailable",
      "recommendedCareerPath":"Software Engineer",
      "resumeImprovementTips":["Try again after a few minutes"],
      "strengths":["Resume analyzed successfully"],
      "learnNext":["Spring Boot","REST APIs"],
      "recommendedProject":"Build a Job Portal",
      "recruiterInsight":"AI service unavailable",
      "bestRole":"Software Engineer",
      "proTip":"Retry analysis in a few minutes"
    }
    """;
}

            return extractText(response.toString());

        } catch (Exception e) {
            return "AI Error: " + e.getMessage();
        }
    }

    private static String extractText(String response) {
    try {

        JsonObject root =
            JsonParser.parseString(response).getAsJsonObject();

        return root
                .getAsJsonArray("candidates")
                .get(0).getAsJsonObject()
                .getAsJsonObject("content")
                .getAsJsonArray("parts")
                .get(0).getAsJsonObject()
                .get("text")
                .getAsString();

    } catch (Exception e) {
        e.printStackTrace();
        return "";
    }
}
}