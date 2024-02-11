import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

const ModeContext = createContext();

function ThemeContext({ children }) {
  const [isDarkMode, setDarkMode] = useLocalStorageState(false, "isDarkMode");

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  function changeMode() {
    setDarkMode((isDarkMode) => !isDarkMode);
  }

  return (
    <ModeContext.Provider value={{ isDarkMode, changeMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);

  if (!context) throw new Error("ModeContext used out of provider");
  return context;
}

export default ThemeContext;
