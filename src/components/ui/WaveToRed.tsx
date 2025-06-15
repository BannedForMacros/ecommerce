export default function WaveToRed() {
  return (
    <svg
      className="w-full -mb-px pointer-events-none"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
    >
      {/* onda que parte de blanco y se rellena de rojo */}
      <path
        d="
          M0 0
          Q360 80 720 60
          T1440 70
          L1440 120
          L0 120
          Z
        "
        fill="#dc2626"  /* mismo rojo que MegaSection */
      />
    </svg>
  );
}
