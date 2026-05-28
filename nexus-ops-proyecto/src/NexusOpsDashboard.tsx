import { useState, useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────
const VIEWS = ["dashboard", "agenda", "precios", "espera", "clientes", "planes"];
const TITLES = {
    dashboard: "Dashboard Principal",
    agenda: "Agenda / Calendario",
    precios: "Motor de Precios Dinámicos",
    espera: "Lista de Espera Inteligente",
    clientes: "Clientes",
    planes: "Planes & Suscripción",
};

const WEEKLY_BARS = [
    { h: 65, c: "#1d4ed8" }, { h: 30, c: "#475569" }, { h: 80, c: "#1d4ed8" },
    { h: 70, c: "#1d4ed8" }, { h: 90, c: "#2563eb" }, { h: 95, c: "#3b82f6" }, { h: 40, c: "#334155" },
];
const DAYS_ABBR = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
const AFFLUENCE = [15, 20, 30, 75, 90, 85, 80];

const CALENDAR_DATA = {
    "08:00": [
        { day: 0, name: "Carlos M.", svc: "Corte+Barba", color: "ev-blue" },
        { day: 2, name: "Sofía R.", svc: "Facial", color: "ev-teal" },
        { day: 4, name: "Pedro V.", svc: "Corte", color: "ev-amber" },
    ],
    "09:00": [
        { day: 1, name: "Roberto A.", svc: "Corte", color: "ev-purple" },
        { day: 3, name: "María G.", svc: "Tinte", color: "ev-blue" },
    ],
    "10:00": [
        { day: 0, name: "Luis G.", svc: "Barba", color: "ev-teal" },
        { day: 2, name: "Jorge F.", svc: "Corte", color: "ev-amber" },
        { day: 4, name: "Ana M.", svc: "Corte+Barba", color: "ev-purple" },
    ],
    "11:00": [
        { day: 1, name: "Marco R.", svc: "Corte+Barba", color: "ev-blue" },
        { day: 3, name: "David L.", svc: "Barba", color: "ev-teal" },
    ],
    "12:00": [
        { day: 0, name: "Rosa H.", svc: "Tinte", color: "ev-amber" },
        { day: 3, name: "Carlos N.", svc: "Corte", color: "ev-blue" },
    ],
};

const WAIT_LIST_INITIAL = [
    { id: 1, name: "Diego Morales", svc: "Corte + Barba · Esperando desde 09:15", status: "En Espera", top: true },
    { id: 2, name: "Fernando López", svc: "Corte · Esperando desde 09:40", status: "En Espera", top: false },
    { id: 3, name: "Pablo Xicará", svc: "Barba · Esperando desde 10:05", status: "En Espera", top: false },
];

const CLIENTS = [
    { initials: "CM", name: "Carlos M.", visits: 12, revenue: "Q1,440", badge: "VIP", badgeClass: "s-done", bg: "#1e3a8a", color: "#93c5fd" },
    { initials: "RA", name: "Roberto A.", visits: 8, revenue: "Q720", badge: "Regular", badgeClass: "s-pend", bg: "#2e1065", color: "#c4b5fd" },
    { initials: "LG", name: "Luis G.", visits: 5, revenue: "Q450", badge: "Regular", badgeClass: "s-pend", bg: "#064e3b", color: "#6ee7b7" },
    { initials: "MR", name: "Marco R.", visits: 3, revenue: "Q270", badge: "Inactivo", badgeClass: "s-canc", bg: "#451a03", color: "#fcd34d" },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.10.0/dist/tabler-icons.min.css');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  .nx-root { font-family: 'DM Sans', sans-serif; }
  .nx-wrap { display: flex; height: 680px; background: #0f172a; border-radius: 14px; overflow: hidden; border: 0.5px solid #1e293b; position: relative; }

  /* Sidebar */
  .nx-sidebar { width: 220px; min-width: 220px; background: #0a1120; border-right: 0.5px solid #1e293b; display: flex; flex-direction: column; }
  .nx-logo { padding: 20px 16px 16px; border-bottom: 0.5px solid #1e293b; }
  .nx-logo-inner { display: flex; align-items: center; gap: 10px; }
  .nx-logo-icon { width: 34px; height: 34px; background: #1d4ed8; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .nx-logo-text { font-size: 15px; font-weight: 600; color: #f1f5f9; letter-spacing: -0.3px; }
  .nx-logo-sub { font-size: 10px; color: #64748b; margin-top: 1px; }
  .nx-nav { flex: 1; padding: 12px 8px; overflow-y: auto; }
  .nx-nav-label { font-size: 10px; color: #475569; font-weight: 500; letter-spacing: 0.8px; padding: 4px 8px 6px; text-transform: uppercase; }
  .nx-nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 8px; cursor: pointer; margin-bottom: 2px; transition: all 0.15s; color: #94a3b8; font-size: 13px; user-select: none; }
  .nx-nav-item:hover { background: #1e293b; color: #e2e8f0; }
  .nx-nav-item.active { background: #1e3a8a; color: #93c5fd; }
  .nx-nav-item i { font-size: 17px; width: 18px; }
  .nx-badge { margin-left: auto; background: #1d4ed8; color: #bfdbfe; font-size: 10px; padding: 2px 7px; border-radius: 20px; font-weight: 500; }
  .nx-user { padding: 12px 16px; border-top: 0.5px solid #1e293b; }
  .nx-user-inner { display: flex; align-items: center; gap: 10px; }
  .nx-avatar { width: 32px; height: 32px; border-radius: 50%; background: #1e3a8a; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 500; color: #93c5fd; }
  .nx-user-name { font-size: 12px; color: #e2e8f0; font-weight: 500; }
  .nx-user-role { font-size: 11px; color: #64748b; }

  /* Main */
  .nx-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #0f172a; }
  .nx-topbar { padding: 16px 20px; border-bottom: 0.5px solid #1e293b; display: flex; align-items: center; justify-content: space-between; background: #0a1120; }
  .nx-topbar-title { font-size: 16px; font-weight: 600; color: #f1f5f9; }
  .nx-topbar-sub { font-size: 12px; color: #64748b; margin-top: 2px; }
  .nx-topbar-actions { display: flex; gap: 8px; align-items: center; }
  .nx-btn { padding: 7px 14px; border-radius: 8px; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.15s; border: none; display: flex; align-items: center; gap: 6px; font-family: 'DM Sans', sans-serif; }
  .nx-btn-primary { background: #1d4ed8; color: #fff; }
  .nx-btn-primary:hover { background: #2563eb; }
  .nx-btn-ghost { background: transparent; color: #94a3b8; border: 0.5px solid #334155; }
  .nx-btn-ghost:hover { background: #1e293b; color: #e2e8f0; }
  .nx-content { flex: 1; overflow-y: auto; padding: 20px; }
  .nx-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
  .nx-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
  .nx-card { background: #1e293b; border-radius: 10px; border: 0.5px solid #334155; padding: 16px; }
  .nx-kpi-label { font-size: 11px; color: #64748b; font-weight: 500; letter-spacing: 0.3px; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }
  .nx-kpi-val { font-size: 22px; font-weight: 600; color: #f1f5f9; margin-bottom: 4px; font-family: 'Space Mono', monospace; }
  .nx-kpi-sub { font-size: 11px; color: #22d3ee; }
  .nx-kpi-sub.warn { color: #f97316; }
  .nx-section-title { font-size: 13px; font-weight: 500; color: #e2e8f0; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
  .nx-bar-wrap { display: flex; align-items: flex-end; gap: 6px; height: 80px; }
  .nx-bar-col { display: flex; flex-direction: column; align-items: center; flex: 1; }
  .nx-bar { border-radius: 4px 4px 0 0; width: 100%; min-height: 4px; }
  .nx-appt-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 0.5px solid #334155; }
  .nx-appt-item:last-child { border-bottom: none; }
  .nx-appt-time { font-size: 11px; color: #64748b; width: 38px; text-align: right; font-family: 'Space Mono', monospace; }
  .nx-appt-name { font-size: 12px; color: #e2e8f0; font-weight: 500; }
  .nx-appt-svc { font-size: 11px; color: #64748b; }
  .nx-status { font-size: 10px; padding: 3px 8px; border-radius: 20px; font-weight: 500; margin-left: auto; white-space: nowrap; }
  .s-done { background: #064e3b; color: #6ee7b7; }
  .s-pend { background: #1e3a8a; color: #93c5fd; }
  .s-canc { background: #450a0a; color: #fca5a5; }
  .s-asig { background: #064e3b; color: #6ee7b7; }
  .nx-alert { background: #1e3a8a; border: 0.5px solid #3b82f6; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; font-size: 12px; color: #93c5fd; }
  .reassign-banner { background: #064e3b; border: 0.5px solid #059669; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; font-size: 12px; color: #6ee7b7; }

  /* Calendar */
  .cal-grid { display: grid; grid-template-columns: 50px repeat(5, 1fr); gap: 0; }
  .cal-head { background: #0f172a; font-size: 11px; color: #64748b; padding: 6px 4px; text-align: center; border-bottom: 0.5px solid #334155; font-weight: 500; border-right: 0.5px solid #334155; }
  .cal-time { font-size: 10px; color: #475569; padding: 4px 6px; text-align: right; border-right: 0.5px solid #1e293b; height: 44px; display: flex; align-items: flex-start; justify-content: flex-end; font-family: 'Space Mono', monospace; }
  .cal-cell { border-right: 0.5px solid #1e293b; border-bottom: 0.5px solid #1e293b; height: 44px; padding: 3px; }
  .cal-event { border-radius: 5px; padding: 3px 5px; font-size: 10px; font-weight: 500; height: 38px; display: flex; flex-direction: column; justify-content: center; cursor: pointer; }
  .ev-blue { background: #1e3a8a; color: #93c5fd; border-left: 3px solid #3b82f6; }
  .ev-teal { background: #064e3b; color: #6ee7b7; border-left: 3px solid #10b981; }
  .ev-amber { background: #451a03; color: #fcd34d; border-left: 3px solid #f59e0b; }
  .ev-purple { background: #2e1065; color: #c4b5fd; border-left: 3px solid #8b5cf6; }

  /* Toggle */
  .toggle-wrap { display: flex; align-items: center; gap: 12px; }
  .toggle-track { width: 44px; height: 24px; border-radius: 12px; cursor: pointer; position: relative; transition: background 0.2s; flex-shrink: 0; }
  .toggle-dot { width: 18px; height: 18px; background: #fff; border-radius: 50%; position: absolute; top: 3px; transition: transform 0.2s; }

  /* Plans */
  .plan-card { background: #1e293b; border: 0.5px solid #334155; border-radius: 10px; padding: 18px; flex: 1; }
  .plan-card.featured { border: 1.5px solid #3b82f6; position: relative; }
  .plan-badge { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #1d4ed8; color: #bfdbfe; font-size: 10px; padding: 3px 12px; border-radius: 20px; white-space: nowrap; font-weight: 500; }
  .plan-price { font-size: 24px; font-weight: 600; color: #f1f5f9; margin-bottom: 2px; font-family: 'Space Mono', monospace; }
  .plan-period { font-size: 11px; color: #64748b; }
  .plan-feat { font-size: 11px; color: #94a3b8; margin-top: 8px; display: flex; flex-direction: column; gap: 4px; }
  .plan-feat span { display: flex; align-items: center; gap: 6px; }
  .plan-btn { width: 100%; margin-top: 14px; padding: 8px; border-radius: 8px; font-size: 12px; font-weight: 500; cursor: pointer; border: none; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
  .pb-default { background: #1e293b; color: #94a3b8; border: 0.5px solid #334155; }
  .pb-default:hover { background: #334155; }
  .pb-featured { background: #1d4ed8; color: #fff; }
  .pb-featured:hover { background: #2563eb; }

  /* Modal */
  .modal-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.75); display: flex; align-items: center; justify-content: center; z-index: 100; border-radius: 14px; }
  .modal-box { background: #1e293b; border: 0.5px solid #334155; border-radius: 12px; padding: 24px; width: 340px; }
  .modal-title { font-size: 15px; font-weight: 600; color: #f1f5f9; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; }
  .modal-field { margin-bottom: 12px; }
  .modal-label { font-size: 11px; color: #64748b; margin-bottom: 4px; }
  .modal-input { width: 100%; background: #0f172a; border: 0.5px solid #334155; border-radius: 8px; padding: 8px 10px; color: #e2e8f0; font-size: 13px; outline: none; font-family: 'DM Sans', sans-serif; }
  .modal-input:focus { border-color: #3b82f6; }

  /* Wait */
  .wait-row { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 0.5px solid #334155; }
  .wait-row:last-child { border-bottom: none; }
  .wait-pos { width: 24px; height: 24px; border-radius: 50%; background: #1e293b; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 500; color: #64748b; flex-shrink: 0; }
  .wait-pos.top { background: #1e3a8a; color: #93c5fd; }

  /* Toast */
  .toast-item { background: #064e3b; border: 0.5px solid #059669; border-radius: 8px; padding: 10px 14px; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; font-size: 12px; color: #6ee7b7; animation: slideIn 0.25s ease; }
  @keyframes slideIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }

  /* Scrollbar */
  .nx-content::-webkit-scrollbar { width: 5px; }
  .nx-content::-webkit-scrollbar-track { background: transparent; }
  .nx-content::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
`;

// ─── Toast ────────────────────────────────────────────────────────────────────
function useToasts() {
    const [toasts, setToasts] = useState([]);
    const addToast = (msg) => {
        const id = Date.now();
        setToasts((p) => [...p, { id, msg }]);
        setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
    };
    return { toasts, addToast };
}

// ─── Views ────────────────────────────────────────────────────────────────────
function ViewDashboard({ addToast }) {
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

function ViewAgenda() {
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

function ViewPrecios() {
    const [promoOn, setPromoOn] = useState(true);
    const [discount, setDiscount] = useState(15);
    const est = Math.round(3 * 85 * (1 - discount / 100));

    return (
        <div>
            <div className="nx-alert" style={{ marginBottom: 16 }}>
                <i className="ti ti-cpu" style={{ fontSize: 18 }} />
                Motor de IA detectó baja afluencia: Martes 08:00–11:00 · 3 slots disponibles sin reserva
            </div>
            <div className="nx-grid-2">
                <div className="nx-card">
                    <div className="nx-section-title">
                        <i className="ti ti-chart-area" style={{ fontSize: 16, color: "#3b82f6" }} />
                        Afluencia por Hora (Hoy)
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                        {HOURS.map((h, i) => {
                            const afl = AFFLUENCE[i];
                            const barColor = afl < 35 ? "#334155" : afl < 60 ? "#1e3a8a" : "#1d4ed8";
                            const valColor = afl < 35 ? "#f97316" : "#93c5fd";
                            return (
                                <div key={h} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <span style={{ fontSize: 11, color: "#64748b", width: 38, fontFamily: "Space Mono, monospace" }}>{h}</span>
                                    <div style={{ flex: 1, height: 14, borderRadius: 4, background: barColor, width: `${afl}%`, maxWidth: "100%" }} />
                                    <span style={{ fontSize: 11, fontWeight: 500, width: 28, textAlign: "right", color: valColor }}>{afl}%</span>
                                    {afl < 35 && (
                                        <span style={{ fontSize: 10, background: "#1e3a8a", color: "#93c5fd", padding: "2px 6px", borderRadius: 20 }}>⚡ Promo</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="nx-card">
                    <div className="nx-section-title">
                        <i className="ti ti-settings-automation" style={{ fontSize: 16, color: "#a78bfa" }} />
                        Configuración Automática
                    </div>

                    <div style={{ background: "#0f172a", borderRadius: 8, padding: 14, marginBottom: 12 }}>
                        <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8, fontWeight: 500 }}>ACTIVAR PROMOCIÓN IA</div>
                        <div className="toggle-wrap">
                            <div
                                className="toggle-track"
                                style={{ background: promoOn ? "#1d4ed8" : "#334155" }}
                                onClick={() => setPromoOn((p) => !p)}
                                role="switch"
                                aria-checked={promoOn}
                            >
                                <div className="toggle-dot" style={{ transform: promoOn ? "translateX(20px)" : "translateX(0)" }} />
                            </div>
                            <span style={{ fontSize: 13, color: "#e2e8f0" }}>
                                {promoOn ? "Activo — IA gestionando precios" : "Inactivo — precios manuales"}
                            </span>
                        </div>
                    </div>

                    <div style={{ background: "#0f172a", borderRadius: 8, padding: 14, marginBottom: 12 }}>
                        <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6, fontWeight: 500 }}>DESCUENTO EN HORAS MUERTAS</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <input
                                type="range" min={5} max={40} value={discount} step={5}
                                onChange={(e) => setDiscount(Number(e.target.value))}
                                style={{ flex: 1 }}
                            />
                            <span style={{ fontSize: 20, fontWeight: 500, color: "#f1f5f9", minWidth: 44, textAlign: "right", fontFamily: "Space Mono, monospace" }}>{discount}%</span>
                        </div>
                    </div>

                    <div style={{ background: "#0f172a", borderRadius: 8, padding: 14 }}>
                        <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6, fontWeight: 500 }}>HORARIO DE APLICACIÓN</div>
                        <div style={{ display: "flex", gap: 6 }}>
                            {[["Inicio", "08:00"], ["Fin", "11:00"]].map(([lbl, val], i) => (
                                <div key={lbl} style={{ flex: 1, background: "#1e293b", borderRadius: 6, padding: 8, textAlign: "center" }}>
                                    <div style={{ fontSize: 10, color: "#64748b" }}>{lbl}</div>
                                    <div style={{ fontSize: 14, fontWeight: 500, color: "#93c5fd", fontFamily: "Space Mono, monospace" }}>{val}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {promoOn && (
                        <div style={{ background: "#064e3b", border: "0.5px solid #059669", borderRadius: 8, padding: 12, marginTop: 12 }}>
                            <div style={{ fontSize: 11, color: "#6ee7b7", fontWeight: 500, marginBottom: 4 }}>RESULTADO ESPERADO</div>
                            <div style={{ fontSize: 13, color: "#a7f3d0" }}>
                                3 slots vacíos → <strong>{discount}%</strong> dto. aplicado · Estimado Q <strong>{est}</strong> recuperados
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ViewEspera({ addToast }) {
    const [waitList, setWaitList] = useState(WAIT_LIST_INITIAL);
    const [reassigned, setReassigned] = useState(false);
    const [reassignMsg, setReassignMsg] = useState(null);

    const simulateReassign = () => {
        if (reassigned) return;
        setReassigned(true);
        const name = waitList[0].name;
        setWaitList((prev) =>
            prev.map((w, i) => i === 0 ? { ...w, status: "Asignado ✓", assigned: true } : w)
        );
        setReassignMsg(name);
    };

    return (
        <div>
            <div className="reassign-banner">
                <i className="ti ti-switch-horizontal" style={{ fontSize: 18 }} />
                Reasignación Automática <strong style={{ margin: "0 4px" }}>ACTIVA</strong> · Al cancelar, el sistema asigna al #1 de la lista
            </div>

            <div className="nx-card">
                <div className="nx-section-title" style={{ justifyContent: "space-between" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <i className="ti ti-list-numbers" style={{ fontSize: 16, color: "#22d3ee" }} />
                        Lista de Espera — Hoy
                    </span>
                    <button className="nx-btn nx-btn-primary" style={{ fontSize: 11, padding: "5px 10px" }} onClick={simulateReassign}>
                        <i className="ti ti-refresh" style={{ fontSize: 12 }} /> Simular Reasignación
                    </button>
                </div>

                {waitList.map((w, i) => (
                    <div className="wait-row" key={w.id}>
                        <div className={`wait-pos${w.assigned ? "" : w.top ? " top" : ""}`}
                            style={w.assigned ? { background: "#064e3b", color: "#6ee7b7" } : {}}>
                            {i + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 500 }}>{w.name}</div>
                            <div style={{ fontSize: 11, color: "#64748b" }}>{w.svc}</div>
                        </div>
                        <span className={`nx-status ${w.assigned ? "s-done" : "s-pend"}`}>{w.assigned ? "Asignado ✓" : w.status}</span>
                    </div>
                ))}

                {reassignMsg && (
                    <div className="nx-alert" style={{ marginTop: 12 }}>
                        <i className="ti ti-switch-horizontal" style={{ fontSize: 16 }} />
                        IA asignó <strong style={{ margin: "0 4px" }}>{reassignMsg}</strong> al slot liberado — WhatsApp enviado
                    </div>
                )}
            </div>

            <div className="nx-card" style={{ marginTop: 16 }}>
                <div className="nx-section-title">
                    <i className="ti ti-clock-hour-4" style={{ fontSize: 16, color: "#f59e0b" }} />
                    Historial de Reasignaciones de Hoy
                </div>
                {[
                    { time: "09:00", msg: <>Andrés C. canceló → <strong style={{ color: "#6ee7b7" }}>Diego M. asignado automáticamente</strong></>, ok: true },
                    { time: "08:30", msg: <>Slot liberado → <strong style={{ color: "#6ee7b7" }}>Fernando L. notificado</strong></>, ok: true },
                ].map((r) => (
                    <div className="wait-row" key={r.time}>
                        <span style={{ fontSize: 11, color: "#64748b", width: 44, fontFamily: "Space Mono, monospace" }}>{r.time}</span>
                        <div style={{ flex: 1, fontSize: 12, color: "#94a3b8" }}>{r.msg}</div>
                        <span className="nx-status s-done">Exitoso</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ViewClientes() {
    return (
        <div className="nx-card">
            <div className="nx-section-title" style={{ justifyContent: "space-between" }}>
                <span><i className="ti ti-address-book" style={{ fontSize: 16, color: "#3b82f6" }} /> Directorio de Clientes</span>
                <span style={{ fontSize: 12, color: "#64748b" }}>147 clientes registrados</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginTop: 4 }}>
                {CLIENTS.map((c) => (
                    <div key={c.name} style={{ background: "#0f172a", borderRadius: 8, padding: 12, display: "flex", gap: 10, alignItems: "center" }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, color: c.color, flexShrink: 0 }}>
                            {c.initials}
                        </div>
                        <div>
                            <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 500 }}>{c.name}</div>
                            <div style={{ fontSize: 11, color: "#64748b" }}>{c.visits} visitas · {c.revenue}</div>
                        </div>
                        <span className={`nx-status ${c.badgeClass}`} style={{ marginLeft: "auto" }}>{c.badge}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ViewPlanes({ addToast }) {
    const plans = [
        {
            tier: "NEXUS CORE", price: "Q 149", period: "por mes · 1 agenda", featured: false,
            features: [
                { icon: "ti-check", text: "1 Agenda digital", active: true },
                { icon: "ti-check", text: "Recordatorios SMS", active: true },
                { icon: "ti-check", text: "Hasta 100 citas/mes", active: true },
                { icon: "ti-x", text: "Motor de Precios IA", active: false },
                { icon: "ti-x", text: "Multi-empleado", active: false },
            ],
            btnClass: "pb-default", btnLabel: "Comenzar con Core", id: "Core",
        },
        {
            tier: "NEXUS BOOST", price: "Q 299", period: "por mes · hasta 5 empleados", featured: true, badge: "⭐ Más Popular",
            features: [
                { icon: "ti-check", text: "Hasta 5 Agendas", active: true },
                { icon: "ti-check", text: "Recordatorios SMS + WhatsApp", active: true },
                { icon: "ti-check", text: "Citas ilimitadas", active: true },
                { icon: "ti-check", text: "Motor de Precios Dinámicos IA", active: true, highlight: true },
                { icon: "ti-check", text: "Lista de Espera Inteligente", active: true },
            ],
            btnClass: "pb-featured", btnLabel: "Actualizar a Boost →", id: "Boost",
        },
        {
            tier: "NEXUS PRIME", price: "Q 499", period: "por mes · multi-sucursal", featured: false,
            features: [
                { icon: "ti-check", text: "Sucursales ilimitadas", active: true },
                { icon: "ti-check", text: "Panel multi-sede", active: true },
                { icon: "ti-check", text: "Todo de Boost incluido", active: true },
                { icon: "ti-check", text: "API & Integraciones", active: true },
                { icon: "ti-check", text: "Soporte 24/7 dedicado", active: true, highlight: true },
            ],
            btnClass: "pb-default", btnLabel: "Ir a Prime", id: "Prime",
        },
    ];

    return (
        <div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#f1f5f9", marginBottom: 4 }}>Elige tu plan NexusOps</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>Escala tu negocio con inteligencia artificial. Sin compromisos anuales.</div>
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "stretch", position: "relative" }}>
                {plans.map((p) => (
                    <div key={p.id} className={`plan-card${p.featured ? " featured" : ""}`}>
                        {p.badge && <div className="plan-badge">{p.badge}</div>}
                        <div style={{ fontSize: 11, color: p.featured ? "#93c5fd" : "#64748b", marginBottom: 4, fontWeight: 500 }}>{p.tier}</div>
                        <div className="plan-price">{p.price}</div>
                        <div className="plan-period">{p.period}</div>
                        <div className="plan-feat">
                            {p.features.map((f) => (
                                <span key={f.text}>
                                    <i className={`ti ${f.icon}`} style={{ color: f.active ? "#22d3ee" : "#475569", fontSize: 13 }} />
                                    {f.highlight ? <strong style={{ color: "#22d3ee" }}>{f.text}</strong> : f.text}
                                </span>
                            ))}
                        </div>
                        <button className={`plan-btn ${p.btnClass}`} onClick={() => addToast(`Plan Nexus ${p.id} seleccionado. Redirigiendo al proceso de pago...`)}>
                            {p.btnLabel}
                        </button>
                    </div>
                ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "#475569" }}>
                Todos los planes incluyen prueba gratuita de 14 días. Sin tarjeta de crédito.
            </div>
        </div>
    );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ onClose, onSave }) {
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <div className="modal-title">
                    <span>
                        <i className="ti ti-calendar-plus" style={{ fontSize: 16, verticalAlign: -2, marginRight: 8, color: "#3b82f6" }} />
                        Nueva Cita Automatizada
                    </span>
                    <button onClick={onClose} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b", fontSize: 18 }}>
                        <i className="ti ti-x" />
                    </button>
                </div>
                <div className="modal-field">
                    <div className="modal-label">Cliente</div>
                    <input className="modal-input" placeholder="Buscar cliente..." />
                </div>
                <div className="modal-field">
                    <div className="modal-label">Servicio</div>
                    <select className="modal-input" style={{ cursor: "pointer" }}>
                        <option>Corte de cabello</option>
                        <option>Corte + Barba</option>
                        <option>Barba</option>
                        <option>Tinte</option>
                    </select>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div className="modal-field">
                        <div className="modal-label">Fecha</div>
                        <input className="modal-input" type="date" defaultValue="2025-05-27" />
                    </div>
                    <div className="modal-field">
                        <div className="modal-label">Hora</div>
                        <select className="modal-input" style={{ cursor: "pointer" }}>
                            <option>08:00 AM</option>
                            <option>09:00 AM</option>
                            <option>10:30 AM ⚡ Promo 15%</option>
                            <option>11:00 AM</option>
                            <option>02:00 PM</option>
                        </select>
                    </div>
                </div>
                <div className="modal-field">
                    <div className="modal-label">Técnico</div>
                    <select className="modal-input" style={{ cursor: "pointer" }}>
                        <option>Juan (Disponible)</option>
                        <option>Pedro (Disponible)</option>
                        <option>Ana (Ocupada)</option>
                    </select>
                </div>
                <div style={{ background: "#0f172a", borderRadius: 8, padding: 10, marginBottom: 14, fontSize: 11, color: "#22d3ee", display: "flex", alignItems: "center", gap: 8 }}>
                    <i className="ti ti-cpu" style={{ fontSize: 14 }} />
                    IA: Slot con promoción activa · Q 85 → <strong style={{ marginLeft: 4 }}>Q 72.25</strong> (15% dto.)
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    <button className="nx-btn nx-btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={onClose}>Cancelar</button>
                    <button className="nx-btn nx-btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={onSave}>
                        <i className="ti ti-check" style={{ fontSize: 14 }} /> Confirmar Cita
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function NexusOpsDashboard() {
    const [view, setView] = useState("dashboard");
    const [modalOpen, setModalOpen] = useState(false);
    const { toasts, addToast } = useToasts();

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: "ti-layout-dashboard", group: "Principal" },
        { id: "agenda", label: "Agenda", icon: "ti-calendar", badge: 8, group: "Principal" },
        { id: "precios", label: "Precios Dinámicos", icon: "ti-bolt", group: "Módulos IA" },
        { id: "espera", label: "Lista de Espera", icon: "ti-users", badge: 3, group: "Módulos IA" },
        { id: "clientes", label: "Clientes", icon: "ti-address-book", group: "Negocio" },
        { id: "planes", label: "Planes SaaS", icon: "ti-credit-card", group: "Negocio" },
    ];

    const groups = ["Principal", "Módulos IA", "Negocio"];

    const handleSaveAppt = () => {
        setModalOpen(false);
        addToast("Cita registrada con éxito. Recordatorio enviado al cliente.");
    };

    const currentView = () => {
        switch (view) {
            case "dashboard": return <ViewDashboard addToast={addToast} />;
            case "agenda": return <ViewAgenda />;
            case "precios": return <ViewPrecios />;
            case "espera": return <ViewEspera addToast={addToast} />;
            case "clientes": return <ViewClientes />;
            case "planes": return <ViewPlanes addToast={addToast} />;
            default: return null;
        }
    };

    return (
        <div className="nx-root">
            <style>{css}</style>
            <div className="nx-wrap">
                {/* Sidebar */}
                <div className="nx-sidebar">
                    <div className="nx-logo">
                        <div className="nx-logo-inner">
                            <div className="nx-logo-icon">
                                <svg viewBox="0 0 20 20" fill="none" width={20} height={20}>
                                    <circle cx="5" cy="10" r="3" fill="#93c5fd" />
                                    <circle cx="15" cy="6" r="2.5" fill="#60a5fa" />
                                    <circle cx="15" cy="14" r="2.5" fill="#60a5fa" />
                                    <line x1="8" y1="9" x2="12.5" y2="7" stroke="#3b82f6" strokeWidth="1.2" />
                                    <line x1="8" y1="11" x2="12.5" y2="13" stroke="#3b82f6" strokeWidth="1.2" />
                                </svg>
                            </div>
                            <div>
                                <div className="nx-logo-text">NexusOps</div>
                                <div className="nx-logo-sub">Plataforma SaaS</div>
                            </div>
                        </div>
                    </div>

                    <div className="nx-nav">
                        {groups.map((g) => (
                            <div key={g}>
                                <div className="nx-nav-label" style={g !== "Principal" ? { marginTop: 8 } : {}}>{g}</div>
                                {navItems.filter((n) => n.group === g).map((n) => (
                                    <div
                                        key={n.id}
                                        className={`nx-nav-item${view === n.id ? " active" : ""}`}
                                        onClick={() => setView(n.id)}
                                    >
                                        <i className={`ti ${n.icon}`} />
                                        {n.label}
                                        {n.badge && <span className="nx-badge">{n.badge}</span>}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="nx-user">
                        <div className="nx-user-inner">
                            <div className="nx-avatar">BC</div>
                            <div>
                                <div className="nx-user-name">Barbería Central</div>
                                <div className="nx-user-role">Administrador · Nexus Boost</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main */}
                <div className="nx-main">
                    <div className="nx-topbar">
                        <div>
                            <div className="nx-topbar-title">{TITLES[view]}</div>
                            <div className="nx-topbar-sub">Martes, 27 de mayo de 2025 · Barbería Central</div>
                        </div>
                        <div className="nx-topbar-actions">
                            <div style={{ fontSize: 11, color: "#22d3ee", display: "flex", alignItems: "center", gap: 5 }}>
                                <span style={{ width: 7, height: 7, background: "#22d3ee", borderRadius: "50%", display: "inline-block" }} />
                                IA Activa
                            </div>
                            <button className="nx-btn nx-btn-ghost" onClick={() => addToast("No hay alertas nuevas. Todos los sistemas operativos.")}>
                                <i className="ti ti-bell" style={{ fontSize: 14 }} />
                            </button>
                            <button className="nx-btn nx-btn-primary" onClick={() => setModalOpen(true)}>
                                <i className="ti ti-plus" style={{ fontSize: 14 }} /> Nueva Cita
                            </button>
                        </div>
                    </div>

                    <div className="nx-content">
                        {/* Toast area */}
                        <div>
                            {toasts.map((t) => (
                                <div className="toast-item" key={t.id}>
                                    <i className="ti ti-circle-check" style={{ fontSize: 16 }} />
                                    {t.msg}
                                </div>
                            ))}
                        </div>
                        {currentView()}
                    </div>
                </div>

                {/* Modal */}
                {modalOpen && <Modal onClose={() => setModalOpen(false)} onSave={handleSaveAppt} />}
            </div>
        </div>
    );
}