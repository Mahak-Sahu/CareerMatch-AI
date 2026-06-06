package com.mahak.jobmatching.util;

import java.io.File;
import java.io.IOException;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

public class PdfReaderUtil {

    public static String extractText(File file) {

        try {

            PDDocument document = PDDocument.load(file);

            PDFTextStripper pdfStripper =
                    new PDFTextStripper();

            String text =
                    pdfStripper.getText(document);

            document.close();

            return text;

        } catch (IOException e) {

            e.printStackTrace();

            return "Error reading PDF";
        }
    }
}