"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type HistoryItem = {
  _id: string;
  sanitized_text: string;
  summary: string;
  createdAt: string;
};

type ResultType = {
  sanitized_text: string;
  summary: string;
  action_items?: string[];
  risks?: string[];};

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [result, setResult] = useState<ResultType | null>(null);

  const loadHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/history");
      setHistory(res.data);
    } catch {}
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const analyze = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/analyze", {
        text,
      });

      setResult(res.data);
      setText("");
      loadHistory();
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Hero */}
        <section className="space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-sm text-blue-300">
            AI Privacy Intelligence
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            SecureSum
          </h1>

          <p className="text-slate-400 max-w-2xl text-lg">
            Local-first privacy-focused meeting summarizer that redacts sensitive
            data before AI processing.
          </p>
        </section>

        {/* Layout */}
        <section className="grid lg:grid-cols-2 gap-6">

          {/* Input Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl space-y-4">
            <h2 className="text-xl font-semibold">Analyze Transcript</h2>

            <textarea
              rows={12}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste transcript, meeting notes, research logs..."
              className="w-full rounded-2xl bg-black/30 border border-white/10 p-4 outline-none resize-none"
            />

            <button
              onClick={analyze}
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 transition font-medium disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze Securely"}
            </button>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl min-h-[220px]">
              <h2 className="text-xl font-semibold mb-4">Summary</h2>

              {result ? (
                <p className="text-slate-300 leading-7">
                  {result.summary}
                </p>
              ) : (
                <p className="text-slate-500">
                  Your AI-generated summary will appear here.
                </p>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl min-h-[220px]">
              <h2 className="text-xl font-semibold mb-4">Sanitized Output</h2>

              {result ? (
                <p className="text-slate-300 whitespace-pre-wrap leading-7">
                  {result.sanitized_text}
                </p>
              ) : (
                <p className="text-slate-500">
                  Sensitive information will be masked here.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* History */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Recent Analyses</h2>
            <span className="text-sm text-slate-500">
              {history.length} records
            </span>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {history.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 hover:bg-white/[0.07] transition"
              >
                <p className="text-xs text-slate-500 mb-2">
                  {new Date(item.createdAt).toLocaleString()}
                </p>

                <h3 className="font-medium mb-2">Summary</h3>

                <p className="text-sm text-slate-300 line-clamp-4">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

