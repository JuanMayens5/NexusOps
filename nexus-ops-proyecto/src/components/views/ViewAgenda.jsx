import { CALENDAR_DATA } from "../../data/constants";

export default function ViewAgenda() {
    const calDays = ["Lun 26", "Mar 27", "Mié 28", "Jue 29", "Vie 30"];
    const hourRows = ["08:00", "09:00", "10:00", "11:00", "12:00"];
    return (
        <div>
            <div style={{ background: "#1e293b", border: "0.5px solid #334155", borderRadius: 10, overflow: "hidden" }}>
                <div className="cal-grid">
                    <div className="cal-head" style={{ borderRight: "0.5px solid #334155" }}>Hora</div>
                    {calDays.map((d) => (
                        <div className="cal-head" key={d}>{d}</div>
                    ))}
                    {hourRows.map((hr) => {
                        const eventsInRow = CALENDAR_DATA[hr] || [];
                        return [
                            <div className="cal-time" key={`t-${hr}`}>{hr}</div>,
                            ...Array.from({ length: 5 }, (_, di) => {
                                const ev = eventsInRow.find((e) => e.day === di);
                                return (
                                    <div className="cal-cell" key={`${hr}-${di}`}>
                                        {ev && (
                                            <div className={`cal-event ${ev.color}`}>
                                                {ev.name}<br />
                                                <span style={{ fontWeight: 400, opacity: 0.8 }}>{ev.svc}</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            }),
                        ];
                    })}
                </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                {[
                    { label: "Juan", bg: "#1e3a8a", border: "#3b82f6", color: "#93c5fd" },
                    { label: "Pedro", bg: "#064e3b", border: "#10b981", color: "#6ee7b7" },
                    { label: "Ana", bg: "#451a03", border: "#f59e0b", color: "#fcd34d" },
                    { label: "María", bg: "#2e1065", border: "#8b5cf6", color: "#c4b5fd" },
                ].map((l) => (
                    <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: l.color }}>
                        <span style={{ width: 10, height: 10, background: l.bg, borderLeft: `3px solid ${l.border}`, display: "inline-block", borderRadius: 2 }} />
                        {l.label}
                    </div>
                ))}
            </div>
        </div>
    );
}