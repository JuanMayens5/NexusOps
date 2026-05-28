import { useState } from 'react';
import { HOURS, AFFLUENCE } from '../../data/constants';
export default function ViewPrecios() {
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