import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ Username: "", Password: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [invalidLogin, setInvLogin] = useState(false);
  const [createAccount, setCreate] = useState(false);

  useEffect(() => {
    async function fetchData() {
      console.log("Login Was Attempted");

      const res = await axios.get("http://localhost:5001/login", {
        params: {
          username: user.Username,
          password: user.Password,
        },
      });

      if (res.data.loggedIn) {
        setLoggedIn(true);
        navigate("/map");
      } else {
        setInvLogin(true);
      }
    }
    if (user.Username !== "" && user.Password !== "") {
      fetchData();
    }
  }, [user]);

  return (
    <DataContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        user,
        setUser,
        invalidLogin,
        setInvLogin,
        createAccount,
        setCreate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
