import { motion } from "framer-motion";

export default function Checked() {
  const variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  const ball = {
    width: 130,
    height: 130,
    backgroundColor: "#3b82f6",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const checkStyle = {
    stroke: "white",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    width: "60%",
    height: "60%",
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, type: "spring", bounce: 0.5 }}
      style={ball}
      className="shadow-xl"
    >
      <svg viewBox="0 0 24 24" fill="none" style={checkStyle}>
        <path d="M20 6L9 17L4 12" stroke="white" />
      </svg>
    </motion.div>
  );
}
