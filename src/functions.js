import Cookies from "universal-cookie";

export function checkIfTokenExists() {
  const cookies = new Cookies();
  const access_token = cookies.get("token");
  if (access_token) {
    return true;
  } else {
    return false;
  }
}
