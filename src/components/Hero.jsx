import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const previewQuestions = [
  "Tell me about a project you’re proud of.",
  "How do you approach a difficult problem?",
  "What would you like to improve next?",
];

function PracticePreview() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div className="absolute -inset-8 rounded-[3rem] bg-cyan-300/10 blur-3xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#11141d]/95 p-5 shadow-[0_32px_100px_-45px_rgba(0,242,255,.5)] sm:p-7">
        <div className="mb-7 flex items-center justify-between border-b border-white/[.08] pb-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.7"><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.64 5.64l2.12 2.12m8.48 8.48 2.12 2.12m0-12.72-2.12 2.12m-8.48 8.48-2.12 2.12"/><circle cx="12" cy="12" r="4"/></svg>
            </div>
            <div><p className="text-sm font-semibold text-white">Interview practice</p><p className="mt-1 text-xs text-white/45">A preview of your session</p></div>
          </div>
          <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[.08] px-3 py-1 text-[11px] font-medium text-emerald-200">READY</span>
        </div>

        <div className="mb-5 flex items-center justify-between text-xs text-white/45"><span>YOUR SESSION</span><span>01 / 03</span></div>
        <div className="rounded-2xl border border-white/[.08] bg-white/[.035] p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300"/><span className="text-xs font-medium text-cyan-200">BEHAVIORAL · WARM-UP</span></div>
          <p className="text-lg font-medium leading-relaxed text-white sm:text-xl">{previewQuestions[0]}</p>
          <p className="mt-3 text-sm leading-6 text-white/45">Take a moment to gather your thoughts. You can answer by voice or text.</p>
          <div className="mt-7 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-cyan-300 text-[#071014]" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z"/><path d="M18 11a1 1 0 0 0-2 0 4 4 0 0 1-8 0 1 1 0 0 0-2 0 6 6 0 0 0 5 5.91V20H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-3.09A6 6 0 0 0 18 11Z"/></svg></span>
            <div className="flex h-9 flex-1 items-center gap-1.5" aria-label="Audio waveform preview">
              {[14, 24, 17, 30, 20, 34, 16, 27, 19, 33, 13, 23, 16, 29, 19, 25, 12, 21, 16, 27, 11].map((height, i) => <span key={i} className="w-1 rounded-full bg-cyan-200/60" style={{ height }} />)}
            </div>
            <span className="text-xs tabular-nums text-white/35">00:00</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
          {[["01", "Practice"], ["02", "Get feedback"], ["03", "Grow"]].map(([number, label], i) => <div key={number} className={`rounded-xl border px-3 py-3 ${i === 0 ? "border-cyan-200/20 bg-cyan-200/[.07]" : "border-white/[.07] bg-white/[.02]"}`}><p className={`text-[10px] font-medium ${i === 0 ? "text-cyan-100" : "text-white/30"}`}>{number}</p><p className={`mt-1 text-xs ${i === 0 ? "text-white/80" : "text-white/40"}`}>{label}</p></div>)}
        </div>
      </div>
      <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-white/10 bg-[#191d27] px-4 py-3 shadow-xl sm:block">
        <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">Built around you</p>
        <p className="mt-1 text-sm text-white">Resume-informed practice</p>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[760px] items-center overflow-hidden bg-bg pb-20 pt-32 sm:min-h-[820px] sm:pt-36 lg:min-h-[850px] lg:pb-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 top-24 h-96 w-96 rounded-full bg-cyan-400/[.08] blur-[110px]" />
        <div className="absolute right-[-10rem] top-24 h-[28rem] w-[28rem] rounded-full bg-violet-500/[.09] blur-[130px]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }} className="max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-200/[.06] px-3.5 py-2 text-xs font-medium text-cyan-100/80">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> A calmer way to prepare for interviews
          </div>
          <h1 className="display-title max-w-[720px] text-5xl leading-[1.04] text-white sm:text-6xl lg:text-[4.35rem]">
            Show up ready for <span className="text-gradient">what comes next.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
            Practice with interviews shaped around your experience. Get useful feedback, build confidence, and see where to focus next.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/login" className="btn-neon inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold">
              Start practicing <span aria-hidden="true">↗</span>
            </Link>
            <a href="#features" className="btn-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold">
              Explore how it works <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/45 sm:text-sm">
            <span className="inline-flex items-center gap-2"><svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-cyan-200" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg> Practice at your own pace</span>
            <span className="inline-flex items-center gap-2"><svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-cyan-200" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg> Feedback you can act on</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .8, delay: .12, ease: [.22, 1, .36, 1] }}>
          <PracticePreview />
        </motion.div>
      </div>
    </section>
  );
}
