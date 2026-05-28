export default function ViewPlanes({ addToast }) {
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