import { useState } from 'react';
import { WAIT_LIST_INITIAL } from '../../data/constants';
export default function ViewEspera({ addToast }) {
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