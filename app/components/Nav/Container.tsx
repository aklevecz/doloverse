import { motion } from "framer-motion";

export default function NavContainer({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <motion.div
      layout
      className="w-full fixed bottom-0 text-white text-3xl h-54 flex justify-center bg-black"
    >
      {children}
    </motion.div>
  );
}
