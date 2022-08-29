import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";    
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;




export const AuthProvider = ({ children }) => {

    const [authTokens, setAuthTokens] = useState(() =>
            localStorage.getItem("authTokens")
             ? JSON.parse(localStorage.getItem("authTokens"))
            : null
            );

    const [user, setUser] = useState(() =>
            localStorage.getItem("authTokens")
              ? jwt_decode(localStorage.getItem("authTokens"))
              : null
          );
const [loading, setLoading] = useState(true);

 const navigate = useNavigate();
 

    const loginUser = async (username, password) => {
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                username,
                password
              })
            });
            const data = await response.json();
            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem("authTokens", JSON.stringify(data));
                // history.push("/");
                navigate("/appointments",{ replace: true});
                window.location.reload();
              } else {
                alert("Something went wrong!");
              }
        };
        
    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/",{ replace: true});
        };

    // const user = "MAr jaaa";

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        loginUser,
        logoutUser
    };

    useEffect(() => {
        if (authTokens) {
          setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

      return (
        <AuthContext.Provider value={contextData}>
          {children}
        </AuthContext.Provider>
      );
}