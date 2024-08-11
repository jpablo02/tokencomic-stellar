// components/ui/AnimatedCircle.js
import { motion } from "framer-motion";

const AnimatedCircle = ({ className }) => (
  <motion.svg
    className={className}
    fill="transparent"
    viewBox="0 0 506 506"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.circle
      cx="253"
      cy="253"
      r="242"
      stroke="#1E293B"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ strokeDasharray: "34 20 10 10", opacity: 0.3 }}
      animate={{
        strokeDasharray: [
          "115 220 125 125",
          "116 125 192 172",
          "104 350 122 122",
        ],
        rotate: [120, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
    <motion.circle
      cx="253"
      cy="253"
      r="250"
      stroke="#FFC81c"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ strokeDasharray: "24 10 0 0", opacity: 0.4 }}
      animate={{
        strokeDasharray: [
          "15 120 25 25",
          "16 25 92 72",
          "4 250 22 22",
        ],
        rotate: [120, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  </motion.svg>
);

export default AnimatedCircle;
