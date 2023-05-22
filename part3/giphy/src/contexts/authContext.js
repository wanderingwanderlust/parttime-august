import { createContext, useContext } from "react";
import useProviderAuth from "../helpers/useProviderAuth";

const authContext = createContext(null);

function AuthProvider({children}) {
    const auth = useProviderAuth();

    return(
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

function useAuth() {
    return useContext(authContext)
}


export {AuthProvider, useAuth}