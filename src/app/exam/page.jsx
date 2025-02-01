import AnimatedCounter from "../components/Motion/AnimatedCounter";

export default function Exam() {
  return (
    <div>
      <AnimatedCounter from={0} to={24} duration={5} />
    </div>
  );
}
