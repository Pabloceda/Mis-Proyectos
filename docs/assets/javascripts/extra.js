// Extra JavaScript for enhanced functionality
console.log("Portfolio loaded successfully!");

// ========================================
// VANTA.JS - Fondo Animado Homepage (Fullscreen)
// ========================================

function initVanta() {
    const heroFullscreen = document.querySelector('.hero-fullscreen');

    console.log("Checking for hero-fullscreen:", heroFullscreen);
    console.log("VANTA available:", typeof VANTA);
    console.log("THREE available:", typeof THREE);

    // Solo inicializar en homepage con hero-fullscreen
    if (heroFullscreen && typeof VANTA !== 'undefined' && typeof THREE !== 'undefined') {
        try {
            // Aplicar Vanta al body para efecto completo
            VANTA.NET({
                el: document.body,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: window.innerHeight,
                minWidth: window.innerWidth,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0xff6b35,         // Naranja/coral
                backgroundColor: 0x0d1117, // Fondo oscuro
                points: 12.00,
                maxDistance: 22.00,
                spacing: 18.00
            });
            console.log("Vanta.js NET initialized on BODY!");
        } catch (error) {
            console.error("Vanta.js error:", error);
        }
    } else if (!heroFullscreen) {
        console.log("Not on homepage, skipping Vanta");
    } else {
        console.log("Dependencies not ready, retrying in 300ms...");
        setTimeout(initVanta, 300);
    }
}

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVanta);
} else {
    initVanta();
}
