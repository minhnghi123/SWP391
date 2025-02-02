
import React, { createContext,  useState } from 'react';

 const AuthContext = createContext();
 const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);
    const value = {
        isAuthenticated,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
export {AuthContext,AuthProvider}

