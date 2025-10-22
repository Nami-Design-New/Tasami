export default function Loading({ height }) {
  return (
    <div className="loading-container" style={{ height: height }}>
      <svg width="180" height="60" viewBox="0 0 120 40">
        <text x="10" y="25" fill="#214b92" fontSize="16" fontFamily="Arial">
          L
          <animate
            attributeName="y"
            values="25;20;25"
            dur="0.8s"
            begin="0s"
            repeatCount="indefinite"
          ></animate>
        </text>
        <text x="25" y="25" fill="#214b92" fontSize="16" fontFamily="Arial">
          O
          <animate
            attributeName="y"
            values="25;20;25"
            dur="0.8s"
            begin="0.1s"
            repeatCount="indefinite"
          ></animate>
        </text>
        <text x="40" y="25" fill="#214b92" fontSize="16" fontFamily="Arial">
          A
          <animate
            attributeName="y"
            values="25;20;25"
            dur="0.8s"
            begin="0.2s"
            repeatCount="indefinite"
          ></animate>
        </text>
        <text x="55" y="25" fill="#214b92" fontSize="16" fontFamily="Arial">
          D
          <animate
            attributeName="y"
            values="25;20;25"
            dur="0.8s"
            begin="0.30000000000000004s"
            repeatCount="indefinite"
          ></animate>
        </text>
        <text x="70" y="25" fill="#214b92" fontSize="16" fontFamily="Arial">
          I
          <animate
            attributeName="y"
            values="25;20;25"
            dur="0.8s"
            begin="0.4s"
            repeatCount="indefinite"
          ></animate>
        </text>
        <text x="85" y="25" fill="#214b92" fontSize="16" fontFamily="Arial">
          N
          <animate
            attributeName="y"
            values="25;20;25"
            dur="0.8s"
            begin="0.5s"
            repeatCount="indefinite"
          ></animate>
        </text>
        <text x="100" y="25" fill="#214b92" fontSize="16" fontFamily="Arial">
          G
          <animate
            attributeName="y"
            values="25;20;25"
            dur="0.8s"
            begin="0.6000000000000001s"
            repeatCount="indefinite"
          ></animate>
        </text>
      </svg>
    </div>
  );
}
