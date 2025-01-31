import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export default function ItemListCard({
  selected,
  onClick,
  text = "테스트",
  className,
}) {
  return (
    <motion.li
      onClick={onClick}
      selected={selected}
      className={twMerge(
        ` font-paybooc tracking-tighter w-fit px-5 py-2 hover:bg-[#434343] rounded-xl bg-black`,
        className
      )}
    >
      <div className="cursor-pointer whitespace-nowrap">
        <div className="text-3xl inline text-white">{text}</div>
      </div>
    </motion.li>
  );
}
