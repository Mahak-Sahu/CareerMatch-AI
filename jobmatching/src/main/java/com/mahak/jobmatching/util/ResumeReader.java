package com.mahak.jobmatching.util;
import java.io.BufferedReader;
import java.io.FileReader;

public class ResumeReader {

    public static String readResume(String filePath) {

        StringBuilder content = new StringBuilder();

        try {
            BufferedReader reader = new BufferedReader(new FileReader(filePath));

            String line;

            while ((line = reader.readLine()) != null) {
                content.append(line).append(" ");
            }

            reader.close();

        } catch (Exception e) {
            System.out.println("Error Reading File");
        }

        return content.toString();
    }
}