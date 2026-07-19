import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#0A0E14] text-[#EDEFF3] min-h-screen overflow-x-hidden">

      {/* ---------- Hero ---------- */}
      <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] tracking-wide text-[#7FA8F5] bg-[#5B8DEF]/8 border border-[#5B8DEF]/20 rounded-full px-3.5 py-1.5 mb-7">
              no repo connection required
            </div>

            <h1 className="font-serif text-4xl sm:text-[3.25rem] leading-[1.12] tracking-tight mb-7">
              Paste your code.
              <br />
              Get a <span className="text-[#7FA8F5] italic">reviewer&apos;s</span>{" "}
              eye in seconds.
            </h1>

            <p className="text-[#8891A0] text-lg leading-relaxed max-w-md mb-10 font-light">
              Drop any snippet, function, or file into Review ai and get back the
              kind of review a careful senior engineer would leave — bugs,
              security gaps, and style drift, explained in plain language.
              Every review is saved to your dashboard so nothing gets lost.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-11">
              <Link
                href="/signup"
                className="text-[13px] font-medium px-6 py-3.5 rounded-full bg-[#5B8DEF] text-[#0A0E14] hover:bg-[#7FA8F5] hover:shadow-[0_10px_34px_-8px_rgba(91,141,239,0.55)] transition-all duration-300"
              >
                Paste your first snippet
              </Link>
              <a
                href="#demo"
                className="text-[13px] font-medium px-6 py-3.5 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300"
              >
                See a sample review
              </a>
            </div>

            <div className="flex items-center gap-5 text-xs text-[#4A5568]">
              <span>Works with any language</span>
              <span className="h-1 w-1 rounded-full bg-[#2A3444]" />
              <span>No install</span>
              <span className="h-1 w-1 rounded-full bg-[#2A3444]" />
              <span>Reviews saved automatically</span>
            </div>
          </div>

          {/* Signature element: paste box that becomes a review */}
          <div id="demo" className="relative">
            <div className="bg-[#12161F]/80 backdrop-blur-sm rounded-2xl border border-white/[0.07] shadow-[0_25px_70px_-20px_rgba(0,0,0,0.6)] p-7">
              <div className="flex items-center justify-between mb-7">
                <div>
                  <p className="text-[11px] tracking-wide text-[#4A5568] mb-1">
                    pasted snippet · javascript
                  </p>
                  <p className="text-sm font-medium">refund-handler.js</p>
                </div>
                <span className="text-[10px] tracking-wide text-[#7FA8F5] bg-[#5B8DEF]/10 border border-[#5B8DEF]/20 rounded-full px-2.5 py-1">
                  review complete
                </span>
              </div>

              <div className="flex items-center gap-6 mb-7 pb-7 border-b border-white/6">
                {/* radial score */}
                <div className="relative h-24 w-24 shrink-0">
                  <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#1E2530" strokeWidth="8" />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#5B8DEF"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="264"
                      strokeDashoffset="27"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-serif text-2xl">92</span>
                    <span className="text-[9px] text-[#4A5568] -mt-1 tracking-wide">health</span>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-lg font-medium text-[#F0918F]">1</div>
                    <div className="text-[10px] text-[#4A5568] tracking-wide">critical</div>
                  </div>
                  <div>
                    <div className="text-lg font-medium text-[#D4B579]">3</div>
                    <div className="text-[10px] text-[#4A5568] tracking-wide">warning</div>
                  </div>
                  <div>
                    <div className="text-lg font-medium text-[#7FA8F5]">2</div>
                    <div className="text-[10px] text-[#4A5568] tracking-wide">info</div>
                  </div>
                </div>
              </div>

              {/* issue list */}
              <div className="space-y-3.5 mb-6">
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#F0918F] shrink-0" />
                  <p className="text-[13px] text-[#B7BEC9] leading-relaxed">
                    <span className="text-[#EDEFF3] font-medium">Line 58 —</span>{" "}
                    refund amount isn&apos;t re-validated against the original
                    charge, allowing an over-refund.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#D4B579] shrink-0" />
                  <p className="text-[13px] text-[#B7BEC9] leading-relaxed">
                    <span className="text-[#EDEFF3] font-medium">Line 71 —</span>{" "}
                    error is caught but not logged with the request id.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#4A5568] pt-5 border-t border-white/6">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#4A5568" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                saved to your dashboard just now
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-[#4A5568]">
              a real review, trimmed for the homepage
            </p>
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section id="how" className="relative max-w-6xl mx-auto px-6 py-28">
        <div className="mb-16 max-w-lg">
          <p className="text-[11px] tracking-wide text-[#7FA8F5] mb-3">how it works</p>
          <h2 className="font-serif text-3xl tracking-tight mb-4">
            From pasted snippet to saved review
          </h2>
          <p className="text-[#8891A0] leading-relaxed font-light">
            No repo access, no CI setup. Paste code in, get a review back,
            find it again whenever you need it.
          </p>
        </div>

        <div className="relative pl-8 sm:pl-10 space-y-12 before:content-[''] before:absolute before:left-1.75 sm:before:left-2.75 before:top-2 before:bottom-2 before:w-px before:bg-linear-to-b before:from-white/12 before:via-white/6 before:to-transparent">
          {[
            {
              title: "Paste your code",
              body: "Drop in a function, a file, or a whole diff. Review ai detects the language automatically — no setup or config.",
            },
            {
              title: "Review Ai reviews it",
              body: "In seconds, you get back a scored review: bugs, security issues, and style drift, each explained in plain language.",
            },
            {
              title: "It's saved to your dashboard",
              body: "Every review is kept on your dashboard automatically, tied to the snippet you pasted and timestamped.",
            },
            {
              title: "Revisit anytime",
              body: "Come back later to compare reviews, track your code quality over time, or re-check a fix against the original findings.",
            },
          ].map((step, i) => (
            <div key={step.title} className="relative">
              <span className="absolute -left-8 sm:-left-10 top-0.5 h-3.5 w-3.5 rounded-full bg-[#0A0E14] border-2 border-[#5B8DEF]" />
              <p className="text-[11px] tracking-wide text-[#4A5568] mb-1.5">
                step {i + 1}
              </p>
              <h3 className="font-medium text-lg mb-2">{step.title}</h3>
              <p className="text-[#8891A0] text-sm leading-relaxed max-w-xl font-light">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Dashboard / history ---------- */}
      <section id="dashboard" className="relative max-w-6xl mx-auto px-6 py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] tracking-wide text-[#7FA8F5] mb-3">your dashboard</p>
            <h2 className="font-serif text-3xl tracking-tight mb-5">
              Every review, kept where you can find it
            </h2>
            <p className="text-[#8891A0] leading-relaxed max-w-md font-light mb-6">
              Nothing you paste into Review Ai disappears when you close the tab.
              Your dashboard keeps a running history of every review — the
              snippet, the score, and every finding — so you can track
              whether your code is actually getting cleaner.
            </p>
            <ul className="space-y-3 text-sm text-[#B7BEC9] font-light">
              <li className="flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-[#5B8DEF]" />
                Searchable history of every past review
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-[#5B8DEF]" />
                Health score trend across all your snippets
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-[#5B8DEF]" />
                Re-open any review to see the original code and findings side by side
              </li>
            </ul>
          </div>

          {/* dashboard mockup */}
          <div className="bg-[#12161F]/80 backdrop-blur-sm rounded-2xl border border-white/[0.07] shadow-[0_25px_70px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
              <span className="text-sm font-medium">Review history</span>
              <span className="text-[11px] text-[#4A5568]">18 saved reviews</span>
            </div>
            <div className="divide-y divide-white/5">
              {[
                { name: "refund-handler.js", lang: "JavaScript", score: 92, when: "2 minutes ago", dot: "#5B8DEF" },
                { name: "auth_middleware.py", lang: "Python", score: 78, when: "yesterday", dot: "#D4B579" },
                { name: "UserCard.tsx", lang: "TypeScript", score: 96, when: "3 days ago", dot: "#5B8DEF" },
                { name: "rate_limiter.go", lang: "Go", score: 64, when: "1 week ago", dot: "#F0918F" },
                { name: "checkout.rb", lang: "Ruby", score: 88, when: "2 weeks ago", dot: "#5B8DEF" },
              ].map((row) => (
                <div
                  key={row.name}
                  className="flex items-center justify-between px-6 py-4 hover:bg-white/2 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: row.dot }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm truncate">{row.name}</p>
                      <p className="text-[11px] text-[#4A5568]">
                        {row.lang} · {row.when}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-[#B7BEC9] shrink-0 ml-4">
                    {row.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Features (bento) ---------- */}
      <section id="features" className="relative max-w-6xl mx-auto px-6 py-28">
        <div className="mb-16 max-w-lg">
          <p className="text-[11px] tracking-wide text-[#7FA8F5] mb-3">features</p>
          <h2 className="font-serif text-3xl tracking-tight mb-4">
            Everything a careful reviewer checks
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-[#12161F]/60 border border-white/6 rounded-2xl p-8 hover:border-white/12 hover:bg-[#12161F] transition-all duration-300">
            <h3 className="font-medium text-lg mb-2.5">Paste and go</h3>
            <p className="text-[#8891A0] text-sm leading-relaxed max-w-md font-light">
              No repo connection, no CI setup, no permissions to grant. Paste
              a snippet and get a full review back in seconds — from your
              browser or the dashboard.
            </p>
          </div>
          <div className="bg-[#12161F]/60 border border-white/6 rounded-2xl p-8 hover:border-white/12 hover:bg-[#12161F] transition-all duration-300">
            <h3 className="font-medium text-lg mb-2.5">Severity scoring</h3>
            <p className="text-[#8891A0] text-sm leading-relaxed font-light">
              Every finding is ranked critical, warning, or info — so you know
              what to fix first.
            </p>
          </div>
          <div className="bg-[#12161F]/60 border border-white/6 rounded-2xl p-8 hover:border-white/12 hover:bg-[#12161F] transition-all duration-300">
            <h3 className="font-medium text-lg mb-2.5">Security-first</h3>
            <p className="text-[#8891A0] text-sm leading-relaxed font-light">
              Injection risks, leaked credentials, and unsafe patterns are
              flagged before the code goes anywhere near production.
            </p>
          </div>
          <div className="bg-[#12161F]/60 border border-white/6 rounded-2xl p-8 hover:border-white/12 hover:bg-[#12161F] transition-all duration-300">
            <h3 className="font-medium text-lg mb-2.5">Saved history</h3>
            <p className="text-[#8891A0] text-sm leading-relaxed font-light">
              Every review lands on your dashboard automatically, so you can
              revisit it without pasting the code again.
            </p>
          </div>
          <div className="lg:col-span-2 bg-[#12161F]/60 border border-white/6 rounded-2xl p-8 hover:border-white/12 hover:bg-[#12161F] transition-all duration-300">
            <h3 className="font-medium text-lg mb-2.5">Any language, no config</h3>
            <p className="text-[#8891A0] text-sm leading-relaxed max-w-md font-light">
              Loupe detects the language automatically, from JavaScript and
              Python to Go and Rust — nothing to configure before you paste.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Testimonial ---------- */}
      <section id="testimonials" className="relative max-w-4xl mx-auto px-6 py-28 text-center">
        <svg viewBox="0 0 24 24" width="30" height="30" fill="#5B8DEF" className="mx-auto mb-7 opacity-30">
          <path d="M7 7c-2.2 0-4 1.8-4 4v6h6v-6H6c0-1.1.9-2 2-2V7zm10 0c-2.2 0-4 1.8-4 4v6h6v-6h-3c0-1.1.9-2 2-2V7z" />
        </svg>
        <p className="font-serif text-2xl sm:text-3xl leading-snug tracking-tight mb-9">
          I paste a snippet before every code review I run for junior
          engineers now — it catches what I&apos;d have caught anyway,
          faster, and I can pull it back up later.
        </p>
        <div className="text-sm">
          <div className="font-medium">Engineering lead</div>
          <div className="text-[#4A5568] font-light">payments platform, series B</div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="relative max-w-6xl mx-auto px-6 pb-28">
        <div className="relative rounded-2xl border border-white/[0.07] bg-[#12161F]/60 px-8 py-20 text-center overflow-hidden">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-125 rounded-full bg-blue-500/10 blur-3xl" />
          <h2 className="font-serif text-3xl sm:text-4xl tracking-tight mb-5">
            Paste your first snippet and see for yourself
          </h2>
          <p className="text-[#8891A0] max-w-md mx-auto mb-9 font-light">
            Free to start. No repo access, no install, no credit card —
            every review saved to your dashboard automatically.
          </p>
          <Link
            href="/signup"
            className="inline-block text-[13px] font-medium px-6 py-3.5 rounded-full bg-[#5B8DEF] text-[#0A0E14] hover:bg-[#7FA8F5] hover:shadow-[0_10px_34px_-8px_rgba(91,141,239,0.55)] transition-all duration-300"
          >
            Paste your first snippet
          </Link>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
     <footer className="relative border-t border-white/6 backdrop-blur-sm px-6 py-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                <div className="flex items-center gap-2.5">
                    <Link href="/"><span className="font-semibold text-2xl tracking-tight">Review Ai</span></Link>
                </div>

                <nav className="flex items-center gap-7">
                    {[{name:"Home", href: "/"}, {name:"Features", href: "#features"}, {name:"How it Works", href: "#how"}, {name:"Sign Up", href: "/signup"}].map((l) => (
                        <Link key={l.name} href={l.href} className='text-sm text-white/80'>
                            {l.name}
                        </Link>
                    ))}
                </nav>

                <p className="text-sm">© 2026 Review Ai. All rights reserved.</p>
            </div>
        </footer>
    </div>
  );
}
