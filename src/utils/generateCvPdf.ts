import { jsPDF } from 'jspdf';
import { defaultProjects, defaultMilestones, defaultCertificates, defaultConfig } from '../data';

export function generateCvPdf(): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm

  // Palette
  const primaryDark: [number, number, number] = [15, 23, 42]; // #0F172A
  const textDark: [number, number, number] = [30, 41, 59]; // #1E293B
  const textMuted: [number, number, number] = [100, 116, 139]; // #64748B
  const goldAccent: [number, number, number] = [217, 140, 20]; // #D98C14
  const lineLight: [number, number, number] = [226, 232, 240]; // #E2E8F0

  // Helper for section headings
  const drawSectionHeading = (title: string, y: number): number => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...primaryDark);
    doc.text(title.toUpperCase(), margin, y);

    // Accent mini bar
    doc.setDrawColor(...goldAccent);
    doc.setLineWidth(0.6);
    doc.line(margin, y + 1.5, margin + 24, y + 1.5);

    // Subtle line across rest of page
    doc.setDrawColor(...lineLight);
    doc.setLineWidth(0.2);
    doc.line(margin + 26, y + 1.5, margin + contentWidth, y + 1.5);

    return y + 6;
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 1
  // ═══════════════════════════════════════════════════════════════════════════

  // Top Header Banner Accent
  doc.setFillColor(...primaryDark);
  doc.rect(0, 0, pageWidth, 5, 'F');
  doc.setFillColor(...goldAccent);
  doc.rect(0, 5, pageWidth, 1.2, 'F');

  let curY = 16;

  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...primaryDark);
  doc.text('BRAMASTYO KUSUMO', margin, curY);

  curY += 6;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...goldAccent);
  doc.text('Senior Full-Stack & Autonomous AI Systems Engineer · Lead Mobile Architect', margin, curY);

  curY += 5;

  // Contact Info Line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...textMuted);
  const email = defaultConfig.ownerEmail || 'bramastyodevops@gmail.com';
  const location = `${defaultConfig.ownerLocation || 'Jakarta, Indonesia'} (UTC+7)`;
  const github = 'github.com/bramastyokusumo';
  const moto = 'Motto: We Build Solutions';
  doc.text(`${email}   •   ${location}   •   ${github}   •   ${moto}`, margin, curY);

  curY += 3.5;
  doc.setDrawColor(...lineLight);
  doc.setLineWidth(0.4);
  doc.line(margin, curY, margin + contentWidth, curY);

  curY += 6;

  // ── Executive Summary ──
  curY = drawSectionHeading('Executive Summary', curY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...textDark);

  const summaryText =
    'Senior Systems Engineer & AI Architect with 10+ years of full-lifecycle engineering excellence. Full-stack web developer since 2013, early Flutter pioneer, and seasoned remote architect for PT Passion Abadi, PT 3D, and PT Rekayasa Digital. Specialized in Autonomous AI Agent workflows, LLM orchestration (ReAct / tool calling), multi-agent systems, cross-platform mobile architectures, and resilient enterprise backends. Dedicated to building high-impact, mission-critical solutions.';
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(summaryLines, margin, curY);
  curY += summaryLines.length * 4.2 + 4;

  // ── Core Technical Competencies ──
  curY = drawSectionHeading('Core Technical Competencies', curY);

  const skillGroups = [
    {
      category: 'Autonomous AI & LLMs',
      items: 'Multi-Agent Architectures, LangChain, Tool Calling (ReAct), Prompt Engineering, RAG, OpenAI / Gemini / Claude API Orchestration, Autonomous Workflows',
    },
    {
      category: 'Mobile & Cross-Platform',
      items: 'Flutter (Dart), BLoC / Riverpod, Native iOS/Android Bridges, Offline-First Sync, Biometric Auth, Face Liveness, Sales Field Geolocation Tracking',
    },
    {
      category: 'Web & Frontend',
      items: 'React 18, TypeScript, TailwindCSS, Next.js, Vite, WebGL / Three.js 3D Shaders, State Management, Responsive Design System Architecture',
    },
    {
      category: 'Backend & Cloud DevOps',
      items: 'Node.js, Python (FastAPI/Flask), Laravel/PHP, PostgreSQL, MySQL, Redis, Docker Containerization, RESTful & GraphQL APIs, CI/CD Pipelines',
    },
  ];

  skillGroups.forEach((group) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...primaryDark);
    doc.text(`•  ${group.category}: `, margin, curY);

    const prefixWidth = doc.getTextWidth(`•  ${group.category}: `);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textDark);

    const textLines = doc.splitTextToSize(group.items, contentWidth - prefixWidth);
    doc.text(textLines[0], margin + prefixWidth, curY);
    if (textLines.length > 1) {
      for (let i = 1; i < textLines.length; i++) {
        curY += 3.8;
        doc.text(textLines[i], margin + prefixWidth, curY);
      }
    }
    curY += 4.5;
  });

  curY += 2;

  // ── Flagship Engineering Solutions ──
  curY = drawSectionHeading('Flagship Engineering Projects', curY);

  const projectsToHighlight = defaultProjects.slice(0, 4);

  projectsToHighlight.forEach((proj) => {
    // Project Title & Stack
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...primaryDark);
    doc.text(proj.title, margin, curY);

    // Tags on the right
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...goldAccent);
    const tagString = (proj.techStack || []).slice(0, 3).join('  |  ');
    doc.text(tagString, margin + contentWidth, curY, { align: 'right' });

    curY += 4;

    // Subtitle / summary
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...textDark);
    const descLines = doc.splitTextToSize(proj.description, contentWidth);
    doc.text(descLines, margin, curY);
    curY += descLines.length * 3.8;

    // Key impact / metrics if available
    if (proj.impact) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(...textMuted);
      const impactLines = doc.splitTextToSize(`Key Impact: ${proj.impact}`, contentWidth);
      doc.text(impactLines, margin, curY);
      curY += impactLines.length * 3.6;
    }

    curY += 2.5;
  });

  // Page 1 Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...textMuted);
  doc.text('Bramastyo Kusumo — Curriculum Vitae', margin, pageHeight - 8);
  doc.text('Page 1 of 2', margin + contentWidth, pageHeight - 8, { align: 'right' });

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 2
  // ═══════════════════════════════════════════════════════════════════════════
  doc.addPage('a4', 'portrait');

  // Top Header Accent on Page 2
  doc.setFillColor(...primaryDark);
  doc.rect(0, 0, pageWidth, 4, 'F');
  doc.setFillColor(...goldAccent);
  doc.rect(0, 4, pageWidth, 1, 'F');

  curY = 14;

  // Running Header on Page 2
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...primaryDark);
  doc.text('BRAMASTYO KUSUMO', margin, curY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...textMuted);
  doc.text('Senior Full-Stack, Mobile & Autonomous AI Engineer', margin + contentWidth, curY, { align: 'right' });

  curY += 3;
  doc.setDrawColor(...lineLight);
  doc.setLineWidth(0.3);
  doc.line(margin, curY, margin + contentWidth, curY);
  curY += 6;

  // ── Professional Career Milestones ──
  curY = drawSectionHeading('Professional Experience & Career Milestones', curY);

  const careerMilestones = defaultMilestones.filter((m) => m.type !== 'education');

  careerMilestones.forEach((milestone) => {
    // Role + Organisation
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...primaryDark);
    doc.text(`${milestone.title}`, margin, curY);

    // Period on the right
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...goldAccent);
    doc.text(milestone.period, margin + contentWidth, curY, { align: 'right' });

    curY += 3.8;

    // Organisation
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...textMuted);
    doc.text(milestone.organisation, margin, curY);

    curY += 3.8;

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...textDark);
    const mLines = doc.splitTextToSize(milestone.description, contentWidth);
    doc.text(mLines, margin, curY);
    curY += mLines.length * 3.8 + 2.5;
  });

  curY += 2;

  // ── Industry Accreditations & Certifications ──
  curY = drawSectionHeading('Accredited Industry Certifications', curY);

  const cleanCerts = defaultCertificates.filter(
    (c) => c.id !== 'cert-005' && !c.issuer.includes('Bina Sarana Informatika')
  );

  cleanCerts.forEach((cert) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...primaryDark);
    doc.text(`•  ${cert.title}`, margin, curY);

    // Date
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...textMuted);
    doc.text(cert.issueDate, margin + contentWidth, curY, { align: 'right' });

    curY += 3.6;

    // Issuer & ID
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(...goldAccent);
    doc.text(`    Issuer: ${cert.issuer}   |   Credential ID: ${cert.credentialId || 'Verified Record'}`, margin, curY);

    curY += 4.5;
  });

  curY += 2;

  // ── Formal Education ──
  curY = drawSectionHeading('Education & Academic Background', curY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...primaryDark);
  doc.text('Informatics Engineering Graduate Diploma', margin, curY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...goldAccent);
  doc.text('2010 — 2013', margin + contentWidth, curY, { align: 'right' });

  curY += 3.8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...textDark);
  doc.text('Universitas Bina Sarana Informatika (BSI) — Jakarta, Indonesia', margin, curY);

  curY += 3.8;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(...textMuted);
  doc.text('Foundational study in computer science, software engineering principles, algorithms, data structures, and relational databases.', margin, curY);

  // Page 2 Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...textMuted);
  doc.text('Bramastyo Kusumo — Curriculum Vitae', margin, pageHeight - 8);
  doc.text('Page 2 of 2', margin + contentWidth, pageHeight - 8, { align: 'right' });

  return doc;
}

export function downloadCvPdf(): void {
  try {
    const doc = generateCvPdf();
    doc.save('Bramastyo_Kusumo_CV.pdf');
  } catch (err) {
    console.error('Failed to generate CV PDF:', err);
  }
}
