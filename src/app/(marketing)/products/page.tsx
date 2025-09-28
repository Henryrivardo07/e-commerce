import { ModeToggle } from "@/components/mode-toggle";

export default function Page() {
  return (
    <section className="custom-container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1
          className="font-semibold"
          style={{
            fontSize: "var(--text-display-2xl)",
            lineHeight: "var(--text-display-2xl--line-height)",
            color: "rgb(var(--fg))",
          }}
        >
          Catalog
        </h1>
        <ModeToggle />
      </div>

      <div
        className="rounded-2xl border p-6"
        style={{
          borderColor: "rgb(var(--border))",
          background: "rgb(var(--bg))",
        }}
      >
        <p
          className="font-regular"
          style={{
            fontSize: "var(--text-md)",
            lineHeight: "var(--text-md--line-height)",
            color: "rgb(var(--muted))",
          }}
        >
          Dark mode ready 🎉
        </p>
      </div>
    </section>
  );
}
