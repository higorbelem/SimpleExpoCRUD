import { useContext } from 'react';
import { AuthContext } from '../contexts/LoginContext';

export function useAuth() {
    const value = useContext(AuthContext);
    return value;
}