/* src/components/ui/WaveTopMulti.tsx */
export default function WaveTopMulti() {
  return (
    <>
      {/* Ola VERDE CLARO */}
      <svg
        className="absolute -top-px left-0 w-full z-[30] pointer-events-none"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
      >
        <path
          fill="var(--green-light)"
          d="
            M0 110
            C300 40 700 20 1080 70
            Q1280 95 1440 80
            L1440 0 L0 0 Z
          "
        />
        {/* rect para pantallas >1440 px */}
        <rect x="1440" y="0" width="100%" height="160" fill="var(--green-light)" />
      </svg>

      {/* Ola BLANCA —un poquito más baja para que la verde asome */}
      <svg
        className="absolute -top-px left-0 w-full z-[20] pointer-events-none"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
      >
        <path
          fill="var(--wave-white)"
          d="
            M0 130
            C320 60 720 40 1120 90
            Q1300 110 1440 95
            L1440 0 L0 0 Z
          "
        />
        <rect x="1440" y="0" width="100%" height="160" fill="var(--wave-white)" />
      </svg>
    </>
  );
}
