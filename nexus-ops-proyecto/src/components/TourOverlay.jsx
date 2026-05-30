// src/components/TourOverlay.jsx
import { useState, useEffect, useRef } from 'react';
import { TOUR_STEPS } from '../data/tourSteps';

export default function TourOverlay({ currentView, onNavigate, onEnd }) {
    const [step, setStep] = useState(0);
    const [rect, setRect] = useState(null);
    const [visible, setVisible] = useState(false);
    const tooltipRef = useRef(null);

    const currentStep = TOUR_STEPS[step];

    // Si la vista activa no coincide con el paso, navegar a la vista correcta
    useEffect(() => {
        if (currentStep && currentView !== currentStep.view) {
            onNavigate(currentStep.view);
        }
    }, [step]);

    // Calcular posición del elemento resaltado
    useEffect(() => {
        setVisible(false);
        const timeout = setTimeout(() => {
            if (!currentStep) return;
            const el = document.querySelector(currentStep.target);
            if (el) {
                const r = el.getBoundingClientRect();
                setRect({
                    top: r.top,
                    left: r.left,
                    width: r.width,
                    height: r.height,
                    bottom: r.bottom,
                    right: r.right,
                });
            }
            setVisible(true);
        }, 350);
        return () => clearTimeout(timeout);
    }, [step, currentView]);

    const goNext = () => {
        if (step < TOUR_STEPS.length - 1) {
            setStep(s => s + 1);
        } else {
            onEnd();
        }
    };

    const goPrev = () => {
        if (step > 0) setStep(s => s - 1);
    };

    if (!currentStep || !rect) return (
        <div className="tour-overlay-bg" onClick={onEnd}>
            <div className="tour-loading">
                <div className="tour-spinner" />
                <span>Cargando vista...</span>
            </div>
        </div>
    );

    // Calcular posición del tooltip
    const PADDING = 12;
    const tooltipWidth = 340;
    const tooltipHeight = 180;
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    let tooltipTop, tooltipLeft;

    // Intenta poner abajo primero
    if (rect.bottom + PADDING + tooltipHeight < viewportH) {
        tooltipTop = rect.bottom + PADDING;
    } else if (rect.top - PADDING - tooltipHeight > 0) {
        tooltipTop = rect.top - PADDING - tooltipHeight;
    } else {
        tooltipTop = rect.bottom + PADDING;
    }

    // Centrar horizontalmente respecto al elemento
    tooltipLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
    tooltipLeft = Math.max(12, Math.min(viewportW - tooltipWidth - 12, tooltipLeft));

    const isLast = step === TOUR_STEPS.length - 1;
    const progress = ((step + 1) / TOUR_STEPS.length) * 100;

    return (
        <>
            {/* Overlay oscuro con "agujero" en el elemento activo */}
            {visible && (
                <div
                    className="tour-overlay-bg"
                    style={{
                        '--hole-top': `${rect.top - 8}px`,
                        '--hole-left': `${rect.left - 8}px`,
                        '--hole-w': `${rect.width + 16}px`,
                        '--hole-h': `${rect.height + 16}px`,
                    }}
                >
                    {/* Spotlight border alrededor del elemento */}
                    <div
                        className="tour-spotlight"
                        style={{
                            top: rect.top - 8,
                            left: rect.left - 8,
                            width: rect.width + 16,
                            height: rect.height + 16,
                        }}
                    />

                    {/* Tooltip del tour */}
                    <div
                        ref={tooltipRef}
                        className="tour-tooltip"
                        style={{
                            top: tooltipTop,
                            left: tooltipLeft,
                            width: tooltipWidth,
                            opacity: visible ? 1 : 0,
                        }}
                    >
                        {/* Header */}
                        <div className="tour-tooltip-header">
                            <div className="tour-step-badge">
                                {step + 1} / {TOUR_STEPS.length}
                            </div>
                            <button className="tour-close-btn" onClick={onEnd} title="Salir del tour">
                                <i className="ti ti-x" />
                            </button>
                        </div>

                        {/* Progress bar */}
                        <div className="tour-progress-bar">
                            <div className="tour-progress-fill" style={{ width: `${progress}%` }} />
                        </div>

                        {/* Content */}
                        <div className="tour-tooltip-title">
                            {currentStep.title}
                        </div>
                        <div className="tour-tooltip-desc">
                            {currentStep.desc}
                        </div>

                        {/* Navigation */}
                        <div className="tour-nav">
                            <button
                                className="tour-btn tour-btn-ghost"
                                onClick={goPrev}
                                disabled={step === 0}
                            >
                                <i className="ti ti-arrow-left" /> Anterior
                            </button>
                            <div className="tour-dots">
                                {TOUR_STEPS.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`tour-dot${i === step ? ' active' : ''}`}
                                        onClick={() => setStep(i)}
                                    />
                                ))}
                            </div>
                            <button
                                className="tour-btn tour-btn-primary"
                                onClick={goNext}
                            >
                                {isLast ? (
                                    <><i className="ti ti-check" /> Finalizar</>
                                ) : (
                                    <>Siguiente <i className="ti ti-arrow-right" /></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
