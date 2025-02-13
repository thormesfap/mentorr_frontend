import { useAppContext } from "../contexts/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const Snackbar = () => {
  const { message, messageType } = useAppContext();

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Começa invisível e deslocado para baixo
          animate={{ opacity: 1, y: 0 }} // Anima para posição normal
          exit={{ opacity: 0, y: 50 }} // Desliza para baixo ao sumir
          transition={{ duration: 0.3 }}
          className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg text-white text-center ${
            messageType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Snackbar;
