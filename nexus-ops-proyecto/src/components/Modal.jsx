// ─── Modal ────────────────────────────────────────────────────────────────────
export default function Modal({ onClose, onSave }) {
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