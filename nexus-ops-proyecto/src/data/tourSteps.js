// src/data/tourSteps.js

/** Descripción breve de cada módulo — aparece en el banner debajo del topbar */
export const MODULE_INFO = {
    dashboard: {
        icon: "ti-layout-dashboard",
        color: "#3b82f6",
        title: "Dashboard Principal",
        desc: "Vista general del negocio: KPIs en tiempo real, afluencia semanal, citas del día y alertas generadas por IA.",
        tag: "Vista General",
    },
    agenda: {
        icon: "ti-calendar",
        color: "#22d3ee",
        title: "Agenda / Calendario",
        desc: "Calendario semanal con citas asignadas por empleado. Visualización multi-barbero con codificación por color.",
        tag: "Gestión de Citas",
    },
    precios: {
        icon: "ti-bolt",
        color: "#a78bfa",
        title: "Motor de Precios Dinámicos IA",
        desc: "La IA detecta horas muertas y aplica descuentos automáticos para maximizar la ocupación y los ingresos del negocio.",
        tag: "Módulo IA",
    },
    espera: {
        icon: "ti-users",
        color: "#22d3ee",
        title: "Lista de Espera Inteligente",
        desc: "Gestiona la cola de clientes en espera. Al cancelarse una cita, el sistema asigna y notifica automáticamente al siguiente.",
        tag: "Módulo IA",
    },
    clientes: {
        icon: "ti-address-book",
        color: "#3b82f6",
        title: "Directorio de Clientes",
        desc: "CRM integrado con historial de visitas, gasto acumulado y segmentación por nivel de actividad (VIP, Regular, Inactivo).",
        tag: "Negocio",
    },
    planes: {
        icon: "ti-credit-card",
        color: "#10b981",
        title: "Planes & Suscripción SaaS",
        desc: "Tres tiers adaptados al tamaño del negocio: Core, Boost (con IA) y Prime (multi-sucursal). Sin compromisos anuales.",
        tag: "Negocio",
    },
};

/** Pasos del tour guiado — cada uno resalta un elemento con selector CSS */
export const TOUR_STEPS = [
    {
        view: "dashboard",
        target: ".nx-grid-4",
        title: "KPIs en Tiempo Real",
        desc: "Cuatro métricas clave del negocio actualizadas en tiempo real: citas del mes, ingresos recuperados por IA, no-shows mitigados y espacios optimizados automáticamente.",
        position: "bottom",
    },
    {
        view: "dashboard",
        target: ".nx-bar-wrap",
        title: "Afluencia Semanal",
        desc: "Gráfica de barras que muestra la demanda por día de la semana. La IA usa estos patrones para ajustar precios y optimizar la agenda.",
        position: "bottom",
    },
    {
        view: "dashboard",
        target: ".nx-alert",
        title: "Alertas IA del Sistema",
        desc: "Notificaciones automáticas generadas por la IA: promociones activadas, cancelaciones detectadas y reasignaciones realizadas sin intervención humana.",
        position: "top",
    },
    {
        view: "agenda",
        target: ".cal-grid",
        title: "Agenda Multi-Barbero",
        desc: "Vista de semana completa con todas las citas asignadas. Cada color representa un empleado diferente. Las celdas vacías son oportunidades detectadas por la IA.",
        position: "bottom",
    },
    {
        view: "precios",
        target: ".toggle-track",
        title: "Motor de IA — Control Central",
        desc: "Con un solo toggle, la IA toma el control de los precios. Detecta automáticamente las horas con baja afluencia y aplica el descuento configurado.",
        position: "right",
    },
    {
        view: "espera",
        target: ".nx-card",
        title: "Lista de Espera Automática",
        desc: "Cuando un cliente cancela, el sistema detecta el slot libre y notifica al primer cliente en espera vía WhatsApp, todo en segundos y sin intervención manual.",
        position: "bottom",
    },
    {
        view: "clientes",
        target: ".nx-card",
        title: "CRM de Clientes",
        desc: "Base de datos de clientes con historial completo: visitas, gasto total, y clasificación automática. Permite identificar clientes VIP y reactivar inactivos.",
        position: "bottom",
    },
    {
        view: "planes",
        target: ".plan-card.featured",
        title: "Nexus Boost — Plan Recomendado",
        desc: "El plan estrella incluye el Motor de Precios IA y la Lista de Espera Inteligente. Diseñado para barberías que quieren maximizar ingresos sin esfuerzo extra.",
        position: "top",
    },
];
