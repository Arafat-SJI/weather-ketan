import { createFileRoute } from "@tanstack/react-router";
import { Flag, MessageSquare, Share2, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { WorldHotspotMap } from "@/components/world-hotspot-map";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community air quality — Atmos" },
      { name: "description", content: "Report local pollution sources and explore citizen-reported environmental issues on the community map." },
    ],
  }),
  component: CommunityPage,
});

const initialReports = [
  { id: 1, user: "Aisha · Delhi", text: "Heavy smoke from construction site near Connaught Place.", time: "12m ago", likes: 14, tag: "Dust" },
  { id: 2, user: "Marco · Milan", text: "Idling diesel trucks outside school zone all morning.", time: "47m ago", likes: 9, tag: "Traffic" },
  { id: 3, user: "Sara · São Paulo", text: "Illegal burning at the edge of the forest visible from highway.", time: "2h ago", likes: 31, tag: "Fire" },
  { id: 4, user: "Kenji · Tokyo", text: "Strong chemical smell near industrial zone — air feels heavy.", time: "5h ago", likes: 6, tag: "Industry" },
];

function CommunityPage() {
  const [reports, setReports] = useState(initialReports);
  const [text, setText] = useState("");
  const [tag, setTag] = useState("Traffic");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-6">
      <header>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Community</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mt-1">Citizen air watch</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">Crowdsourced pollution reports complement official monitoring stations. Together, we can paint a fuller picture of the air we breathe.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold">Community map</h2>
          <WorldHotspotMap />
        </section>

        <section className="space-y-4">
          <form
            onSubmit={(e) => { e.preventDefault(); if (!text.trim()) return; setReports([{ id: Date.now(), user: "You", text, time: "now", likes: 0, tag }, ...reports]); setText(""); }}
            className="rounded-2xl border border-border/60 bg-surface/60 p-5"
          >
            <h3 className="font-display text-lg font-semibold flex items-center gap-2"><Flag className="h-4 w-4 text-primary" /> Report pollution</h3>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What did you see, smell, or experience?" className="mt-3 w-full min-h-24 rounded-lg border border-border/80 bg-background px-3 py-2 text-sm" />
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">Tag:</span>
              {["Traffic", "Industry", "Dust", "Fire", "Odor"].map((t) => (
                <button type="button" key={t} onClick={() => setTag(t)} className={`text-xs rounded-full px-2.5 py-1 border ${tag === t ? "bg-primary text-primary-foreground border-primary" : "border-border/80 text-muted-foreground hover:text-foreground"}`}>{t}</button>
              ))}
            </div>
            <button type="submit" className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <MessageSquare className="h-4 w-4" /> Submit report
            </button>
          </form>

          <div className="rounded-2xl border border-border/60 bg-surface/60 p-5">
            <h3 className="font-display text-lg font-semibold">Recent reports</h3>
            <ul className="mt-3 space-y-3">
              {reports.map((r) => (
                <li key={r.id} className="rounded-xl bg-background/40 p-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{r.user}</span>
                    <span>{r.time}</span>
                  </div>
                  <p className="text-sm mt-1">{r.text}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] rounded-full bg-primary/15 text-primary px-2 py-0.5">{r.tag}</span>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <button onClick={() => setReports(reports.map((x) => x.id === r.id ? { ...x, likes: x.likes + 1 } : x))} className="inline-flex items-center gap-1 hover:text-foreground">
                        <ThumbsUp className="h-3.5 w-3.5" /> {r.likes}
                      </button>
                      <button className="inline-flex items-center gap-1 hover:text-foreground"><Share2 className="h-3.5 w-3.5" /> Share</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
