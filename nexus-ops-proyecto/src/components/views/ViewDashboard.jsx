// src/components/views/ViewDashboard.jsx
import { WEEKLY_BARS, DAYS_ABBR } from '../../data/constants';

export default function ViewDashboard({ addToast }) {
    return (
        <div>
            <div className="nx-grid-4">
                {[
                    { icon: "ti-calendar-check", iconColor: "#3b82f6", label: "Citas del Mes", val: "247", sub: "↑ 18% vs mes anterior", warn: false },
                    { icon: "ti-receipt", iconColor: "#22d3ee", label: "Ingresos Recuperados", val: "Q 4,820", sub: "↑ 32% por IA dinámica", warn: false },
                    { icon: "ti-shield-check", iconColor: "#10b981", label: "No-Shows Mitigados", val: "78%", sub: "↓ 14 cancelaciones hoy", warn: true },
                    { icon: "ti-cpu", iconColor: "#a78bfa", label: "Espacios por IA", val: "31", sub: "Esta semana optimizados", warn: false },
                ].map((k) => (
                    <div className="nx-card" key={k.label}>
                        <div className="nx-kpi-label">
                            <i className={`ti ${k.icon}`} style={{ fontSize: 14, color: k.iconColor }} />
                            {k.label}
                        </div>
                        <div className="nx-kpi-val">{k.val}</div>
                        <div className={`nx-kpi-sub${k.warn ? " warn" : ""}`}>{k.sub}</div>
                    </div>
                ))}
            </div>

            <div className="nx-grid-2">
                <div className="nx-card">
                    <div className="nx-section-title">
                        <i className="ti ti-chart-bar" style={{ fontSize: 16, color: "#3b82f6" }} />
                        Afluencia Semanal
                    </div>
                    <div className="nx-bar-wrap">
                        {WEEKLY_BARS.map((b, i) => (
                            <div className="nx-bar-col" key={i}>
                                <div className="nx-bar" style={{ height: `${b.h}%`, background: b.c }} />
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                        {DAYS_ABBR.map((d) => (
                            <div key={d} style={{ flex: 1, textAlign: "center", fontSize: 9, color: "#475569" }}>{d}</div>
                        ))}
                    </div>
                </div>

                <div className="nx-card">
                    <div className="nx-section-title">
                        <i className="ti ti-clock" style={{ fontSize: 16, color: "#22d3ee" }} />
                        Próximas Citas del Día
                    </div>
                    {[
                        { time: "09:00", name: "Carlos M.", svc: "Corte + Barba · Juan", status: "Completada", cls: "s-done" },
                        { time: "10:30", name: "Roberto A.", svc: "Corte · Pedro", status: "Pendiente", cls: "s-pend" },
                        { time: "11:00", name: "Luis G.", svc: "Barba · Juan", status: "Cancelada", cls: "s-canc" },
                        { time: "14:00", name: "Marco R.", svc: "Corte + Barba · Ana", status: "Pendiente", cls: "s-pend" },
                    ].map((a) => (
                        <div className="nx-appt-item" key={a.time + a.name}>
                            <div className="nx-appt-time">{a.time}</div>
                            <div>
                                <div className="nx-appt-name">{a.name}</div>
                                <div className="nx-appt-svc">{a.svc}</div>
                            </div>
                            <span className={`nx-status ${a.cls}`}>{a.status}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="nx-card">
                <div className="nx-section-title" style={{ marginBottom: 8 }}>
                    <i className="ti ti-activity" style={{ fontSize: 16, color: "#f59e0b" }} />
                    Alertas IA del Sistema
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div className="nx-alert">
                        <i className="ti ti-bolt" style={{ fontSize: 16 }} />
                        Promoción activada: 15% dto. aplicado a 3 slots vacíos entre 08:00–10:00
                    </div>
                    <div style={{ background: "#2d1b00", border: "0.5px solid #f59e0b", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "#fcd34d" }}>
                        <i className="ti ti-user-x" style={{ fontSize: 16 }} />
                        Juan R. canceló 11:30 AM · Lista de espera notificada automáticamente
                    </div>
                </div>
            </div>
        </div>
    );
}