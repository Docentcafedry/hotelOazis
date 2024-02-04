import { createContext, useContext, useRef, useState } from "react";
import styled from "styled-components";
import { CiMenuKebab } from "react-icons/ci";
import { useEffect } from "react";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openedMenuId, setOpenedMenuId] = useState("");
  const [position, setPosition] = useState(null);
  const open = (id) => setOpenedMenuId(id);
  const close = () => setOpenedMenuId("");

  return (
    <MenusContext.Provider value={{ openedMenuId, open, close, setPosition }}>
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ menuId }) {
  const { openedMenuId, open, close, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    console.log(rect);
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    if (openedMenuId === "" || openedMenuId !== menuId) {
      open(menuId);
    } else close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <CiMenuKebab />
    </StyledToggle>
  );
}

function MenuList({ children, menuId }) {
  const {
    close,
    open,
    openedMenuId,
    position: rectPosition,
  } = useContext(MenusContext);

  const ref = useRef();

  useEffect(
    function () {
      function handler(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }
      document.addEventListener("click", handler, true);

      return () => document.removeEventListener("click", handler, true);
    },
    [close]
  );

  if (openedMenuId !== menuId) return null;

  return (
    <StyledList ref={ref} position={{ rectPosition }}>
      {children}
    </StyledList>
  );
}

function Button({ children, onClick = {} }) {
  return (
    <li>
      <StyledButton onClick={onClick}>{children}</StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.MenuList = MenuList;
Menus.Button = Button;

export default Menus;
