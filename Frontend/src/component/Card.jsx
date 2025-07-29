import { motion } from "framer-motion";

function Card({children}) {
  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
    >
        {children}
    </motion.div>
  );
}

export default Card;
