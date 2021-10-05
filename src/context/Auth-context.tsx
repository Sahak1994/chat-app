import { createContext, useEffect, useState } from 'react';

interface AuthContextType {
  token: string;
  isLoggedIn: boolean;
  onLogin: (token: string) => void;
  onLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: '',
  isLoggedIn: false,
  onLogin: (token: string) => {},
  onLogout: () => {},
});

const AuthContextProvider = ({children}: AuthContextProviderProps) => {
  const [token, setToken] = useState<string>(localStorage.getItem('tokenId') || '');

  const isLoggedIn = Boolean(token);

  useEffect(() => {
      localStorage.setItem('tokenId', token || '');
  }, [token, setToken])

  const login = (token: string) => {
    setToken(token);
  }

  const logout = () => {
    localStorage.removeItem('tokenId');
    setToken('');
  }

  const value: AuthContextType = {
    token,
    isLoggedIn,
    onLogin: login,
    onLogout: logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export default AuthContextProvider;
