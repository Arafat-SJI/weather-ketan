export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <p className="font-display text-base font-semibold">Atmos.</p>
          <p className="text-muted-foreground mt-1">Real-time environmental monitoring for a healthier planet.</p>
        </div>
        <div className="text-muted-foreground">
          <p className="text-foreground font-medium mb-2">Data sources</p>
          <p>Demo data. In production, integrate WAQI, OpenWeather, and local monitoring stations.</p>
        </div>
        <div className="text-muted-foreground">
          <p className="text-foreground font-medium mb-2">A note on accessibility</p>
          <p>All charts include text alternatives and color is paired with labels.</p>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Atmos. Built with care for clean air.
      </div>
    </footer>
  );
}
