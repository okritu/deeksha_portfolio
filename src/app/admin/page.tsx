"use client";

import React, { useState, useEffect } from "react";
import { 
  User, Briefcase, FolderGit, Award, Settings, 
  Save, LogIn, Plus, Trash2, Eye, ArrowLeft,
  Loader2, CheckCircle2, AlertCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function AdminPage() {
  const router = useRouter();
  
  // Auth state
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  // Data state
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [saveMessage, setSaveMessage] = useState("");

  // Load portfolio data
  useEffect(() => {
    // Check localStorage auth
    if (localStorage.getItem("portfolio_auth") === "true") {
      setIsAuthenticated(true);
    }
    
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading portfolio data:", err);
        setIsLoading(false);
      });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-configured simple password
    if (password === "deeksha-admin") {
      setIsAuthenticated(true);
      setLoginError("");
      localStorage.setItem("portfolio_auth", "true");
    } else {
      setLoginError("Invalid admin access password.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("portfolio_auth");
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      
      if (res.ok) {
        setSaveStatus("success");
        setSaveMessage(result.message || "Changes saved successfully.");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        throw new Error(result.error || "Failed to save portfolio data");
      }
    } catch (err: any) {
      console.error(err);
      setSaveStatus("error");
      setSaveMessage(err.message || "Failed to connect to API.");
      setTimeout(() => setSaveStatus("idle"), 4000);
    }
  };

  // Helper change functions for nesting fields
  const handleProfileChange = (key: string, val: string) => {
    setData({
      ...data,
      profile: {
        ...data.profile,
        [key]: val,
      },
    });
  };

  // Experience Handlers
  const handleExperienceChange = (index: number, key: string, val: any) => {
    const updated = [...data.experience];
    updated[index] = { ...updated[index], [key]: val };
    setData({ ...data, experience: updated });
  };

  const addExperience = () => {
    const newItem = {
      id: `exp-${Date.now()}`,
      role: "New Role",
      company: "New Company",
      duration: "Duration Details",
      bullets: ["Achievement bullet point #1"]
    };
    setData({ ...data, experience: [...data.experience, newItem] });
  };

  const deleteExperience = (index: number) => {
    const updated = data.experience.filter((_: any, i: number) => i !== index);
    setData({ ...data, experience: updated });
  };

  // Projects Handlers
  const handleProjectChange = (index: number, key: string, val: any) => {
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [key]: val };
    setData({ ...data, projects: updated });
  };

  const addProject = () => {
    const newItem = {
      id: `project-${Date.now()}`,
      title: "New Analytics Project",
      subtitle: "Brief description subtitle",
      description: "Complete analytical description details...",
      achievements: ["Key project milestone achievement #1"],
      techStack: ["Python", "SQL", "Power BI"],
      githubUrl: "https://github.com/okritu",
      category: "Analysis",
      metrics: [
        { label: "Data preprocessed", value: "Details" }
      ]
    };
    setData({ ...data, projects: [...data.projects, newItem] });
  };

  const deleteProject = (index: number) => {
    const updated = data.projects.filter((_: any, i: number) => i !== index);
    setData({ ...data, projects: updated });
  };

  // Skills Handlers
  const handleSkillChange = (type: "core" | "supplementary", index: number, key: string, val: any) => {
    const updatedType = [...data.skills[type]];
    updatedType[index] = { ...updatedType[index], [key]: val };
    setData({
      ...data,
      skills: {
        ...data.skills,
        [type]: updatedType
      }
    });
  };

  const addSkill = (type: "core" | "supplementary") => {
    const newItem = type === "core" 
      ? { label: "New Tech", value: 80, color: "indigo" } 
      : { label: "New Library", value: 80 };
    setData({
      ...data,
      skills: {
        ...data.skills,
        [type]: [...data.skills[type], newItem]
      }
    });
  };

  const deleteSkill = (type: "core" | "supplementary", index: number) => {
    const updated = data.skills[type].filter((_: any, i: number) => i !== index);
    setData({
      ...data,
      skills: {
        ...data.skills,
        [type]: updated
      }
    });
  };

  // Education/Cert Handlers
  const handleEduChange = (index: number, key: string, val: any) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [key]: val };
    setData({ ...data, education: updated });
  };

  const addEducation = () => {
    const newItem = {
      id: `edu-${Date.now()}`,
      year: "2026",
      title: "New Degree",
      school: "Institution Name",
      description: "Brief course achievements details."
    };
    setData({ ...data, education: [...data.education, newItem] });
  };

  const deleteEducation = (index: number) => {
    const updated = data.education.filter((_: any, i: number) => i !== index);
    setData({ ...data, education: updated });
  };

  const handleCertChange = (index: number, key: string, val: any) => {
    const updated = [...data.certifications];
    updated[index] = { ...updated[index], [key]: val };
    setData({ ...data, certifications: updated });
  };

  const addCert = () => {
    const newItem = {
      id: `cert-${Date.now()}`,
      title: "New Certified Course",
      issuer: "Credential Issuer",
      date: "2026",
      verificationUrl: "https://github.com/okritu",
      skills: ["SQL", "Python"]
    };
    setData({ ...data, certifications: [...data.certifications, newItem] });
  };

  const deleteCert = (index: number) => {
    const updated = data.certifications.filter((_: any, i: number) => i !== index);
    setData({ ...data, certifications: updated });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050816] flex flex-col justify-center items-center gap-4 text-white">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="font-mono text-xs text-text-muted">Loading local portfolio database...</p>
      </div>
    );
  }

  // 1. Password Protection Modal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
        <div className="w-full max-w-md">
          <Card className="p-8 border-white/5 bg-slate-950/40 backdrop-blur-md relative overflow-hidden">
            
            {/* Top Back Home Button */}
            <button
              onClick={() => router.push("/")}
              className="absolute top-4 left-4 text-[10px] font-mono font-bold text-text-muted hover:text-white flex items-center gap-1 hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            <div className="flex flex-col items-center text-center space-y-3 pt-4">
              <div className="p-3 rounded-full bg-slate-900 border border-white/10 text-primary">
                <Settings className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">Portfolio Admin Gateway</h2>
              <p className="text-xs text-text-muted max-w-xs">
                Provide local developer access code to update data values in `portfolioData.json`.
              </p>
            </div>

            <form onSubmit={handleLogin} className="mt-8 space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">Access Key</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full h-11 px-4 rounded-xl bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-sm placeholder-text-muted transition-all"
                />
              </div>

              {loginError && (
                <p className="text-xs text-rose-400 font-mono flex items-center gap-1.5 pt-1">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  {loginError}
                </p>
              )}

              <Button
                variant="primary"
                type="submit"
                className="w-full h-11 font-mono font-bold mt-2 gap-2 cursor-pointer"
              >
                Authenticate
                <LogIn className="w-4 h-4" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  // 2. Admin Panel Layout
  return (
    <div className="min-h-screen bg-[#050816] text-[#E5E7EB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-none">
                Portfolio Dashboard
              </h1>
              <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase">
                Write Mode Active
              </span>
            </div>
            <p className="text-xs text-text-muted mt-2 font-mono">
              Editing file: <code className="text-secondary bg-slate-900 px-1 py-0.5 rounded">src/data/portfolioData.json</code>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-xs font-mono font-bold text-text-muted hover:text-white bg-slate-900 border border-white/5 hover:border-primary/20 px-4 py-2.5 rounded-lg transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-secondary" />
              View Site
            </button>

            <button
              onClick={handleLogout}
              className="text-xs font-mono font-bold text-text-muted hover:text-white hover:underline px-2 py-1 cursor-pointer"
            >
              Lock Panel
            </button>
          </div>
        </div>

        {/* Workspace Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Side Tabs Navigation (3 cols) */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 p-1 bg-slate-950/20 border border-white/5 rounded-xl lg:w-full max-w-full">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-xs font-mono font-bold w-full transition-all cursor-pointer ${
                activeTab === "profile" 
                  ? "bg-primary text-white" 
                  : "text-text-muted hover:text-white hover:bg-slate-900/40"
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              Profile Details
            </button>

            <button
              onClick={() => setActiveTab("experience")}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-xs font-mono font-bold w-full transition-all cursor-pointer ${
                activeTab === "experience" 
                  ? "bg-primary text-white" 
                  : "text-text-muted hover:text-white hover:bg-slate-900/40"
              }`}
            >
              <Briefcase className="w-4 h-4 shrink-0" />
              Work Experience
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-xs font-mono font-bold w-full transition-all cursor-pointer ${
                activeTab === "projects" 
                  ? "bg-primary text-white" 
                  : "text-text-muted hover:text-white hover:bg-slate-900/40"
              }`}
            >
              <FolderGit className="w-4 h-4 shrink-0" />
              Projects
            </button>

            <button
              onClick={() => setActiveTab("skills")}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-xs font-mono font-bold w-full transition-all cursor-pointer ${
                activeTab === "skills" 
                  ? "bg-primary text-white" 
                  : "text-text-muted hover:text-white hover:bg-slate-900/40"
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              Tooling & Skills
            </button>

            <button
              onClick={() => setActiveTab("education")}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-xs font-mono font-bold w-full transition-all cursor-pointer ${
                activeTab === "education" 
                  ? "bg-primary text-white" 
                  : "text-text-muted hover:text-white hover:bg-slate-900/40"
              }`}
            >
              <Award className="w-4 h-4 shrink-0" />
              Education / Certs
            </button>
          </div>

          {/* Form Editors Container (9 cols) */}
          <div className="lg:col-span-9 flex flex-col gap-6 text-left">
            
            {/* Save Toast feedback indicator */}
            {saveStatus !== "idle" && (
              <div className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                saveStatus === "saving" 
                  ? "bg-slate-950 border-white/10 text-text-muted"
                  : saveStatus === "success"
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-rose-500/10 border-rose-500/20 text-rose-400"
              }`}>
                {saveStatus === "saving" ? (
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                ) : saveStatus === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-400" />
                )}
                <div>
                  <p className="text-xs font-mono font-bold">
                    {saveStatus === "saving" ? "Writing changes to local file system..." : saveStatus === "success" ? "Save Complete" : "Save Error"}
                  </p>
                  <p className="text-[10px] mt-0.5 opacity-80">{saveMessage}</p>
                </div>
              </div>
            )}

            <Card className="p-6 md:p-8 border-white/5 bg-slate-950/20 backdrop-blur-md space-y-6">
              
              {/* TAB 1: PROFILE TAB */}
              {activeTab === "profile" && (
                <div className="space-y-5">
                  <h3 className="text-sm font-bold font-mono tracking-wider text-secondary uppercase border-b border-white/5 pb-2">
                    Profile Configurations
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-text-muted uppercase block">Full Name</label>
                      <input 
                        type="text" 
                        value={data.profile.name}
                        onChange={(e) => handleProfileChange("name", e.target.value)}
                        className="w-full h-10 px-3 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-text-muted uppercase block">Role Designation</label>
                      <input 
                        type="text" 
                        value={data.profile.role}
                        onChange={(e) => handleProfileChange("role", e.target.value)}
                        className="w-full h-10 px-3 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-text-muted uppercase block">Direct Email</label>
                      <input 
                        type="email" 
                        value={data.profile.email}
                        onChange={(e) => handleProfileChange("email", e.target.value)}
                        className="w-full h-10 px-3 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-text-muted uppercase block">Phone Coordinates</label>
                      <input 
                        type="text" 
                        value={data.profile.phone}
                        onChange={(e) => handleProfileChange("phone", e.target.value)}
                        className="w-full h-10 px-3 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-text-muted uppercase block">Location Base</label>
                      <input 
                        type="text" 
                        value={data.profile.location}
                        onChange={(e) => handleProfileChange("location", e.target.value)}
                        className="w-full h-10 px-3 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-text-muted uppercase block">Availability Status</label>
                      <input 
                        type="text" 
                        value={data.profile.availability}
                        onChange={(e) => handleProfileChange("availability", e.target.value)}
                        className="w-full h-10 px-3 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-text-muted uppercase block">LinkedIn Profile URL</label>
                      <input 
                        type="text" 
                        value={data.profile.linkedin}
                        onChange={(e) => handleProfileChange("linkedin", e.target.value)}
                        className="w-full h-10 px-3 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg col-span-1 sm:col-span-2"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-text-muted uppercase block">GitHub Profile URL</label>
                      <input 
                        type="text" 
                        value={data.profile.github}
                        onChange={(e) => handleProfileChange("github", e.target.value)}
                        className="w-full h-10 px-3 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg col-span-1 sm:col-span-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-text-muted uppercase block">Professional Objective Summary</label>
                    <textarea 
                      value={data.profile.summary}
                      onChange={(e) => handleProfileChange("summary", e.target.value)}
                      rows={5}
                      className="w-full p-4 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg resize-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: EXPERIENCE TAB */}
              {activeTab === "experience" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <h3 className="text-sm font-bold font-mono tracking-wider text-secondary uppercase">
                      Work Experience Logs
                    </h3>
                    <button
                      onClick={addExperience}
                      className="flex items-center gap-1 text-[10px] font-mono font-bold text-primary hover:text-white bg-slate-900 border border-white/5 hover:border-primary/30 px-3 py-1.5 rounded-lg cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Job
                    </button>
                  </div>

                  {data.experience.map((job: any, index: number) => (
                    <div key={job.id} className="p-5 border border-white/5 bg-slate-900/10 rounded-xl space-y-4 relative group">
                      <button
                        onClick={() => deleteExperience(index)}
                        className="absolute top-4 right-4 text-text-muted hover:text-rose-400 p-1 bg-slate-900/80 border border-white/5 rounded-lg cursor-pointer transition-colors"
                        title="Delete Experience"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-text-muted uppercase block">Job Designation</label>
                          <input 
                            type="text" 
                            value={job.role}
                            onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                            className="w-full h-9 px-3 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-text-muted uppercase block">Company / Employer</label>
                          <input 
                            type="text" 
                            value={job.company}
                            onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                            className="w-full h-9 px-3 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-text-muted uppercase block">Duration Dates</label>
                          <input 
                            type="text" 
                            value={job.duration}
                            onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
                            className="w-full h-9 px-3 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-text-muted uppercase block">Bullets Achievements (one per line)</label>
                        <textarea 
                          value={job.bullets.join("\n")}
                          onChange={(e) => handleExperienceChange(index, "bullets", e.target.value.split("\n"))}
                          rows={4}
                          className="w-full p-3 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg font-sans resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: PROJECTS TAB */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <h3 className="text-sm font-bold font-mono tracking-wider text-secondary uppercase">
                      Analytical Case Studies
                    </h3>
                    <button
                      onClick={addProject}
                      className="flex items-center gap-1 text-[10px] font-mono font-bold text-primary hover:text-white bg-slate-900 border border-white/5 hover:border-primary/30 px-3 py-1.5 rounded-lg cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Project
                    </button>
                  </div>

                  {data.projects.map((project: any, index: number) => (
                    <div key={project.id} className="p-5 border border-white/5 bg-slate-900/10 rounded-xl space-y-4 relative">
                      <button
                        onClick={() => deleteProject(index)}
                        className="absolute top-4 right-4 text-text-muted hover:text-rose-400 p-1 bg-slate-900/80 border border-white/5 rounded-lg cursor-pointer transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-text-muted uppercase block">Project Title</label>
                          <input 
                            type="text" 
                            value={project.title}
                            onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                            className="w-full h-9 px-3 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-text-muted uppercase block">Subtitle Outline</label>
                          <input 
                            type="text" 
                            value={project.subtitle}
                            onChange={(e) => handleProjectChange(index, "subtitle", e.target.value)}
                            className="w-full h-9 px-3 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-text-muted uppercase block">GitHub Project Link</label>
                          <input 
                            type="text" 
                            value={project.githubUrl}
                            onChange={(e) => handleProjectChange(index, "githubUrl", e.target.value)}
                            className="w-full h-9 px-3 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-text-muted uppercase block">Category Category</label>
                            <select 
                              value={project.category}
                              onChange={(e) => handleProjectChange(index, "category", e.target.value)}
                              className="w-full h-9 px-2 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg cursor-pointer"
                            >
                              <option value="Visualization">BI & Visualization</option>
                              <option value="Database">SQL & Databases</option>
                              <option value="Analysis">Data Pipeline Analysis</option>
                            </select>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-text-muted uppercase block">Tech Stack (comma-separated)</label>
                            <input 
                              type="text" 
                              value={project.techStack.join(", ")}
                              onChange={(e) => handleProjectChange(index, "techStack", e.target.value.split(",").map(t => t.trim()))}
                              className="w-full h-9 px-3 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-text-muted uppercase block">Overview Description</label>
                        <textarea 
                          value={project.description}
                          onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                          rows={3}
                          className="w-full p-3 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg resize-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-text-muted uppercase block">Milestones Achievements (one per line)</label>
                        <textarea 
                          value={project.achievements.join("\n")}
                          onChange={(e) => handleProjectChange(index, "achievements", e.target.value.split("\n"))}
                          rows={4}
                          className="w-full p-3 bg-slate-900/60 border border-white/5 focus:border-primary/50 focus:outline-none text-white text-xs rounded-lg font-sans resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: SKILLS TAB */}
              {activeTab === "skills" && (
                <div className="space-y-8">
                  {/* Core skills */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <h3 className="text-sm font-bold font-mono tracking-wider text-secondary uppercase">
                        Core Progress Gauges (Circular)
                      </h3>
                      <button
                        onClick={() => addSkill("core")}
                        className="flex items-center gap-1 text-[10px] font-mono font-bold text-primary hover:text-white bg-slate-900 border border-white/5 hover:border-primary/30 px-3 py-1.5 rounded-lg cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Core
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {data.skills.core.map((skill: any, index: number) => (
                        <div key={index} className="flex gap-3 items-end p-3 border border-white/5 bg-slate-900/10 rounded-lg relative">
                          <button
                            onClick={() => deleteSkill("core", index)}
                            className="absolute top-2 right-2 text-text-muted hover:text-rose-400 p-0.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          
                          <div className="space-y-1.5 flex-grow">
                            <label className="text-[9px] font-mono text-text-muted uppercase block">Tech Name</label>
                            <input 
                              type="text" 
                              value={skill.label}
                              onChange={(e) => handleSkillChange("core", index, "label", e.target.value)}
                              className="w-full h-8 px-2 bg-slate-900/60 border border-white/5 text-white text-xs rounded-md"
                            />
                          </div>

                          <div className="space-y-1.5 w-20">
                            <label className="text-[9px] font-mono text-text-muted uppercase block">Gauge %</label>
                            <input 
                              type="number" 
                              value={skill.value}
                              onChange={(e) => handleSkillChange("core", index, "value", parseInt(e.target.value) || 0)}
                              className="w-full h-8 px-2 bg-slate-900/60 border border-white/5 text-white text-xs rounded-md"
                            />
                          </div>

                          <div className="space-y-1.5 w-24">
                            <label className="text-[9px] font-mono text-text-muted uppercase block">Color</label>
                            <select 
                              value={skill.color}
                              onChange={(e) => handleSkillChange("core", index, "color", e.target.value)}
                              className="w-full h-8 px-1 bg-slate-900/60 border border-white/5 text-white text-xs rounded-md cursor-pointer"
                            >
                              <option value="indigo">Indigo</option>
                              <option value="cyan">Cyan</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Supplementary skills */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <h3 className="text-sm font-bold font-mono tracking-wider text-secondary uppercase">
                        Supplementary Skill Levels (Linear)
                      </h3>
                      <button
                        onClick={() => addSkill("supplementary")}
                        className="flex items-center gap-1 text-[10px] font-mono font-bold text-primary hover:text-white bg-slate-900 border border-white/5 hover:border-primary/30 px-3 py-1.5 rounded-lg cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Tool
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {data.skills.supplementary.map((skill: any, index: number) => (
                        <div key={index} className="flex gap-3 items-end p-3 border border-white/5 bg-slate-900/10 rounded-lg relative">
                          <button
                            onClick={() => deleteSkill("supplementary", index)}
                            className="absolute top-2 right-2 text-text-muted hover:text-rose-400 p-0.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          
                          <div className="space-y-1.5 flex-grow">
                            <label className="text-[9px] font-mono text-text-muted uppercase block">Library/Framework</label>
                            <input 
                              type="text" 
                              value={skill.label}
                              onChange={(e) => handleSkillChange("supplementary", index, "label", e.target.value)}
                              className="w-full h-8 px-2 bg-slate-900/60 border border-white/5 text-white text-xs rounded-md"
                            />
                          </div>

                          <div className="space-y-1.5 w-24">
                            <label className="text-[9px] font-mono text-text-muted uppercase block">Proficiency %</label>
                            <input 
                              type="number" 
                              value={skill.value}
                              onChange={(e) => handleSkillChange("supplementary", index, "value", parseInt(e.target.value) || 0)}
                              className="w-full h-8 px-2 bg-slate-900/60 border border-white/5 text-white text-xs rounded-md"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: EDUCATION & CERTIFICATIONS TAB */}
              {activeTab === "education" && (
                <div className="space-y-8">
                  {/* Education list */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <h3 className="text-sm font-bold font-mono tracking-wider text-secondary uppercase">
                        Education Chronicles
                      </h3>
                      <button
                        onClick={addEducation}
                        className="flex items-center gap-1 text-[10px] font-mono font-bold text-primary hover:text-white bg-slate-900 border border-white/5 hover:border-primary/30 px-3 py-1.5 rounded-lg cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Degree
                      </button>
                    </div>

                    {data.education.map((edu: any, index: number) => (
                      <div key={edu.id} className="p-4 border border-white/5 bg-slate-900/10 rounded-lg space-y-3 relative">
                        <button
                          onClick={() => deleteEducation(index)}
                          className="absolute top-3 right-3 text-text-muted hover:text-rose-400 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-text-muted uppercase block">Timeline Year</label>
                            <input 
                              type="text" 
                              value={edu.year}
                              onChange={(e) => handleEduChange(index, "year", e.target.value)}
                              className="w-full h-8 px-2.5 bg-slate-900/60 border border-white/5 text-white text-xs rounded-md"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-text-muted uppercase block">Degree / Title</label>
                            <input 
                              type="text" 
                              value={edu.title}
                              onChange={(e) => handleEduChange(index, "title", e.target.value)}
                              className="w-full h-8 px-2.5 bg-slate-900/60 border border-white/5 text-white text-xs rounded-md"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-text-muted uppercase block">School / Institution</label>
                            <input 
                              type="text" 
                              value={edu.school}
                              onChange={(e) => handleEduChange(index, "school", e.target.value)}
                              className="w-full h-8 px-2.5 bg-slate-900/60 border border-white/5 text-white text-xs rounded-md"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-text-muted uppercase block">Summary Outline</label>
                          <input 
                            type="text" 
                            value={edu.description}
                            onChange={(e) => handleEduChange(index, "description", e.target.value)}
                            className="w-full h-8 px-2.5 bg-slate-900/60 border border-white/5 text-white text-xs rounded-md"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Certifications list */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <h3 className="text-sm font-bold font-mono tracking-wider text-secondary uppercase">
                        Credentials & Certificates
                      </h3>
                      <button
                        onClick={addCert}
                        className="flex items-center gap-1 text-[10px] font-mono font-bold text-primary hover:text-white bg-slate-900 border border-white/5 hover:border-primary/30 px-3 py-1.5 rounded-lg cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Cert
                      </button>
                    </div>

                    {data.certifications.map((cert: any, index: number) => (
                      <div key={cert.id} className="p-4 border border-white/5 bg-slate-900/10 rounded-lg space-y-3 relative">
                        <button
                          onClick={() => deleteCert(index)}
                          className="absolute top-3 right-3 text-text-muted hover:text-rose-400 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-text-muted uppercase block">Credential Course Title</label>
                            <input 
                              type="text" 
                              value={cert.title}
                              onChange={(e) => handleCertChange(index, "title", e.target.value)}
                              className="w-full h-8 px-2.5 bg-slate-900/60 border border-white/5 text-white text-xs rounded-md"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-text-muted uppercase block">Issuer Board</label>
                            <input 
                              type="text" 
                              value={cert.issuer}
                              onChange={(e) => handleCertChange(index, "issuer", e.target.value)}
                              className="w-full h-8 px-2.5 bg-slate-900/60 border border-white/5 text-white text-xs rounded-md"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-text-muted uppercase block">Issued Date / Year</label>
                            <input 
                              type="text" 
                              value={cert.date}
                              onChange={(e) => handleCertChange(index, "date", e.target.value)}
                              className="w-full h-8 px-2.5 bg-slate-900/60 border border-white/5 text-white text-xs rounded-md"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-text-muted uppercase block">Skills Tagged (comma-separated)</label>
                            <input 
                              type="text" 
                              value={cert.skills.join(", ")}
                              onChange={(e) => handleCertChange(index, "skills", e.target.value.split(",").map(s => s.trim()))}
                              className="w-full h-8 px-2.5 bg-slate-900/60 border border-white/5 text-white text-xs rounded-md"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-text-muted uppercase block">Verification Link</label>
                            <input 
                              type="text" 
                              value={cert.verificationUrl}
                              onChange={(e) => handleCertChange(index, "verificationUrl", e.target.value)}
                              className="w-full h-8 px-2.5 bg-slate-900/60 border border-white/5 text-white text-xs rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Floating footer save control */}
              <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                <span className="text-[10px] font-mono text-text-muted">
                  Double check inputs before committing saves.
                </span>
                
                <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={saveStatus === "saving"}
                  className="gap-2 px-6 py-2.5 text-xs font-mono font-bold cursor-pointer shrink-0 shadow-md shadow-primary/10"
                >
                  {saveStatus === "saving" ? "Saving..." : "Save Dashboard Changes"}
                  <Save className="w-3.5 h-3.5" />
                </Button>
              </div>

            </Card>

          </div>

        </div>

      </div>
    </div>
  );
}
