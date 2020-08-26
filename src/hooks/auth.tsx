import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, removeUser } from '../store/modules/user/actions';
import api from '../services/api';
import storage from '@react-native-community/async-storage';
import jwt from 'jwt-decode';
import { User } from '../@types/user';

type Payload = {
  name: string;
  id: number;
  email: string;
  image: {
    imageUrl: string;
  } | null;
};

interface AuthContextData {
  login(email: string, password: string): Promise<boolean>;
  logout(): Promise<boolean>;
  isAuthenticated: boolean;
  verifyToken(): Promise<Payload | null>;
  checkEmail(email: string): Promise<User>;
  data: Payload | null;
  isLoading: boolean;
}

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<Payload | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsAuthenticated(!!data);
  }, [data]);

  useEffect(() => {
    async function loadFromStorage() {
      const token = await storage.getItem('token');

      if (token)
        try {
          const decoded: any = jwt(token);

          if (decoded) {
            const payload: Payload = {
              name: decoded.name,
              id: decoded.sub,
              email: decoded.email,
              image: decoded.imageUrl
                ? {
                    imageUrl: decoded.imageUrl,
                  }
                : null,
            };
            setData(payload);

            api
              .get(`/users/${payload.id}`)
              .then(response => {
                dispatch(setUser(response.data));
              })
              .catch(err => {
                if (err.response) console.log(err.response.data.error);
              })
              .finally(() => {
                setIsLoading(false);
              });
          }
        } catch (e) {
          setIsLoading(false);
        }
      else setIsLoading(false);
    }

    loadFromStorage();
  }, [dispatch]);

  const verifyToken = useCallback(async (): Promise<Payload | null> => {
    let payload: Payload | null = null;

    const token = await storage.getItem('token');

    if (token) {
      try {
        const decoded: any = jwt(token);

        if (decoded)
          payload = {
            name: decoded.name,
            id: decoded.sub,
            email: decoded.email,
            image: decoded.imageUrl
              ? {
                  imageUrl: decoded.imageUrl,
                }
              : null,
          };
      } catch (e) {
        console.log('error token decoding verify', e);
      }
    }

    return payload;
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        api
          .post('/login', { email, password })
          .then(async _response => {
            const response = _response.data;
            await storage.setItem('token', response.token);
            dispatch(setUser(response.user));
            resolve(true);
          })
          .catch(err => {
            if (err.response) {
              if (err.response.status === 401) reject(new Error('Usuário ou senha incorretos'));
            } else reject(new Error(err.message));
          });
      });
    },
    [dispatch],
  );

  const checkEmail = useCallback((email: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      api
        .get(`/user/show/${email}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status === 401) reject(new Error('E-mail não encontrado'));
          } else reject(new Error(err.message));
        });
    });
  }, []);

  const logout = useCallback((): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      api
        .post('/logout')
        .then(async () => {
          await storage.removeItem('token');
          setData(null);
          dispatch(removeUser());
          resolve(true);
        })
        .catch(err => {
          reject(new Error(err));
        });
    });
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, data, verifyToken, checkEmail, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error('This hook must be in Auth Context Component');

  return context;
}

export default AuthProvider;
