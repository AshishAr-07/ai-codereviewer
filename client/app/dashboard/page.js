"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function HistoryDashboard() {
  const [historyLogs, setHistoryLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/auth/history`,
          {
            headers: { "Content-Type": "application/json" },
          },
        );
        if (response.data.success) {
          const logs = response.data.history.reverse(); // Newest first
          setHistoryLogs(logs);
          if (logs.length > 0) {
            setSelectedLog(logs[0]); // Default to selecting the most recent run
          }
        }
      } catch (err) {
        console.error("Failed to load history items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [baseUrl]);

  // Safe subset compilation helpers based on the selected historical node
  const issuesArray = Array.isArray(selectedLog?.analysis)
    ? selectedLog.analysis.filter((item) => item?.issue_id !== "REF-001")
    : [];

  const refactorBlock = Array.isArray(selectedLog?.analysis)
    ? selectedLog.analysis.find((item) => item?.issue_id === "REF-001")
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-zinc-400 font-mono">
            RETRIEVING_CLOUD_HISTORY_LOGS...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 px-6 py-4 flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">
            Review Archive
          </h1>
          <p className="text-xs text-zinc-400">
            Audit logs and past execution evaluations
          </p>
        </div>
        <Link
          href="/code-review"
          className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-medium px-4 py-2 rounded-md transition-colors"
        >
          ← Return to Workspace
        </Link>
      </header>

      {/* Main Dashboard Panel Split */}
      {historyLogs.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
          <span className="text-4xl mb-4">🗄️</span>
          <h2 className="text-md font-semibold text-zinc-300">
            No review logs compiled yet
          </h2>
          <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
            Run the AI pipeline inside the central editor workspace first to
            capture optimization profiles here.
          </p>
          <Link
            href="/reviewer"
            className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-xs px-4 py-2 rounded-md font-medium text-white transition-colors"
          >
            Analyze Code Now
          </Link>
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          
          {/* LEFT COLUMN: History Run Selection Sidebar */}
          <aside className="w-80 border-r border-zinc-800 bg-zinc-900/20 overflow-y-auto hidden md:block shrink-0">
            <div className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-900 sticky top-0 bg-zinc-950/80 backdrop-blur-sm z-10">
              Run Snapshot Indexes ({historyLogs.length})
            </div>
            <div className="divide-y divide-zinc-900">
              {historyLogs.map((log, index) => {
                const logAnomalies = Array.isArray(log.analysis)
                  ? log.analysis.filter((i) => i?.issue_id !== "REF-001").length
                  : 0;
                const isSelected = selectedLog?._id === log._id;

                return (
                  <button
                    key={log._id || index}
                    onClick={() => setSelectedLog(log)}
                    className={`w-full text-left p-4 flex flex-col gap-1 transition-all border-l-2 ${
                      isSelected
                        ? "bg-indigo-950/30 border-indigo-500 shadow-inner"
                        : "hover:bg-zinc-900/60 border-transparent"
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                      <span>RUN #{historyLogs.length - index}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold tracking-wide ${
                          logAnomalies > 0
                            ? "bg-amber-950 text-amber-400 border border-amber-900/50"
                            : "bg-emerald-950 text-emerald-400 border border-emerald-900/50"
                        }`}
                      >
                        {logAnomalies} {logAnomalies === 1 ? "Issue" : "Issues"}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate font-mono bg-zinc-950 px-2 py-1.5 rounded border border-zinc-800/80 mt-1">
                      {log.codeSnippet?.replace(/\s+/g, ' ').substring(0, 45) || "// Empty template string"}
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* RIGHT SCREEN COMPONENT: Inspection Grid Workspace */}
          <main className="flex-1 overflow-y-auto p-6 grid grid-cols-1 xl:grid-cols-2 gap-6 items-start max-h-[calc(100vh-73px)]">
            
            {/* Split Panel A: Historical Captured Code Source */}
            <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900 flex flex-col shadow-xl sticky top-0">
              <div className="bg-zinc-800 px-4 py-2 text-xs font-mono tracking-wider text-zinc-400 border-b border-zinc-700 flex justify-between items-center">
                <span>CAPTURED_SNAPSHOT_SOURCE</span>
                <span className="text-[10px] text-zinc-500 font-mono">Immutable Log</span>
              </div>
              <div className="p-4 bg-zinc-950 font-mono text-sm text-zinc-300 overflow-x-auto min-h-[50vh] max-h-[75vh] leading-6 select-text selection:bg-indigo-500/30">
                {/* Dynamically reading and rendering the historical snippet */}
                <pre>{selectedLog?.codeSnippet || "// No code capture stored inside document record."}</pre>
              </div>
            </div>

            {/* Split Panel B: Historical AI Diagnostics Report View */}
            <div className="flex flex-col gap-4">
              
              {/* Flaws Card */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 shadow-md">
                <h3 className="text-xs font-bold text-zinc-400 tracking-wider uppercase mb-4">
                  Historical Findings Report
                </h3>
                {issuesArray.length === 0 ? (
                  <p className="text-xs text-emerald-400 font-mono bg-emerald-950/20 border border-emerald-900 p-3 rounded-md">
                    ✓ Clean pass. No anomalies flagged in this historical profile run.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {issuesArray.map((issue, idx) => (
                      <div
                        key={issue?.issue_id || idx}
                        className="bg-zinc-950 border border-zinc-800 rounded-md p-3 transition-colors border-l-2 border-l-indigo-500"
                      >
                        <div className="flex justify-between items-center text-xs font-mono font-bold text-indigo-400">
                          <span>
                            {issue?.issue_id || `ISSUE-${idx}`} •{" "}
                            {issue?.category || "General"}
                          </span>
                          <span className="text-[10px] uppercase bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700 text-zinc-400 font-extrabold tracking-wide">
                            {issue?.severity || "Info"}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-white mt-1">
                          {issue?.title || "Issue Flagged"}
                        </h4>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                          {issue?.description ||
                            issue?.message ||
                            "No contextual text extracted."}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>


            </div>
          </main>
          
        </div>
      )}
    </div>
  );
}