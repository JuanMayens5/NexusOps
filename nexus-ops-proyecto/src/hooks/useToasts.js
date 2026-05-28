// src/hooks/useToasts.js
import { useState } from 'react';

export function useToasts() {
    const [toasts, setToasts] = useState([]);

    const addToast = (msg) => {
        const id = Date.now();
        setToasts((p) => [...p, { id, msg }]);
        setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
    };

    return { toasts, addToast };
}