import { Suspense, lazy, useEffect, useRef, useState } from "react";
import PageTransition from "../components/ui/PageTransition";
import Navbar from "../components/ui/Navbar";
import Hero from "../components/Hero";

const Problem = lazy(() => import("../sections/Problem"));
const Solution = lazy(() => import("../sections/Solution"));
const Features = lazy(() => import("../sections/Features"));
const Workflow = lazy(() => import("../sections/Workflow"));
const TechnologyStack = lazy(() => import("../sections/TechnologyStack"));
const Dashboard = lazy(() => import("../sections/Dashboard"));
const CallToAction = lazy(() => import("../sections/CallToAction"));

/** Cinematic divider — a glowing seam that breathes between story beats. */
function SceneDivider() {
  return (
    <div className="relative z-10 py-8 md:py-10" aria-hidden>
      <div className="section-divider" />
    </div>
  );
}

const sectionFallback = <div className="min-h-[32rem]" aria-hidden="true" />;

function DeferredSection({ children }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || visible) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <section ref={sectionRef} className="relative min-h-[32rem]" data-snap>
      {visible ? <Suspense fallback={sectionFallback}>{children}</Suspense> : sectionFallback}
      <SceneDivider />
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main id="main" className="relative overflow-hidden">
          {/* Hero loads immediately (first paint) */}
          <Hero />

          {/* Remaining sections lazy-loaded, joined by cinematic seams */}
          <DeferredSection><Problem /></DeferredSection>
          <DeferredSection><Solution /></DeferredSection>
          <DeferredSection><Features /></DeferredSection>
          <DeferredSection><Workflow /></DeferredSection>
          <DeferredSection><TechnologyStack /></DeferredSection>
          <DeferredSection><Dashboard /></DeferredSection>
          <DeferredSection><CallToAction /></DeferredSection>
        </main>
      </PageTransition>
    </>
  );
}

