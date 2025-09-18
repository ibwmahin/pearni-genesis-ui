import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * ChatDemo.tsx
 * Fully self-contained React + TypeScript component.
 * Focus: Fix the "mini popup" (mini assistant) UI so it is professional, readable, responsive,
 * and doesn't break layout on small screens. Uses Tailwind utility classes.
 *
 * Notes:
 * - This file assumes Tailwind + Boxicons + framer-motion + react-router-dom are available.
 * - Add the small CSS snippets below to your global stylesheet if you use the "glass-card" utility.
 */

type Message = {
  id: number;
  text: string;
  sender: "ai" | "user";
  timestamp: string; // ISO string
};

const SAMPLE_QUESTIONS = [
  "Explain CRISPR in one sentence",
  "How can AI help solve climate change?",
  "What's the future of quantum computing?",
];

export default function ChatDemo(): JSX.Element {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm pearNI. How can I help you today?",
      sender: "ai",
      timestamp: new Date().toISOString(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [miniOpen, setMiniOpen] = useState(false);

  const nextId = useRef(2);
  const timeouts = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const miniInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Auto-scroll to bottom when messages update
    const node = scrollRef.current;
    if (node) {
      node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    // focus mini input when the mini popup opens
    if (miniOpen) {
      setTimeout(() => miniInputRef.current?.focus(), 80);
    }
  }, [miniOpen]);

  useEffect(() => {
    // cleanup on unmount
    return () => {
      timeouts.current.forEach((t) => window.clearTimeout(t));
      timeouts.current = [];
    };
  }, []);

  const pushMessage = (m: Omit<Message, "id">) => {
    setMessages((prev) => [...prev, { ...m, id: nextId.current++ }]);
  };

  const simulateAi = (text: string) => {
    const t = text.toLowerCase();
    let resp =
      "That's a great question — could you clarify if you'd like a short overview, technical detail, or examples?";

    if (t.includes("crispr"))
      resp =
        "CRISPR is a gene-editing system enabling targeted DNA edits useful for research and therapeutic exploration.";
    if (t.includes("climate"))
      resp =
        "AI helps climate efforts by optimizing renewable resources, improving forecasts, and scaling mitigation with predictive models.";
    if (t.includes("quantum"))
      resp =
        "Quantum computing can accelerate certain simulations and optimizations; practical impact increases as hardware matures.";

    const timeoutId = window.setTimeout(
      () => {
        pushMessage({
          text: resp,
          sender: "ai",
          timestamp: new Date().toISOString(),
        });
      },
      700 + Math.random() * 700,
    );

    timeouts.current.push(timeoutId);
  };

  const sendMain = (e?: React.FormEvent) => {
    e?.preventDefault();
    const v = inputValue.trim();
    if (!v) return;
    pushMessage({
      text: v,
      sender: "user",
      timestamp: new Date().toISOString(),
    });
    setInputValue("");
    simulateAi(v);
  };

  const handleSampleSend = (q: string) => {
    // friendly UX: show the sample briefly then send automatically
    pushMessage({
      text: q,
      sender: "user",
      timestamp: new Date().toISOString(),
    });
    simulateAi(q);
  };

  const openFullDemo = () => navigate("/nasa-chat");

  // motion variants
  const popupVars = reduce
    ? {}
    : {
        hidden: { opacity: 0, scale: 0.96, y: 8 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { type: "spring", stiffness: 150, damping: 18 },
        },
        exit: { opacity: 0, scale: 0.98, y: 6 },
      };

  const messageVars = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.22 } },
      };

  return (
    <section id="demo" className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Experience <span className="gradient-text">pearNI</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Interact with pearNI — ask science, climate, or research questions
            and see demo responses.
          </p>
        </div>

        {/* Main chat card (kept concise) */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center">
                <i className="bx bxs-pear text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  pearNI Assistant
                </div>
                <div className="text-xs text-green-500 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  Online
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={openFullDemo}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 text-white text-sm shadow"
              >
                {" "}
                <i className="bx bx-rocket" /> Open NASA chat
              </button>

              <button
                onClick={() => setMiniOpen((v) => !v)}
                aria-expanded={miniOpen}
                aria-controls="pearni-mini"
                className="w-10 h-10 rounded-full glass flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <i
                  className={`bx ${miniOpen ? "bx-x" : "bx-message"} text-gray-800`}
                />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="h-[48vh] md:h-[58vh] lg:h-[60vh] overflow-y-auto p-4 space-y-4"
            role="log"
            aria-live="polite"
          >
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial="initial"
                  animate="animate"
                  exit={{ opacity: 0, y: -6 }}
                  variants={messageVars}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2 rounded-2xl shadow-sm ${m.sender === "user" ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white" : "glass text-gray-900"}`}
                  >
                    {m.sender === "ai" && (
                      <div className="flex items-center gap-2 mb-1">
                        <i
                          className="bx bxs-pear text-teal-500 text-xs"
                          aria-hidden
                        />
                        <span className="text-xs font-medium text-teal-600">
                          pearNI
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          {new Date(m.timestamp).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    )}
                    <div className="text-sm md:text-base break-words">
                      {m.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMain();
            }}
            className="p-4 md:p-5 border-t border-white/10"
          >
            <div className="flex gap-3 items-center">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask pearNI anything..."
                className="flex-1 rounded-full px-4 py-3 bg-white/6 placeholder-gray-400 text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
              />
              <button
                type="submit"
                className="relative w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <i className="bx bx-send" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* MINI POPUP (FIXED) */}
      <AnimatePresence>
        {miniOpen && (
          <motion.aside
            id="pearni-mini"
            key="pearni-mini"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={popupVars}
            className="fixed right-5 bottom-20 z-50 w-full max-w-[92vw] md:max-w-xs"
            role="dialog"
            aria-label="pearNI mini assistant"
          >
            <div className="glass-card rounded-xl overflow-hidden shadow-lg">
              {/* header */}
              <div className="flex items-start justify-between p-3 border-b border-white/10">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <i className="bx bxs-pear text-white text-sm" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      pearNI Assistant
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      Quick demo · ask a short question
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMiniOpen(false)}
                    aria-label="Close mini assistant"
                    className="p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    <i className="bx bx-x text-gray-700" />
                  </button>
                </div>
              </div>

              {/* body */}
              <div className="p-3">
                <p className="text-sm text-gray-700 mb-3">
                  Welcome — try a sample or open the full demo for more
                  features.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  {SAMPLE_QUESTIONS.slice(0, 2).map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSampleSend(q)}
                      className="w-full text-left px-3 py-2 rounded-lg bg-white/6 hover:bg-white/8 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                      <div className="text-sm font-medium text-gray-900 break-words">
                        {q}
                      </div>
                      <div className="text-xs text-gray-500">Quick sample</div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => {
                      setMiniOpen(false);
                      openFullDemo();
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-sm shadow"
                  >
                    {" "}
                    <i className="bx bx-rocket" /> Open full demo
                  </button>
                  <button
                    onClick={() => {
                      window.location.hash = "#about";
                      setMiniOpen(false);
                    }}
                    className="px-3 py-2 rounded-md bg-white/6 text-sm text-gray-900 font-medium hover:bg-white/8"
                  >
                    Learn
                  </button>
                </div>

                <div>
                  <label htmlFor="mini-input" className="sr-only">
                    Quick question
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="mini-input"
                      ref={miniInputRef}
                      type="text"
                      placeholder="Ask a short question..."
                      className="flex-1 rounded-full px-3 py-2 bg-white/6 text-sm placeholder-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const val = (
                            e.target as HTMLInputElement
                          ).value.trim();
                          if (!val) return;
                          pushMessage({
                            text: val,
                            sender: "user",
                            timestamp: new Date().toISOString(),
                          });
                          simulateAi(val);
                          (e.target as HTMLInputElement).value = "";
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const el = document.getElementById(
                          "mini-input",
                        ) as HTMLInputElement | null;
                        const val = el?.value.trim() ?? "";
                        if (!val) return;
                        pushMessage({
                          text: val,
                          sender: "user",
                          timestamp: new Date().toISOString(),
                        });
                        simulateAi(val);
                        if (el) el.value = "";
                      }}
                      className="px-3 py-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm"
                    >
                      Ask
                    </button>
                  </div>
                </div>
              </div>

              <div className="px-3 py-2 border-t border-white/8 text-xs text-gray-500">
                Responses are demo-generated and not professional advice.
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* mini toggle button (separate from main FAB) */}
      <div className="fixed right-5 bottom-5 md:bottom-6 z-50">
        <button
          onClick={() => setMiniOpen((v) => !v)}
          aria-expanded={miniOpen}
          aria-controls="pearni-mini"
          aria-label={miniOpen ? "Close assistant" : "Open assistant"}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl bg-gradient-to-r from-teal-500 to-cyan-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <i className={`bx ${miniOpen ? "bx-x" : "bx-message"} text-lg`} />
        </button>
      </div>
    </section>
  );
}
