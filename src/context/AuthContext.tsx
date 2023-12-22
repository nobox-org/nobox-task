'use client';

import { IAuthContext, IUser, ReactProps } from '@/types';
import { getUser, login as loginUser, logout as logoutUser } from '@/utils/auth';
import {createContext, useContext, useMemo, useState} from 'react';


const AuthContext = createContext<IAuthContext>({
    user: null,
    logout(){},
    async login(){}
});



export const useAuthContext = ()=>useContext(AuthContext);

export const AuthContextProvider = ({children}:ReactProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
   
   
    const user = useMemo(()=>{
        const dt = getUser();

        if (!dt) return null;

        // setIsAuthenticated(true);
        return dt;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isAuthenticated])

    const context = {
        user,
        async login(data:any) {
            await loginUser(data)
            setIsAuthenticated(true)
            // .catch(err=>console.error(err));
        },
        logout() {
            logoutUser()
            setIsAuthenticated(false)
        }
    }
    
    return (
        <AuthContext.Provider value={context}>

            <AuthContext.Consumer>
                {()=>children}
            </AuthContext.Consumer>
            {/* {children} */}
        </AuthContext.Provider>
    )
}
