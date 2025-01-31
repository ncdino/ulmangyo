import useStore from "@/app/store/zustand/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useCountDown({
  time,
  path,
  isStart,
  id,
  selectedCandidates,
}) {
  const { addCartItem } = useStore();
  const [counter, setCounter] = useState(time);
  const router = useRouter();

  useEffect(() => {
    let countdownInterval;

    if (isStart && counter > 0) {
      countdownInterval = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [isStart, counter]);

  useEffect(() => {
    if (counter === 0 && isStart) {
      if (id && selectedCandidates) {
        const selected = selectedCandidates[id];
        if (selected?.name && selected?.price) {
          addCartItem(id, selected.name, selected.price);
        }
      }
      router.push(path);
    }
  }, [counter, isStart, path, router]);

  return counter;
}
