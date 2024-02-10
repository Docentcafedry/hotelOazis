import ButtonIcon from "../../ui/ButtonIcon";
import { CiLogout } from "react-icons/ci";
import { logout as logoutApi } from "../../services/apiAuth";
import { useLogout } from "./hooks/useLogout";

function Logout() {
  const { logout, isLoadingLogout } = useLogout();
  return (
    <ButtonIcon onClick={() => logout()} disabled={isLoadingLogout}>
      <CiLogout />
    </ButtonIcon>
  );
}

export default Logout;
