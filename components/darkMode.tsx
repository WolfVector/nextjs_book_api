import { AiFillBulb } from "react-icons/ai";

/* Dark mode for Tailwind */
export default function DarkMode(props: any) {
  function handleMode() {
    props.setMode((props.mode == "dark") ? "" : "dark");
  }

  return(
    <button
      className={props.className}
      onClick={handleMode}
    >
      <AiFillBulb />
    </button>
  );
}
