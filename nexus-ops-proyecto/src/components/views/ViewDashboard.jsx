// src/components/views/ViewDashboard.jsx
import { useState, useEffect, useRef } from 'react';
import { WEEKLY_BARS, DAYS_ABBR } from '../../data/constants';

const DEFAULT_APPTS = [
    { time: "09:00", name: "Carlos M.", svc: "Corte + Barba · Juan", status: "Completada", cls: "s-done" },
    { time: "10:30", name: "Roberto A.", svc: "Corte · Pedro", status: "Pendiente", cls: "s-pend" },
    { time: "11:00", name: "Luis G.", svc: "Barba · Juan", status: "Cancelada", cls: "s-canc" },
    { time: "14:00", name: "Marco R.", svc: "Corte + Barba · Ana", status: "Pendiente", cls: "s-pend" },
];

// Hook count-up animado
function useCountUp(target, duration = 1200, delay = 0) {
    const [value, setValue] = useState(0);
    const rafRef = useRef(null);

    useEffect(() => {
        let start = null;
        const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ''));
        if (isNaN(numeric)) { setValue(target); return; }

        const delayTimer = setTimeout(() => {
            const step = (timestamp) => {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / duration, 1);
                // easeOutExpo
                const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                setValue(Math.floor(ease * numeric));
                if (progress < 1) {
                    rafRef.current = requestAnimationFrame(step);
                } else {
                    setValue(numeric);
                }
            };
            rafRef.current = requestAnimationFrame(step);
        }, delay);

        return () => {
            clearTimeout(delayTimer);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [target, duration, delay]);

    return value;
}

// Formatea el valor del KPI con el prefijo/sufijo original
function formatKpi(template, animated) {
    if (template.includes('Q ')) return `Q ${animated.toLocaleString('es-GT')}`;
    if (template.includes('%')) return `${animated}%`;
    return String(animated);
}

// Barra animada individual
function AnimatedBar({ height, color, delay }) {
    const [h, setH] = useState(0);
    useEffect(() => {
        const t = setTimeout(() => setH(height), delay);
        return () => clearTimeout(t);
    }, [height, delay]);

    return (
        <div className="nx-bar" style={{
            height: `${h}%`,
            background: color,
            transition: `height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)`,
        }} />
    );
}

export default function ViewDashboard({ addToast }) {
    const [appointments, setAppointments] = useState(() => {
        const saved = localStorage.getItem("nexus_appointments");
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { return DEFAULT_APPTS; }
        }
        return DEFAULT_APPTS;
    });

    const [showModal, setShowModal] = useState(false);
    const [newAppt, setNewAppt] = useState({ time: "", name: "", svc: "" });

    useEffect(() => {
        localStorage.setItem("nexus_appointments", JSON.stringify(appointments));
    }, [appointments]);

    // Count-up para cada KPI — staggered con delay
    const kpi0 = useCountUp(247, 1400, 100);
    const kpi1 = useCountUp(4820, 1600, 200);
    const kpi2 = useCountUp(78, 1200, 300);
    const kpi3 = useCountUp(31, 1000, 400);

    const kpiAnimated = [kpi0, kpi1, kpi2, kpi3];

    const handleAddAppt = () => {
        if (!newAppt.time || !newAppt.name || !newAppt.svc) {
            if (addToast) addToast("Por favor completa todos los campos", "error");
            return;
        }
        const newEntry = {
            time: newAppt.time,
            name: newAppt.name,
            svc: newAppt.svc,
            status: "Pendiente",
            cls: "s-pend"
        };
        setAppointments(prev => {
            const updated = [...prev, newEntry];
            updated.sort((a, b) => a.time.localeCompare(b.time));
            return updated;
        });
        if (addToast) addToast("Cita creada exitosamente");
        setShowModal(false);
        setNewAppt({ time: "", name: "", svc: "" });
    };

    const kpis = [
        { icon: "ti-calendar-check", iconColor: "#3b82f6", label: "Citas del Mes", raw: "247", sub: "↑ 18% vs mes anterior", warn: false },
        { icon: "ti-receipt", iconColor: "#22d3ee", label: "Ingresos Recuperados", raw: "Q 4,820", sub: "↑ 32% por IA dinámica", warn: false },
        { icon: "ti-shield-check", iconColor: "#10b981", label: "No-Shows Mitigados", raw: "78%", sub: "↓ 14 cancelaciones hoy", warn: true },
        { icon: "ti-cpu", iconColor: "#a78bfa", label: "Espacios por IA", raw: "31", sub: "Esta semana optimizados", warn: false },
    ];

    return (
        <div style={{ position: 'relative' }}>
            <div className="nx-grid-4">
                {kpis.map((k, idx) => (
                    <div className="nx-card kpi-card-animated" key={k.label}>
                        <div className="nx-kpi-label">
                            <i className={`ti ${k.icon}`} style={{ fontSize: 14, color: k.iconColor }} />
                            {k.label}
                        </div>
                        <div className="nx-kpi-val">
                            {formatKpi(k.raw, kpiAnimated[idx])}
                        </div>
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
                                <AnimatedBar height={b.h} color={b.c} delay={i * 80 + 200} />
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                        {DAYS_ABBR.map((d) => (
                            <div key={d} style={{ flex: 1, textAlign: "center", fontSize: 9, color: "#475569" }}>{d}</div>
                        ))}
                    </div>
                </div>

                <div className="nx-card" style={{ position: 'relative' }}>
                    <div className="nx-section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <i className="ti ti-clock" style={{ fontSize: 16, color: "#22d3ee" }} />
                            Próximas Citas del Día
                        </div>
                        <button
                            className="nx-btn nx-btn-primary"
                            style={{ padding: '4px 8px', fontSize: 11 }}
                            onClick={() => setShowModal(true)}
                        >
                            <i className="ti ti-plus" /> Nueva Cita
                        </button>
                    </div>

                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {appointments.map((a, i) => (
                            <div className="nx-appt-item" key={a.time + a.name + i}>
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

            {showModal && (
                <div className="modal-overlay" style={{ position: 'fixed', zIndex: 9999 }}>
                    <div className="modal-box">
                        <div className="modal-title">
                            <span>Nueva Cita</span>
                            <i className="ti ti-x" style={{ cursor: 'pointer', color: '#64748b' }} onClick={() => setShowModal(false)} />
                        </div>
                        <div className="modal-field">
                            <div className="modal-label">Hora</div>
                            <input
                                type="time"
                                className="modal-input"
                                value={newAppt.time}
                                onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
                            />
                        </div>
                        <div className="modal-field">
                            <div className="modal-label">Cliente</div>
                            <input
                                type="text"
                                className="modal-input"
                                placeholder="Nombre del cliente"
                                value={newAppt.name}
                                onChange={(e) => setNewAppt({ ...newAppt, name: e.target.value })}
                            />
                        </div>
                        <div className="modal-field">
                            <div className="modal-label">Servicio</div>
                            <input
                                type="text"
                                className="modal-input"
                                placeholder="Ej: Corte + Barba · Juan"
                                value={newAppt.svc}
                                onChange={(e) => setNewAppt({ ...newAppt, svc: e.target.value })}
                            />
                        </div>
                        <button className="nx-btn nx-btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }} onClick={handleAddAppt}>
                            Guardar Cita
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}