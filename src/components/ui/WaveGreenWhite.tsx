/**
 * Ola que recorta un fondo verde claro (#e6f8ee) y deja la parte inferior
 * en blanco.  Altura total 160 px (ajusta si lo necesitas).
 */
export default function WaveGreenWhite() {
    const green = '#e6f8ee';
  
    return (
      <svg
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
      >
        {/* ﻿1) Ola verde */}
        <path
          fill={green}
          d="
            M0 110
            C320 50 720 20 1120 90
            Q1300 120 1440 100
            L1440 160 L0 160 Z
          "
        />
        <rect x="1440" y="0" width="100%" height="160" fill={green} />
  
        {/* ﻿2) Ola blanca que recorta */}
        <path
          fill="#ffffff"
          d="
            M0 130
            C320 70 720 40 1120 100
            Q1300 130 1440 110
            L1440 0 L0 0 Z
          "
        />
        <rect x="1440" y="0" width="100%" height="160" fill="#ffffff" />
      </svg>
    );
  }
  