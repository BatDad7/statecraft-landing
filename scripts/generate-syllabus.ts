import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, UnderlineType } from "docx";
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

  // --- PAGE 1: Intro & Curriculum Map ---

  // Header
  addText("AP U.S. Government & Politics", 22, "bold", "#000000", "center");
  addText("Simulation Integration Guide & Curriculum Map", 16, "bold", "#555555", "center");
  y += 10;

  addHeader("To the Instructor: Why Simulate?");
  addText("Statecraft: The Situation Room", 12, "bold");
  addText("AP Government students often struggle to connect abstract concepts (Federalism, Checks and Balances) with reality. This curriculum map demonstrates how the Statecraft simulation replaces passive lecturing with active political conflict. By placing students in the roles of President, Senator, or Justice, we force them to 'live' the required documents rather than just memorize them.", 10);
  
  y += 5;
  addText("AP® Disciplinary Practices & Big Ideas", 11, "bold");
  addText("• Concept Application: Apply political concepts (War Powers, Federalism) to real-world scenarios.", 9);
  addText("• Data Analysis: Analyze approval ratings, polling data, and budget deficits.", 9);
  addText("• Source Analysis: Interpret primary documents (Executive Orders, Legislative Bills).", 9);
  addText("• Argumentation: Develop defensible claims about policy choices (Security vs. Liberty).", 9);

  y += 5;
  addLine();

  addHeader("Curriculum Map: Mapping Simulation to AP Units");

  const units = [
    {
      title: "Unit 1: Foundations of American Democracy",
      sub: "FEDERALISM & CONSTITUTIONAL POWER",
      mech: "State Governors block Federal prisoner transfers (Guantanamo). President battles Congress over War Powers Resolution compliance.",
      docs: "Federalist No. 10, Brutus No. 1, Constitution"
    },
    {
      title: "Unit 2: Interactions Among Branches",
      sub: "CHECKS & BALANCES / IRON TRIANGLES",
      mech: "Congress attempts to override Presidential Veto on budget. Bureaucratic agencies fight for funding (Turf Wars). Senate confirms/rejects appointments.",
      docs: "Federalist No. 51, Federalist No. 70"
    },
    {
      title: "Unit 3: Civil Liberties & Civil Rights",
      sub: "BALANCING LIBERTY & ORDER",
      mech: "President chooses between 4th Amendment rights and 'Enhanced Surveillance' directives to stop a terror plot. Courts rule on constitutionality.",
      docs: "Bill of Rights, Letter from Birmingham Jail"
    },
    {
      title: "Unit 4: American Political Ideologies",
      sub: "POLLING & PUBLIC OPINION",
      mech: "Candidates analyze 'Approval Rating' tracking polls. Impact of 'Scandal' events on voter sentiment in swing districts.",
      docs: "Reliability of Data, Keynesian vs. Supply-Side budgets"
    }
  ];

  units.forEach(unit => {
    checkPageBreak(35);
    addText(unit.title, 11, "bold", "#000000");
    addText(unit.sub, 9, "bold", "#ef4444"); // Alert Red
    addText("Simulation Mechanics: " + unit.mech, 9);
    addText("Required Documents Applied: " + unit.docs, 9, "italic", "#555555");
    y += 4;
  });

  checkPageBreak(35);
  addText("Unit 5: Political Participation", 11, "bold", "#000000");
  addText("MEDIA, PARTIES & ELECTIONS", 9, "bold", "#ef4444");
  addText("Simulation Mechanics: The 'Symbiotic Relationship' between Press and Politicians. Leaking classified intel to shape the narrative. Interest Group lobbying (ACLU vs. Security Hawks).", 9);
  addText("Required Documents Applied: Citizens United (simulated via Campaign Finance mechanics)", 9, "italic", "#555555");

  // --- PAGE 2: Pacing Calendar ---
  doc.addPage();
  y = margin;

  addHeader("Turn-Key Pacing Calendar");
  addText("Proposed Fall Semester Timeline", 12, "italic", "#555555");
  y += 5;

  const months = [
    { name: "SEPTEMBER", unit: "Unit 1: Foundations", sim: "Orientation + Sim Period 0", focus: "Login, Role Selection, Federalism Dispute" },
    { name: "OCTOBER", unit: "Unit 2: Branches", sim: "Sim Period 1 & 2", focus: "Legislative Gridlock, Vetoes, Appointments" },
    { name: "NOVEMBER", unit: "Unit 3: Civil Liberties", sim: "Sim Period 3 (Crisis)", focus: "National Security Crisis vs. Bill of Rights" },
    { name: "DECEMBER", unit: "Review & Midterms", sim: "Sim Period 4 (Budget)", focus: "Power of the Purse, Shutdown Threats" },
    { name: "JANUARY", unit: "Unit 4: Ideologies", sim: "Sim Period 5 (Polling)", focus: "Public Opinion Data, Ad Buys, Approval Ratings" },
    { name: "FEBRUARY", unit: "Unit 5: Participation", sim: "Sim Period 6 (Election)", focus: "Voter Turnout, Media Leaks, Final Vote" }
  ];

  months.forEach(m => {
    checkPageBreak(30);
    // Draw timeline line
    doc.setDrawColor(200, 200, 200);
    doc.line(margin + 20, y, margin + 20, y + 25);
    doc.circle(margin + 20, y + 5, 2, 'F');

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(m.name, margin, y + 5);
    
    doc.setFontSize(11);
    doc.setTextColor("#2563EB");
    doc.text(m.unit, margin + 30, y + 5);

    doc.setFontSize(10);
    doc.setTextColor("#000000");
    doc.text(m.sim, margin + 30, y + 12);

    doc.setFontSize(9);
    doc.setTextColor("#555555");
    doc.setFont("helvetica", "italic");
    doc.text("Focus: " + m.focus, margin + 30, y + 18);

    y += 25;
  });

  // --- PAGE 3: Funding Letter ---
  doc.addPage();
  y = margin;

  addHeader("Funding Proposal / Purchase Justification");
  addText("Instructions: Submit this letter to your Department Head or Principal.", 10, "italic");
  y += 5;
  addLine();

  addText("To: Administration / Social Studies Department Chair", 10);
  addText("From: AP Government Instructor", 10);
  addText("Subject: Proposal to Integrate 'Statecraft' Simulation into AP Curriculum", 10, "bold");
  y += 10;

  addText("Dear Administrator,", 10);
  y += 5;
  addText("I am writing to request approval to adopt the Statecraft US Government simulation for my AP Government & Politics course next semester. This interactive platform aligns directly with our goal of increasing student engagement and improving AP Exam performance.", 10);
  y += 5;
  
  addText("Rationale for Adoption:", 11, "bold");
  y += 3;

  addText("1. Alignment with College Board Standards:", 10, "bold");
  addText("Statecraft is not a game; it is a curriculum engine designed around the 5 Big Ideas of the AP Framework. It requires students to apply the War Powers Resolution, Federalism, and Civil Liberties in real-time scenarios, directly preparing them for the Argument Essay (FRQ #4).", 10);
  y += 3;

  addText("2. Solution to Student Disengagement:", 10, "bold");
  addText("Traditional lectures struggle to convey the complexity of 'gridlock' or 'bureaucracy.' By placing students in the roles of President, Senator, or Justice, Statecraft forces them to experience these concepts. This 'active learning' model is proven to increase retention rates.", 10);
  y += 3;

  addText("3. Cost-Effective:", 10, "bold");
  addText("At a fraction of the cost of physical textbooks or supplementary workbooks, Statecraft provides a full semester of engagement, including automated grading features that allow me to focus more time on individual student feedback.", 10);
  y += 5;

  addText("I have reviewed the curriculum map (attached) and confirmed that it fits seamlessly into our existing pacing guide without requiring additional instructional days.", 10);
  y += 5;

  addText("Thank you for considering this opportunity to modernize our civics instruction.", 10);
  y += 10;

  addText("Sincerely,", 10);
  addText("[Instructor Signature]", 10);

  // Save the PDF
  const outputPath = path.join(process.cwd(), "public/assets/Statecraft_Syllabus_2025.pdf");
  const pdfBuffer = doc.output("arraybuffer");
  fs.writeFileSync(outputPath, Buffer.from(pdfBuffer));
  console.log(`✅ Syllabus PDF generated at: ${outputPath}`);
};

