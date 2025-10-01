import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../services/firebase/firebase";
import { devError } from "../utils/logger";

interface AuthState {
    user: User | null;
    loading: boolean;
    error?: string;
}

interface AuthContextType {
    authState: AuthState;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);

    // Guard Clause
    if (context === undefined) { throw new Error('useAuth must be used within an AuthProvider'); };

    return context;
}

export function AuthProvider({ children } : { children: React.ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        loading: true,
        error: undefined
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthState({
                user: user,
                loading: false,
                error: undefined
            });
        }, (error) => {
            devError('Auth state error:', error);
            setAuthState({
                user: null,
                loading: false,
                error: error.message
            })
        });

        return () => { unsubscribe() }; // Cleanup Function
    }, [])

    const value: AuthContextType = useMemo(() => ({
        authState
    }), [authState])
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}