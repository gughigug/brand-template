"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Menu,
  X,
  Sparkles,
  Layers,
  MonitorSmartphone,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // ✅ non "weights"
});

gsap.registerPlugin(ScrollTrigger);

export default function BrandLaunchShell() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  useEffect(() => {
    if (!rootRef.current) return;

    // userò questo per staccare i listener delle tilt-card
    const tiltHandlers: {
      card: HTMLElement;
      onMove: (e: MouseEvent) => void;
      onLeave: () => void;
    }[] = [];

    const ctx = gsap.context(() => {
      // Titolo hero “lettera per lettera”
      const titleEl = document.querySelector(".hero-title");
      if (titleEl && titleEl.textContent) {
        const text = titleEl.textContent;
        titleEl.textContent = "";
        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.display = "inline-block";
          span.style.marginRight = char === " " ? "0.25rem" : "0.08rem";
          titleEl.appendChild(span);
        });

        gsap.fromTo(
          ".hero-title span",
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.035,
          }
        );
      }

      // Hero visual 3D, scrolloso
      gsap.fromTo(
        ".hero-visual",
        {
          opacity: 0,
          y: 80,
          scale: 0.85,
          rotateX: -18,
          rotateY: 12,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".hero-visual",
            start: "top 80%",
            end: "bottom 40%",
            scrub: true,
          },
        }
      );

      // Sezioni che appaiono su scroll
      gsap.utils
        .toArray<HTMLElement>(".reveal-section")
        .forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 40%",
                scrub: true,
              },
            }
          );
        });

      // Immagini device / platform con effetto 3D parallax
      gsap.utils
        .toArray<HTMLElement>(".device-visual")
        .forEach((el, i) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y: 100,
              rotateX: 24,
              rotateY: i % 2 === 0 ? -18 : 18,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "bottom 40%",
                scrub: true,
              },
            }
          );
        });

      // Tilt su hover per le card
      const tiltCards = gsap.utils.toArray<HTMLElement>(".tilt-card");
      tiltCards.forEach((card) => {
        const inner = card.querySelector(".tilt-inner") as HTMLElement | null;
        if (!inner) return;

        card.style.perspective = "1000px";

        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -12;
          const rotateY = ((x - centerX) / centerX) * 12;

          gsap.to(inner, {
            rotateX,
            rotateY,
            scale: 1.03,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const onLeave = () => {
          gsap.to(inner, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
          });
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);

        tiltHandlers.push({ card, onMove, onLeave });
      });
    }, rootRef);

    return () => {
      ctx.revert();
      // pulizia listener tilt (non indispensabile per la build, ma fatta bene)
      tiltHandlers.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className={`${spaceGrotesk.className} min-h-screen bg-[#020617] text-slate-50 antialiased overflow-x-hidden`}
    >
      {/* Gradient globale */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#22d3ee22,_transparent_55%),radial-gradient(circle_at_bottom,_#a855f722,_transparent_55%)]" />

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-40 border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo + shell meta */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 shadow-lg flex items-center justify-center text-[11px] font-semibold">
              BL
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-xs font-semibold tracking-wide">
                Brand Launch Shell
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                guglielmogiannattasio.exe · v01
              </span>
            </div>
          </div>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button
              onClick={() => scrollToId("overview")}
              className="hover:text-cyan-300 transition-colors"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToId("product")}
              className="hover:text-cyan-300 transition-colors"
            >
              Product
            </button>
            <button
              onClick={() => scrollToId("platform")}
              className="hover:text-cyan-300 transition-colors"
            >
              Platform
            </button>
            <button
              onClick={() => scrollToId("gallery")}
              className="hover:text-cyan-300 transition-colors"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToId("cta")}
              className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-4 py-1.5 text-xs font-semibold shadow-md hover:shadow-lg hover:brightness-110 transition-all"
            >
              <Rocket size={14} />
              <span>Launch</span>
            </button>
          </nav>

          {/* Mobile nav */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-md hover:bg-white/10"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center gap-6 text-lg">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-md hover:bg-white/10"
          >
            <X size={26} />
          </button>
          <button onClick={() => scrollToId("overview")}>Overview</button>
          <button onClick={() => scrollToId("product")}>Product</button>
          <button onClick={() => scrollToId("platform")}>Platform</button>
          <button onClick={() => scrollToId("gallery")}>Gallery</button>
          <button
            onClick={() => scrollToId("cta")}
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-6 py-2 text-sm font-semibold shadow-lg"
          >
            <Rocket size={16} />
            <span>Launch</span>
          </button>
        </div>
      )}

      {/* MAIN */}
      <main className="pt-20 md:pt-24">
        {/* HERO / OVERVIEW */}
        <section
          id="overview"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center"
        >
          {/* Testo */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <Sparkles size={14} className="text-cyan-300" />
              <span className="text-[10px] uppercase tracking-[0.22em] text-slate-300">
                multi-product launch shell
              </span>
            </div>

            <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
              <span className="block">Launch-any-product</span>
              <span className="block text-slate-300">
                -with-one-cinematic--layout.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl">
              Hero, device shots, platform glimpse e sezione gallery in un’unica
              struttura. Cambi brand, immagini e contenuti: il telaio resta
              lo stesso, liquido e touch-first.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => scrollToId("product")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-5 py-3 text-sm font-semibold shadow-lg hover:brightness-110 hover:shadow-[0_0_40px_#22d3ee44] transition-all"
              >
                <MonitorSmartphone size={18} />
                <span>See product section</span>
              </button>
              <button
                onClick={() => scrollToId("platform")}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition-colors"
              >
                Layout details
              </button>
            </div>

            <div className="flex flex-wrap gap-3 pt-3 text-[11px] text-slate-400">
              <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1">
                Palette neon teal / violet
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1">
                GSAP scroll-based 3D
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1">
                React · Framer Motion
              </span>
            </div>
          </div>

          {/* Visual */}
          <div className="hero-visual relative w-full max-w-xl mx-auto">
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_top,_#22d3ee55,_transparent_60%),radial-gradient(circle_at_bottom,_#a855f755,_transparent_60%)] opacity-70 blur-3xl" />
            <div className="relative rounded-[32px] border border-white/15 bg-gradient-to-b from-slate-900/80 via-black/80 to-slate-950/90 shadow-[0_0_60px_#22d3ee33] overflow-hidden">
              <div className="relative aspect-[16/10] flex items-center justify-center">
                <img
                  src="/brand-shell/core.png"
                  alt="Core product visual"
                  className="w-full h-full object-cover object-center"
                />

                <div className="absolute top-4 left-4 rounded-full bg-black/60 border border-white/15 px-3 py-1 text-[11px] flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live prototype ready</span>
                </div>

                <div className="absolute bottom-4 right-4 rounded-full bg-black/60 border border-white/15 px-3 py-1 text-[11px] flex items-center gap-1">
                  <Layers size={14} className="text-cyan-300" />
                  <span>Brand-agnostic shell</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT SECTION */}
        <section
          id="product"
          className="reveal-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20"
        >
          <div className="flex flex-col gap-3 mb-8">
            <h2 className="text-2xl font-semibold">Hero + device pairing</h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Una sezione pensata per raccontare un oggetto fisico, un
              servizio, o una suite digitale: due blocchi simmetrici, ognuno
              con visual 3D e copy dedicato.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
            {/* Device visual */}
            <div className="device-visual relative rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900/80 via-black/80 to-slate-950/90 shadow-xl overflow-hidden">
              <div className="absolute -inset-16 bg-[radial-gradient(circle_at_top,_#22d3ee33,_transparent_60%),radial-gradient(circle_at_bottom,_#a855f733,_transparent_60%)] opacity-70 blur-2xl" />
              <div className="relative p-5 sm:p-6 lg:p-7 space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  primary device view
                </p>
                <p className="text-sm text-slate-300 max-w-sm">
                  Perfetta per laptop, smartphone, wearable, ma anche per un
                  mockup di dashboard. L’immagine è gestita come semplice
                  asset, la struttura resta.
                </p>
                <div className="mt-2 rounded-2xl overflow-hidden border border-white/15 bg-black/80">
                  <img
                    src="/brand-shell/device.png"
                    alt="Device visual"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Platform visual */}
            <div className="device-visual relative rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900/80 via-black/80 to-slate-950/90 shadow-xl overflow-hidden">
              <div className="absolute -inset-16 bg-[radial-gradient(circle_at_top,_#a855f733,_transparent_60%),radial-gradient(circle_at_bottom,_#22d3ee33,_transparent_60%)] opacity-70 blur-2xl" />
              <div className="relative p-5 sm:p-6 lg:p-7 space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  platform / ui layer
                </p>
                <p className="text-sm text-slate-300 max-w-sm">
                  Un colpo d’occhio sul software: pannelli floating,
                  dashboard, dati. Puoi mostrare un SaaS, un backend o una
                  semplice webapp.
                </p>
                <div className="mt-2 rounded-2xl overflow-hidden border border-white/15 bg-black/80">
                  <img
                    src="/brand-shell/hud.png"
                    alt="Platform UI visual"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SHELL EXPLAINER */}
        <section
          id="platform"
          className="reveal-section border-y border-white/10 bg-black/60"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16 grid md:grid-cols-[1.4fr,1fr] gap-10 items-start">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                brand launch shell · multi-brand ready
              </p>
              <h2 className="text-2xl font-semibold">
                Una shell, infiniti brand.
              </h2>
              <p className="text-sm text-slate-300 max-w-xl">
                Questo non è un sito finito ma un layout neutro: ci incolli
                il tuo logo, cambi palette, testi, immagini e lo agganci a un
                CMS o a una piattaforma reale. Il resto è già pronto.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>
                    Hero fullscreen con parallax 3D e CTA doppia per
                    prodotto / piattaforma.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                  <span>
                    Sezione device + UI riusabile per hardware, servizi o
                    esperienze ibride.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>
                    Gallery interattiva per prodotti, feature, case study o
                    piani tariffari.
                  </span>
                </li>
              </ul>
            </div>

            <div className="tilt-card">
              <div className="tilt-inner relative rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900/80 via-black/90 to-slate-950/90 p-5 sm:p-6 shadow-xl overflow-hidden">
                <div className="absolute -inset-16 bg-[radial-gradient(circle_at_top,_#22d3ee33,_transparent_60%),radial-gradient(circle_at_bottom,_#a855f733,_transparent_60%)] opacity-70 blur-2xl" />
                <div className="relative space-y-4 text-sm">
                  <div className="inline-flex items-center gap-2 rounded-full bg-black/50 border border-white/15 px-3 py-1 text-[11px]">
                    <Layers size={14} className="text-cyan-300" />
                    <span>Multi-brand ready</span>
                  </div>
                  <p className="text-slate-200">
                    La UI è logic-agnostic: non assume nulla su business,
                    integrazioni, dominio. È solo un telaio pensato per
                    product designer e dev.
                  </p>
                  <p className="text-slate-400 text-xs">
                  
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY / CARDS */}
        <section
          id="gallery"
          className="reveal-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20"
        >
          <div className="flex flex-col gap-3 mb-8">
            <h2 className="text-2xl font-semibold">Gallery modulare</h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Quattro slot che possono diventare prodotti, feature,
              storytelling o piani. Ogni card è animata, con hover tilt e
              overlay neon.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Core system",
                img: "/brand-shell/core.png",
              },
              {
                label: "Device lineup",
                img: "/brand-shell/device.png",
              },
              {
                label: "Control center",
                img: "/brand-shell/hud.png",
              },
              {
                label: "Custom slot",
                img: "/brand-shell/stack.png",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="tilt-card group rounded-2xl border border-white/15 bg-black/70 overflow-hidden cursor-pointer"
              >
                <div className="tilt-inner relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.label}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-3 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-100">
                      {item.label}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-cyan-300 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          id="cta"
          className="reveal-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20"
        >
          <div className="rounded-3xl border border-white/15 bg-gradient-to-r from-slate-900/90 via-black/90 to-slate-900/90 px-6 py-10 sm:px-10 sm:py-12 flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                ready to plug a real brand
              </p>
              <h2 className="text-2xl font-semibold">
                Aggancia il tuo logo, le tue immagini e vai online.
              </h2>
              <p className="text-sm text-slate-300 max-w-xl">
                Questo template è pensato per presentazioni di prodotti tech,
                piattaforme SaaS, device, videogiochi, app mobile. Tu porti la
                storia: il telaio visivo è già qui.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-6 py-3 text-sm font-semibold shadow-lg hover:brightness-110 hover:shadow-[0_0_40px_#a855f777] transition-all">
                <Rocket size={18} />
                <span>Usa questa shell nel tuo progetto</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400">
          <div>
            © {new Date().getFullYear()} guglielmogiannattasio.exe — brand
            launch shell v01
          </div>
          <div className="text-slate-500">
            Demo UI. Naming, logiche e contenuti sono sostituibili per
            progetto.
          </div>
        </div>
      </footer>
    </div>
  );
}