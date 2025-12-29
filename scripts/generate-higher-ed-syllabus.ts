import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import fs from "fs";
import path from "path";

// --- PDF GENERATION LOGIC ---
const generatePDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  let y = margin;

  // Helper for text wrapping
  const addText = (text: string, fontSize: number, fontStyle: string = "normal", color: string = "#000000", align: "left" | "center" | "right" | "justify" = "left") => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", fontStyle);
    doc.setTextColor(color);
    
    const lines = doc.splitTextToSize(text, contentWidth);
    doc.text(lines, align === "center" ? pageWidth / 2 : margin, y, { align: align });
    y += lines.length * fontSize * 0.35 + 2; // Line height + spacing
  };

  const addHeader = (text: string) => {
    y += 5;
    addText(text, 14, "bold", "#2563EB"); // Brand Blue
    y += 2;
  };

  const addLine = () => {
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;
  };

  const checkPageBreak = (neededSpace: number) => {
    if (y + neededSpace > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // --- CONTENT ---

  // Title
  addText("POSC 101: Introduction to American Government", 20, "bold", "#000000", "center");
  addText("Course Syllabus & Simulation Guide", 14, "bold", "#555555", "center");
  y += 10;

  // Instructor Info
  addText("Instructor: Professor [Name]", 10);
  addText("Contact: [Email]@college.edu", 10);
  addText("Office Hours: [Day/Time]", 10);
  y += 5;
  addLine();

  addHeader("Course Description and Objective");
  addText("This course introduces the fundamentals of the American government, including its political institutions and main actors. A key focus will be on how citizens interact with the government and ways to become informed and active participants in the political system. We will also compare American political institutions and behaviors with those of other countries to provide a comprehensive understanding of the American political system.", 10);
  y += 3;
  addText("The Statecraft US Government simulation will be integrated into the course to provide practical experience and deeper insights into the workings of government.", 10, "bold");
  y += 5;

  addHeader("Required Texts");
  addText("• \"American Government: Power and Purpose\" by Theodore J. Lowi, et al.", 10);
  addText("• \"The Logic of American Politics\" by Samuel Kernell, et al.", 10);
  y += 5;

  addHeader("Evaluation & Grading");
  addText("Final Exam: 20%", 10);
  addText("Midterm: 20%", 10);
  addText("Response Paper: 20%", 10);
  addText("Quizzes: 15%", 10);
  addText("Weekly Assignments: 10%", 10);
  addText("Attendance and Participation: 10%", 10);
  addText("Statecraft Simulation Participation: 5%", 10, "bold");
  y += 5;

  addHeader("Course Schedule");

  const weeks = [
    { week: "Week 1: Introduction", topic: "The Citizen and the Government", sim: "Simulation: Introduction to Statecraft US Government" },
    { week: "Week 2: The Constitution", topic: "The Founding and the Constitution", sim: "" },
    { week: "Week 3: Federalism", topic: "Federalism", sim: "" },
    { week: "Week 4: Civil Rights", topic: "Civil Liberties and Civil Rights", sim: "Simulation: Period 0 (Introductory session)" },
    { week: "Week 5: Public Opinion", topic: "Public Opinion", sim: "Simulation: Period 1" },
    { week: "Week 6: The Media", topic: "The Media", sim: "Simulation: Period 2" },
    { week: "Week 7: Parties & Elections", topic: "Political Parties, Participation", sim: "Simulation: Period 3" },
    { week: "Week 8: Congress", topic: "Congress", sim: "Midterm Exam" },
    { week: "Week 9: The Presidency", topic: "The Presidency", sim: "Simulation: Period 4" },
    { week: "Week 10: The Bureaucracy", topic: "The Bureaucracy", sim: "" },
    { week: "Week 11: The Judiciary", topic: "The Judiciary", sim: "Simulation: Period 5" },
    { week: "Week 12: Elections", topic: "Elections and Voting Behavior", sim: "" },
    { week: "Week 13: Political Parties", topic: "Political Parties", sim: "" },
    { week: "Week 14: Interest Groups", topic: "Interest Groups", sim: "" },
    { week: "Week 15: Policy", topic: "Domestic and Economic Policy", sim: "Paper Due" },
    { week: "Week 16: Foreign Policy", topic: "Foreign and Defense Policy", sim: "Final Exam" },
  ];

  weeks.forEach(w => {
    checkPageBreak(25);
    addText(w.week, 10, "bold");
    addText("Topic: " + w.topic, 9);
    if (w.sim) {
      addText(w.sim, 9, "bold", "#ef4444"); // Red for Sim
    }
    y += 3;
  });

  checkPageBreak(40);
  addHeader("Policies");
  addText("AI Plagiarism Policy: The use of AI-generated content for assignments, papers, or exams is strictly prohibited unless explicitly authorized. Any use of AI tools must be disclosed.", 9);
  y += 3;
  addText("Culture of Honesty: Understand and comply with academic honesty policies.", 9);

  // Save the PDF
  const outputDir = path.join(process.cwd(), "public/assets");
  if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, "Statecraft_HigherEd_Syllabus_2025.pdf");
  const pdfBuffer = doc.output("arraybuffer");
  fs.writeFileSync(outputPath, Buffer.from(pdfBuffer));
  console.log(`✅ Higher Ed Syllabus PDF generated at: ${outputPath}`);
};

generatePDF();

