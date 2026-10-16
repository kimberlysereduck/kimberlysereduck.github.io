import React, { useState } from 'react';
import { Send, CheckCircle2, Github, Copy, Check, Download, Mail, Linkedin, ArrowUpRight, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

/**
 * Renders contact information and direct communication links.
 *
 * @public
 */
export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    inquiryType: 'Software Engineering Role',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [downloadingResume, setDownloadingResume] = useState(false);

  const inquiryTypes = [
    'Software Engineering Role',
    'Full-Stack Web Development',
    'Test & Performance Automation',
    'Accessibility (WCAG) Consultation',
    'Open Source Collaboration',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDownloadResume = () => {
    setDownloadingResume(true);
    // Generate formatted Markdown resume
    const resumeText = `# Kimberly Sereduck — Software Engineer
Location: Carlsbad, NM
Email: ${PERSONAL_INFO.email}
GitHub (New): ${PERSONAL_INFO.githubUrl}
GitHub (OSS Contributions): ${PERSONAL_INFO.legacyGithubUrl}
LinkedIn: ${PERSONAL_INFO.linkedinUrl}

## Professional Summary
${PERSONAL_INFO.bio}

## Core Competencies
- Languages & Core Web: JavaScript (ES6+), TypeScript, Python, HTML5, CSS3, SQL
- Test & Performance Automation: pytest, Selenium, axe-core (WCAG 2.1 AA), Jest, Telemetry
- Frameworks & UI: React, Redux, Tailwind CSS, Responsive Mobile Architecture
- DevOps & Tools: Git/GitHub, Docker, Linux, CI/CD Actions, npm/pip dependency sync

## Open Source & Engineering Experience
Software Engineer — Full-Stack & Cloud Systems (2021 - Present)
Location: Carlsbad, NM
- Engineered responsive, accessible web applications in React and TypeScript.
- Architected automated continuous integration pipelines with automated regression gates.

Open Source Contributor — Mozilla Developer Infrastructure (2017 - 2021)
- Contributed to pytest-axe automated accessibility framework using axe-core and Selenium.
- Contributed to Firefox performance dashboards and telemetry analysis tooling.
- Maintained package configuration pipelines connecting npm and Python packaging.

Web Application Developer — Independent & Project Engineering (2016 - 2017)
Location: Carlsbad, NM
- Built interactive state-driven web applications and automated test runners.
`;

    const blob = new Blob([resumeText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Kimberly_Sereduck_Software_Engineer_Resume.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloadingResume(false), 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        inquiryType: 'Software Engineering Role',
        message: '',
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-pink-400 mb-2">
            <Mail className="w-3.5 h-3.5" />
            <span>DISPATCH &amp; INQUIRIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Connect with <span className="text-rainbow">Kimberly Sereduck</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">
            Based in Carlsbad, NM. Available for remote software engineering roles, automated testing architecture, and open-source collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Profile Links & Resume */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="rounded-2xl bg-[#0c0f17] border border-slate-800/80 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-mono">
                  Direct Channels
                </h3>
                <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Carlsbad, NM</span>
                </span>
              </div>

              {/* Email Copy Card */}
              <div className="p-3.5 rounded-xl bg-[#090b10] border border-slate-800 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] font-mono text-slate-500">Email Contact</div>
                  <div className="text-xs font-mono text-slate-200 truncate">{PERSONAL_INFO.email}</div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white flex items-center gap-1.5 transition-colors shrink-0"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Primary GitHub Card (New) */}
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3.5 rounded-xl bg-[#090b10] border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 group-hover:text-white transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-rainbow transition-colors flex items-center gap-1.5">
                      <span>Primary GitHub</span>
                      <span className="text-[10px] font-mono text-cyan-400 font-normal">(new)</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      github.com/kimberlysereduck
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </a>

              {/* Legacy / Open Source GitHub Card */}
              <a
                href={PERSONAL_INFO.legacyGithubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3.5 rounded-xl bg-[#090b10] border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-pink-400 group-hover:text-white transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-rainbow transition-colors flex items-center gap-1.5">
                      <span>Open Source Contributions</span>
                      <span className="text-[10px] font-mono text-pink-400 font-normal">(previous)</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      github.com/kimberlythegeek
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </a>

              {/* LinkedIn Card Link */}
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3.5 rounded-xl bg-[#090b10] border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-amber-400 group-hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-rainbow transition-colors">
                      LinkedIn Network
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      linkedin.com/in/kimberly-sereduck
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </a>

              {/* Download Resume Button */}
              <button
                onClick={handleDownloadResume}
                disabled={downloadingResume}
                className="w-full py-2.5 px-4 rounded-xl font-mono text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>{downloadingResume ? 'Generating Resume...' : 'Download Resume (.md)'}</span>
              </button>
            </div>

            {/* Quick Status Pill Info */}
            <div className="p-4 rounded-xl bg-[#090b10] border border-slate-800/80 font-mono text-xs text-slate-400 space-y-1">
              <div className="text-emerald-400 font-semibold">● Current Availability</div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Open to full-time remote software engineering positions and open-source contributions.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#0c0f17] border border-slate-800/90 p-6 sm:p-8 shadow-2xl rainbow-gradient-border">
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-mono">
                    Message Dispatched Successfully
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Thank you for reaching out to Kimberly Sereduck. I will review your transmission and respond promptly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white transition-colors"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-slate-300">
                        Your Name <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Taylor"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#090b10] border border-slate-800 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-slate-300">
                        Email Address <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@engineering.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#090b10] border border-slate-800 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-300">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#090b10] border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type} value={type} className="bg-[#090b10] text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Software Engineering Opportunity / Collaboration"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#090b10] border border-slate-800 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-300">
                      Message <span className="text-pink-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding the role, project, or question..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#090b10] border border-slate-800 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors resize-y leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-xl font-mono text-xs font-bold bg-white text-slate-950 hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Transmitting Message...' : 'Transmit Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
