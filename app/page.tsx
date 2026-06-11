import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Activity } from "@/components/activity";
import { Pillars } from "@/components/pillars";
import { Projects } from "@/components/projects";
import { Achievements } from "@/components/achievements";
import { Contact } from "@/components/contact";
import { Cursor } from "@/components/cursor";
import { ConsoleSig } from "@/components/telemetry";

export default function Home() {
  return (
    <>
      <ConsoleSig />
      <Cursor />
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Activity />
        <Pillars />
        <Projects />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}
