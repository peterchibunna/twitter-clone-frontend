import {createContext, FC, JSX, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {API_SERVER_URL} from "../../utils";
// @ts-expect-error: createContext requires initial value as a parameter
const AuthContext = createContext();

const AuthProvider: FC<{ children: JSX.Element | JSX.Element[] }> = ({children}) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") as string));
  const navigate = useNavigate();

  const loginAction = async (data: any) => {
    try {
      const response = await fetch(`${API_SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.status === true) {
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/");
        return res;
      } else {
        throw new Error(res.error_message);
      }
    } catch (err) {
      return (err);
    }
  };

  const registerAction = async (data: any) => {
    try {
      const response = await fetch(`${API_SERVER_URL}/api/v1/person/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();

      if (res.date_joined) {
        setUser(res);
        localStorage.setItem("user", JSON.stringify(res));
        navigate("/");
        return res;
      } else {
        throw new Error(res.error_message);
      }
    } catch (err) {
      return (err);
    }
  };

  const logOut = () => {
    setUser(null);
    // todo: log out on the server then, clear token here
    // setToken("");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{user, loginAction, logOut, registerAction}}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
