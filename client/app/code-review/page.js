"use client";
import React, { useState } from "react";
import axios from "axios";

export default function CodeReviewer() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [dbWarning, setDbWarning] = useState(null);

  // Helper to allow pressing 'Tab' inside the textarea instead of losing focus
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + "    " + code.substring(end);
      setCode(newCode);

      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const executeReviewPipeline = async () => {
    setLoading(true);
    setReport(null);
    setDbWarning(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/ai/get-review`,
        { code },
      );

      const data = response.data;

      if (data.success) {
        setReport(data.analysis);
        if (data.historySaved === false) {
          setDbWarning(data.message);
        }
      } else {
        alert(data.message || "An unexpected error occurred during analysis.");
      }
    } catch (err) {
      console.error("Pipeline failure:", err);
      const serverErrorMessage =
        err.response?.data?.message ||
        "Failed to connect to the code review service backend.";
      alert(serverErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  // --- DEFENSIVE STATE PROCESSING ---
  // Safely compute subsets out of the flat array payload to avoid view-layer crashes
  const issuesArray = Array.isArray(report)
    ? report.filter((item) => item?.issue_id !== "REF-001")
    : [];

  const refactorBlock = Array.isArray(report)
    ? report.find((item) => item?.issue_id === "REF-001")
    : null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 font-sans">
      {/* Header */}
      <header className="mb-6 border-b border-zinc-800 pb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white tracking-tight">
          Reviewer Code Here
        </h1>
        <button
          onClick={executeReviewPipeline}
          disabled={loading || !code.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 font-medium text-sm text-white px-5 py-2.5 rounded-md shadow-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Analyzing Code..." : "Review Code"}
        </button>
      </header>

      {/* Main Container */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Native Textarea Editor */}
        <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900 flex flex-col shadow-2xl">
          <div className="bg-zinc-800 px-4 py-2 text-xs font-mono tracking-wider text-zinc-400 border-b border-zinc-700 flex justify-between">
            <span>INPUT_CODE_WORKSPACE</span>=
          </div>

          <div className="relative flex-1 min-h-[60vh] flex font-mono text-sm bg-zinc-950">
            {/* Pseudo Line Numbers Indicator */}
            <div className="w-12 bg-zinc-900/50 text-zinc-600 text-right pr-3 select-none py-4 border-r border-zinc-800/80 hidden sm:block">
              {code.split("\n").map((_, index) => (
                <div key={index} className="h-6">
                  {index + 1}
                </div>
              ))}
            </div>

            {/* The Textarea */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 w-full p-4 bg-transparent text-zinc-200 font-mono text-sm focus:outline-none resize-none leading-6 placeholder-zinc-700 overflow-y-auto min-h-[60vh]"
              placeholder="// Paste your functional logic here..."
              spellCheck="false"
            />
          </div>
        </div>

        {/* Right Side: AI Insights Dashboard */}
        <div className="flex flex-col gap-4 max-h-[68vh] overflow-y-auto pr-2">
          {dbWarning && (
            <div className="bg-amber-950/40 border border-amber-800/60 rounded-lg p-3 text-xs text-amber-300 flex items-start gap-2">
              <span>⚠️</span>
              <p>
                <strong>Cloud Sync Alert:</strong> {dbWarning}
              </p>
            </div>
          )}

          {!report && !loading && (
            <div className="h-full border border-dashed border-zinc-800 rounded-lg flex flex-col items-center justify-center text-zinc-500 p-8 text-center">
              <p className="text-sm">
                Submit your code logic to initialize the review process.
              </p>
            </div>
          )}

          {loading && (
            <div className="space-y-4 animate-pulse">
              <div className="h-20 bg-zinc-900 border border-zinc-800 rounded-lg"></div>
              <div className="h-64 bg-zinc-900 border border-zinc-800 rounded-lg"></div>
            </div>
          )}

          {report && (
            <div className="space-y-4">
              {/* Flaws Card */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 shadow-md">
                <h3 className="text-xs font-bold text-zinc-400 tracking-wider uppercase mb-4">
                  Detected Issues
                </h3>
                {issuesArray.length === 0 ? (
                  <p className="text-xs text-emerald-400 font-mono bg-emerald-950/20 border border-emerald-900 p-3 rounded-md">
                    ✓ Clean pass. No issues detected.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {issuesArray.map((issue, idx) => (
                      <div
                        key={issue?.issue_id || idx}
                        className="bg-zinc-950 border border-zinc-800 rounded-md p-3 flex flex-col gap-1"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-mono font-bold text-indigo-400">
                            {issue?.issue_id || `ISSUE-${idx}`} •{" "}
                            {issue?.category || "General"}
                          </span>
                          <span
                            className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded tracking-wide ${
                              ["critical", "major", "error"].includes(
                                issue?.severity?.toLowerCase(),
                              )
                                ? "bg-red-950 text-red-400 border border-red-900"
                                : "bg-amber-950 text-amber-400 border border-amber-900"
                            }`}
                          >
                            {issue?.severity || "Medium"}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-white mt-1">
                          {issue?.title || "Issue Flagged"}
                        </h4>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                          {issue?.description ||
                            issue?.message ||
                            "No contextual description provided."}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