// --- DOCX GENERATION LOGIC ---
const generateDOCX = async () => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "AP U.S. Government & Politics",
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: "Simulation Integration Guide & Curriculum Map",
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: "" }), // Spacing

          new Paragraph({
            text: "To the Instructor: Why Simulate?",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Statecraft: The Situation Room", bold: true }),
              new TextRun("\nAP Government students often struggle to connect abstract concepts (Federalism, Checks and Balances) with reality. This curriculum map demonstrates how the Statecraft simulation replaces passive lecturing with active political conflict. By placing students in the roles of President, Senator, or Justice, we force them to 'live' the required documents rather than just memorize them."),
            ],
          }),
          new Paragraph({ text: "" }), // Spacing

          new Paragraph({
            text: "AP® Disciplinary Practices & Big Ideas",
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({ text: "• Concept Application: Apply political concepts (War Powers, Federalism) to real-world scenarios.", bullet: { level: 0 } }),
          new Paragraph({ text: "• Data Analysis: Analyze approval ratings, polling data, and budget deficits.", bullet: { level: 0 } }),
          new Paragraph({ text: "• Source Analysis: Interpret primary documents (Executive Orders, Legislative Bills).", bullet: { level: 0 } }),
          new Paragraph({ text: "• Argumentation: Develop defensible claims about policy choices (Security vs. Liberty).", bullet: { level: 0 } }),
          new Paragraph({ text: "" }), // Spacing

          new Paragraph({
            text: "Curriculum Map: Mapping Simulation to AP Units",
            heading: HeadingLevel.HEADING_1,
          }),

          // Units (Simplified loop)
          ...[
            { title: "Unit 1: Foundations", sub: "FEDERALISM", mech: "State Governors block Federal prisoner transfers.", docs: "Federalist No. 10, Brutus No. 1" },
            { title: "Unit 2: Branches", sub: "CHECKS & BALANCES", mech: "Congress overrides Veto. Agencies fight for funding.", docs: "Federalist No. 51, Federalist No. 70" },
            { title: "Unit 3: Civil Liberties", sub: "LIBERTY & ORDER", mech: "President chooses surveillance vs. privacy.", docs: "Bill of Rights, Birmingham Jail" },
            { title: "Unit 4: Ideologies", sub: "POLLING", mech: "Candidates analyze tracking polls and approval ratings.", docs: "Reliability of Data" },
            { title: "Unit 5: Participation", sub: "ELECTIONS", mech: "Media leaks and interest group lobbying.", docs: "Citizens United" }
          ].map(u => [
            new Paragraph({ text: u.title, heading: HeadingLevel.HEADING_3 }),
            new Paragraph({ children: [new TextRun({ text: u.sub, bold: true, color: "FF0000" })] }),
            new Paragraph({ text: `Simulation Mechanics: ${u.mech}` }),
            new Paragraph({ children: [new TextRun({ text: `Required Documents: ${u.docs}`, italics: true })] }),
            new Paragraph({ text: "" }),
          ]).flat(),

          new Paragraph({
            text: "Funding Proposal / Purchase Justification",
            heading: HeadingLevel.HEADING_1,
            pageBreakBefore: true,
          }),
          new Paragraph({ children: [new TextRun({ text: "Instructions: Submit this letter to your Department Head or Principal.", italics: true })] }),
          new Paragraph({ text: "" }),
          
          new Paragraph({ text: "To: Administration / Social Studies Department Chair" }),
          new Paragraph({ text: "From: AP Government Instructor" }),
          new Paragraph({ children: [new TextRun({ text: "Subject: Proposal to Integrate 'Statecraft' Simulation into AP Curriculum", bold: true })] }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "Dear Administrator," }),
          new Paragraph({ text: "I am writing to request approval to adopt the Statecraft US Government simulation..." }),
          new Paragraph({ text: "[Full text included in PDF version...]" }), // Abbreviated for DOCX demo
          new Paragraph({ text: "" }),
          new Paragraph({ text: "Sincerely," }),
          new Paragraph({ text: "[Instructor Signature]" }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(process.cwd(), "public/assets/Statecraft_Syllabus_2025.docx");
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Syllabus DOCX generated at: ${outputPath}`);
};

generatePDF();
generateDOCX();
