import { createContext, useContext,useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FavoriteGet,LoginEndpoint } from '../Api/UserAPI.jsx';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(localStorage.getItem("isAuthenticated")) === true || null);
    const [Message, setMessage] = useState(""); 
    const [Favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user?.id) return;
            try {
                const data = await FavoriteGet(user.id);
                    console.log(data,"DATA FETCH");
                setFavorites(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchFavorites();
        
    }, [user])
    const updateFavorites = async (userId) => {
        try {
            const updatedFavorites = await FavoriteGet(userId);
            setFavorites([...updatedFavorites]);
        } catch (error) {
            console.error("Error Updating Favorites:", error);
        }
    };
    const login = async (username,password) => {
        try {

              const response = await  LoginEndpoint(username,password)

            if (response.success) {

                setIsAuthenticated(true);
                localStorage.setItem("isAuthenticated", true);
                localStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data);
                setMessage(response.message);
                return { success: true, message: response.message || "Login Succesful" };
            } else {
                setIsAuthenticated(false);
                setMessage(response.message);
                return { success: false, message: response.message || "Login UnSuccesful" };
            }
        }
        catch (error) {
            setMessage(response.message);
            return { success: false, message: response.message || "Login UnSuccesful" };
        }
    };

    const logOut = () => {
        setUser(null)
        setIsAuthenticated(null);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        navigate("/login");

    };

    return (
        <AuthContext.Provider value={{ user,isAuthenticated,Message, login,updateFavorites, logOut ,Favorites}}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};