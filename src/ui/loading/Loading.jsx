import Lottie from "react-lottie";
import loadingAnimation from "../../assets/lotties/dots_colored.json";

export default function Loading({ height }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="loading-container" style={{ height: height }}>
      <div style={{ width: "80px", height: "80px" }}>
        <Lottie options={defaultOptions} />
      </div>
    </div>
  );
}
