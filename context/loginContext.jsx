const { createContext, useState, useContext, useEffect } = require("react");

export const LoginContext = createContext();

export default function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedSession = JSON.parse(localStorage.getItem("session"));
    console.log("storedSession", storedSession);

    if (storedSession) {
      setIsLoggedIn(true);
    }
  }, []);

  console.log("isLoggedIn", isLoggedIn);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</LoginContext.Provider>
  );
}

export function useLogin() {
  return useContext(LoginContext);
}
