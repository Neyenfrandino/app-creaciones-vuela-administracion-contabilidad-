import React, { createContext, useState, useEffect, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextLogin } from '../context_login/context.login';

import create_user from '../../utlis/user/create_user';
import get_user from '../../utlis/user/get_user';
import update_user from '../../utlis/user/update_user';
import delete_user from '../../utlis/user/delete_user';

export const ContextQuery = createContext({
  keyQuery: {},
  setkeyQuery: () => {},
  dataUser_db: '',
  setDataUser_db: () => {},
});

export const ContextQueryProvider = ({ children }) => {
  const { user_true } = useContext(ContextLogin);
  const navigate = useNavigate();

  const INITIAL_STATE = {
    keyQuery: {},
    dataUser_db: '',
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'setkeyQuery':
        return {
          ...state,
          keyQuery: action.payload,
        };
      case 'setDataUser_db':
        return {
          ...state,
          dataUser_db: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Funciones para actualizar el estado
  const setkeyQuery = (newQuery) => {
    dispatch({ type: 'setkeyQuery', payload: newQuery });
  };

  const setDataUser_db = (data) => {
    dispatch({ type: 'setDataUser_db', payload: data });
  };
  
  console.log(state, 'jajajjajajajjaja')
  // Cargar datos de sessionStorage al inicio
  useEffect(() => {
    const storedUser = sessionStorage.getItem('get_users');
    if (storedUser) {
      setDataUser_db(JSON.parse(storedUser));
    }
  }, []);

  // Crear usuario
  useEffect(() => {
    if (state.keyQuery['register-user'] && state.keyQuery.password && state.keyQuery.confirmPassword && state.keyQuery.email) {
      const fetchData = async () => {
        try {
          const response = await create_user(state.keyQuery);
          if (response) {
            navigate('/login');
          }
        } catch (error) {
          console.error('Error al crear el usuario:', error);
        }
      };
      fetchData();
    }
  }, [state.keyQuery, navigate]);

  // Obtener usuario
  useEffect(() => {
    if (state.keyQuery === 'get_users' && !state.dataUser_db && user_true) {
      const fetchData = async () => {
        try {
          const userData = {
            token: user_true['access_token'],
            token_type: user_true['token_type'],
            user_id: user_true['user_id']
          };
          const response = await get_user(userData);
          if (response) {
            setDataUser_db(response);
            sessionStorage.setItem('get_users', JSON.stringify(response));
          }
        } catch (error) {
          console.error('Error al obtener el usuario:', error);
        }
      };
      fetchData();
    }
  }, [state.keyQuery, state.dataUser_db, user_true]);

  // Actualizar usuario
  useEffect(() => {
    if (state.keyQuery.typeFunc === 'update_user' && user_true) {
      const fetchData = async () => {
        try {
          const response = await update_user(state.keyQuery.newState, user_true);
          if (response) {
            const updatedData = {
              ...state.dataUser_db,
              ...state.keyQuery.newState
            };
            setDataUser_db(updatedData);
            sessionStorage.setItem('get_users', JSON.stringify(updatedData));
          }
        } catch (error) {
          console.error('Error al actualizar el usuario:', error);
        }
      };
      fetchData();
    }
  }, [state.keyQuery, user_true, state.dataUser_db]);

  // Eliminar usuario
  useEffect(() => {
    if (state.keyQuery === 'delete_user' && user_true) {
      const fetchData = async () => {
        try {
          const response = await delete_user(user_true);
          if (response) {
            navigate('/login');
            setDataUser_db(null);
            sessionStorage.removeItem('get_users');
          }
        } catch (error) {
          console.error('Error al eliminar el usuario:', error);
        }
      };
      fetchData();
    }
  }, [state.keyQuery, user_true, navigate]);

  // Logout
  useEffect(() => {
    if (state.keyQuery === 'logout') {
      sessionStorage.clear();
      setDataUser_db(null);
      navigate('/login');
    }
  }, [state.keyQuery, navigate]);

  const values = {
    ...state,
    setkeyQuery,
    setDataUser_db,
  };

  return (
    <ContextQuery.Provider value={values}>
      {children}
    </ContextQuery.Provider>
  );
};
  