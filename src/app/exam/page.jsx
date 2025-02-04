import { signIn } from "../auth";
import SignIn from "../components/Button/sign-in";
import AnimatedCounter from "../components/Motion/AnimatedCounter";

export default function Exam() {
  return (
    <div>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  );
}
