import ButtonIcon from "./ButtonIcon";
import { FiMoon } from "react-icons/fi";
import { useMode } from "../features/context/ThemeContext";
import { CiSun } from "react-icons/ci";

function ToggleThemeMode() {
  const { isDarkMode, changeMode } = useMode();
  console.log(isDarkMode);
  return (
    <ButtonIcon onClick={changeMode}>
      {!isDarkMode ? <FiMoon /> : <CiSun />}
    </ButtonIcon>
  );
}

export default ToggleThemeMode;
