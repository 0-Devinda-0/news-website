'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser, getAccessToken } from '@auth0/nextjs-auth0';
import { jwtDecode } from 'jwt-decode';

interface UserRolesContextType {
    roles: string[];
    isLoadingRoles: boolean;
    errorRoles: Error | undefined;
    isAuthenticated: boolean;
}

const UserRolesContext = createContext<UserRolesContextType | undefined>(undefined);

interface DecodedToken {
    [key: string]: unknown;
    'https://my-app.example.com/roles'?: string[];
}

export function UserRolesProvider({ children }: { children: ReactNode }) {
    const { user, isLoading } = useUser();
    const [roles, setRoles] = useState<string[]>([]);
    const [isLoadingRoles, setIsLoadingRoles] = useState(true);
    const [errorRoles, setErrorRoles] = useState<Error | undefined>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchRoles = async () => {
            if (!isLoading && user) {
                setIsAuthenticated(true);
                try {
                    const accessToken = await getAccessToken();
                    const decoded = jwtDecode<DecodedToken>(accessToken);
                    const userRoles = decoded['https://my-app.example.com/roles'] || [];
                    console.log('🛠 Extracted roles from access token:', userRoles);
                    setRoles(userRoles);
                } catch (err) {
                    console.error('Error decoding access token:', err);
                    setErrorRoles(err as Error);
                } finally {
                    setIsLoadingRoles(false);
                }
            } else if (!isLoading) {
                setIsAuthenticated(false);
                setRoles([]);
                setIsLoadingRoles(false);
            }

        };

        fetchRoles();
    }, [user, isLoading]);

    const contextValue: UserRolesContextType = {
        roles,
        isLoadingRoles,
        errorRoles,
        isAuthenticated,
    };

    return (
        <UserRolesContext.Provider value={contextValue}>
            {children}
        </UserRolesContext.Provider>
    );
}

export function useUserRoles() {
    const context = useContext(UserRolesContext);
    if (context === undefined) {
        throw new Error('useUserRoles must be used within a UserRolesProvider');
    }
    return context;
}
