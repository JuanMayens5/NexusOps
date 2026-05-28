import { CLIENTS } from "../../data/constants";
export default function ViewClientes() {
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