// src/data/constants.js

export const VIEWS = ["dashboard", "agenda", "precios", "espera", "clientes", "planes"];

export const TITLES = {
    dashboard: "Dashboard Principal",
    agenda: "Agenda / Calendario",
    precios: "Motor de Precios Dinámicos",
    espera: "Lista de Espera Inteligente",
    clientes: "Clientes",
    planes: "Planes & Suscripción",
};

export const WEEKLY_BARS = [
    { h: 65, c: "#1d4ed8" }, { h: 30, c: "#475569" }, { h: 80, c: "#1d4ed8" },
    { h: 70, c: "#1d4ed8" }, { h: 90, c: "#2563eb" }, { h: 95, c: "#3b82f6" }, { h: 40, c: "#334155" },
];

export const DAYS_ABBR = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

export const AFFLUENCE = [15, 20, 30, 75, 90, 85, 80];

export const CALENDAR_DATA = {
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

export const WAIT_LIST_INITIAL = [
    { id: 1, name: "Diego Morales", svc: "Corte + Barba · Esperando desde 09:15", status: "En Espera", top: true },
    { id: 2, name: "Fernando López", svc: "Corte · Esperando desde 09:40", status: "En Espera", top: false },
    { id: 3, name: "Pablo Xicará", svc: "Barba · Esperando desde 10:05", status: "En Espera", top: false },
];

export const CLIENTS = [
    { initials: "CM", name: "Carlos M.", visits: 12, revenue: "Q1,440", badge: "VIP", badgeClass: "s-done", bg: "#1e3a8a", color: "#93c5fd" },
    { initials: "RA", name: "Roberto A.", visits: 8, revenue: "Q720", badge: "Regular", badgeClass: "s-pend", bg: "#2e1065", color: "#c4b5fd" },
    { initials: "LG", name: "Luis G.", visits: 5, revenue: "Q450", badge: "Regular", badgeClass: "s-pend", bg: "#064e3b", color: "#6ee7b7" },
    { initials: "MR", name: "Marco R.", visits: 3, revenue: "Q270", badge: "Inactivo", badgeClass: "s-canc", bg: "#451a03", color: "#fcd34d" },
];