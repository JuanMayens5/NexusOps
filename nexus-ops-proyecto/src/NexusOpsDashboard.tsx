import { useState, useEffect, useRef } from "react";
import './styles/Dashboard.css';
import { TITLES } from './data/constants';
import { MODULE_INFO } from './data/tourSteps';
import { useToasts } from './hooks/useToasts';

import ViewDashboard from './components/views/ViewDashboard';
import ViewAgenda from './components/views/ViewAgenda';
import ViewPrecios from './components/views/ViewPrecios';
import ViewEspera from './components/views/ViewEspera';
import ViewClientes from './components/views/ViewClientes';
import ViewPlanes from './components/views/ViewPlanes';
import Modal from './components/Modal';
import TourOverlay from './components/TourOverlay';

// ─── App ──────────────────────────────────────────────────────────────────────
export default function NexusOpsDashboard() {
    const [view, setView] = useState("dashboard");
    const [modalOpen, setModalOpen] = useState(false);
    const [tourActive, setTourActive] = useState(false);
    const [viewKey, setViewKey] = useState(0); // fuerza re-render para animación fadeIn
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

    const handleNavChange = (id) => {
        if (id === view) return;
        setView(id);
        setViewKey(k => k + 1); // dispara animación fadeInUp
    };

    const handleSaveAppt = () => {
        setModalOpen(false);
        addToast("Cita registrada con éxito. Recordatorio enviado al cliente.");
    };

    // Para el tour: navegar a una vista específica
    const handleTourNavigate = (targetView) => {
        if (targetView !== view) {
            setView(targetView);
            setViewKey(k => k + 1);
        }
    };

    const moduleInfo = MODULE_INFO[view];

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
                                        onClick={() => handleNavChange(n.id)}
                                    >
                                        <i className={`ti ${n.icon}`} />
                                        {n.label}
                                        {n.badge && <span className="nx-badge">{n.badge}</span>}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Botón Iniciar Demo */}
                    <div className="nx-demo-btn-wrap">
                        <button
                            className={`nx-demo-btn${tourActive ? " active" : ""}`}
                            onClick={() => setTourActive(t => !t)}
                        >
                            <i className={`ti ${tourActive ? "ti-player-stop" : "ti-player-play"}`} />
                            {tourActive ? "Detener Demo" : "Iniciar Demo"}
                        </button>
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

                    {/* Banner de Contexto del Módulo */}
                    {moduleInfo && (
                        <div className="nx-module-banner">
                            <div className="nx-module-banner-left">
                                <div
                                    className="nx-module-banner-icon"
                                    style={{ '--module-color': moduleInfo.color } as React.CSSProperties}
                                >
                                    <i className={`ti ${moduleInfo.icon}`} />
                                </div>
                                <div>
                                    <div className="nx-module-banner-title">{moduleInfo.title}</div>
                                    <div className="nx-module-banner-desc">{moduleInfo.desc}</div>
                                </div>
                            </div>
                            <div
                                className="nx-module-banner-tag"
                                style={{ '--module-color': moduleInfo.color } as React.CSSProperties}
                            >
                                {moduleInfo.tag}
                            </div>
                        </div>
                    )}

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

                        {/* Vista con animación fadeInUp al cambiar */}
                        <div key={viewKey} className="nx-view-enter">
                            {currentView()}
                        </div>
                    </div>
                </div>

                {/* Modal */}
                {modalOpen && <Modal onClose={() => setModalOpen(false)} onSave={handleSaveAppt} />}

                {/* Tour Overlay */}
                {tourActive && (
                    <TourOverlay
                        currentView={view}
                        onNavigate={handleTourNavigate}
                        onEnd={() => setTourActive(false)}
                    />
                )}
            </div>
        </div>
    );
}