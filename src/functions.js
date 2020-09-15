import Cookies from "universal-cookie";

export function checkIfTokenExists() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  if (token) {
    return true;
  } else {
    return false;
  }
}
