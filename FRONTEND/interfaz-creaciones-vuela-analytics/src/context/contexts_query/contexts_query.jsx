import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextLogin } from '../context_login/context.login';

import create_user from '../../utlis/user/create_user';
import get_user from '../../utlis/user/get_user';
import update_user from '../../utlis/user/update_user';
import delete_user from '../../utlis/user/delete_user';

import get_ventas from '../../utlis/ventas/ventas';
import create_sell_product from '../../utlis/ventas/create_sell';

import get_products from '../../utlis/products/get_products';

const INITIAL_STATE = {
  keyQuery: {},
  dataUser_db: '',
  keys: '',
  values: ''
};

const actionTypes = {
  SET_KEY_QUERY: 'SET_KEY_QUERY',
  SET_USER_DATA: 'SET_USER_DATA',
  CLEAR_DATA: 'CLEAR_DATA'
};


const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_KEY_QUERY:
      return {
        ...state,
        keyQuery: action.payload,
        keys: Object.keys(action.payload)[0],
        values: Object.values(action.payload)[0]
      };
    case actionTypes.SET_USER_DATA:
      return {
        ...state,
        dataUser_db: action.payload
      };
    case actionTypes.CLEAR_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
};
export const ContextQuery = createContext(INITIAL_STATE);

export const ContextQueryProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user_true, setUserTrue } = useContext(ContextLogin);
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const { keys, values, dataUser_db, keyQuery } = state;

  const handleError = (error, message) => {
    console.error(message, error);
    return null;
  };

  const saveToSession = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  const actions = {
    setkeyQuery: (newQuery) => {
      dispatch({ type: actionTypes.SET_KEY_QUERY, payload: newQuery });
    },
    setDataUser_db: (data) => {
      dispatch({ type: actionTypes.SET_USER_DATA, payload: data });
    },
    clearData: () => {
      dispatch({ type: actionTypes.CLEAR_DATA });
    }
  };
  
  // Load cached data
  useEffect(() => {
    if (user_true && keys && values) {
      // console.log((`${keys}-${values}`));
      const cachedData = sessionStorage.getItem(`${keys}-${values}`);
      if (cachedData) {
        actions.setDataUser_db(JSON.parse(cachedData));
      }
    }
  }, [user_true, state.keys, state.values]);


  // Handle user creation
  useEffect(() => {
    const { keys, values, keyQuery } = state;
    if (
      keys === 'profile' &&
      values === 'create' &&
      keyQuery.newUser?.password &&
      keyQuery.newUser?.confirmPassword &&
      keyQuery.newUser?.email
    ) {
      const { newUser: { confirmPassword, profile, ...userData } } = keyQuery;
      
      const createNewUser = async () => {
        try {
          const response = await create_user(userData);
          if (response) navigate('/login');
        } catch (error) {
          handleError(error, 'Error creating user:');
        }
      };

      createNewUser();
    }
  }, [state.keyQuery, navigate]);

  // Handle user data fetching
  useEffect(() => {
    const shouldFetchUser = keys === 'profile' && 
      values === 'get' && 
      !dataUser_db && 
      user_true && 
      !sessionStorage.getItem('profile-get');

    if (shouldFetchUser) {
      const fetchUserData = async () => {
        try {
          const userData = {
            token: user_true.access_token,
            token_type: user_true.token_type,
            user_id: user_true.user_id
          };

          const response = await get_user(userData);
          if (response.status === 200) {
            const userDataResponse = { userData: response.data };
            actions.setDataUser_db(userDataResponse);
            saveToSession('profile-get', userDataResponse);
          }
        } catch (error) {
          handleError(error, 'Error fetching user:');
          actions.setDataUser_db(null);
        }
      };

      fetchUserData();
    }
  }, [state.keyQuery, state.dataUser_db, user_true, ]);

  // Handle user update
  useEffect(() => {
    if (values?.typeFunc === 'update' && keys === 'profile' && user_true) {
      const updateUserData = async () => {
        try {
          const response = await update_user(values.newState, user_true);
          if (response) {
            const updatedData = {
              userData: { ...dataUser_db, ...values.newState }
            };
            actions.setDataUser_db(updatedData);
            saveToSession('profile-get', updatedData);
          }
        } catch (error) {
          handleError(error, 'Error updating user:');
        }
      };

      updateUserData();
    }
  }, [state.keyQuery, user_true, state.dataUser_db]);

  // Handle user deletion
  useEffect(() => {
    if (values === 'delete' && user_true) {
      const deleteUserData = async () => {
        try {
          const response = await delete_user(user_true);
          if (response) {
            actions.setDataUser_db(null);
            sessionStorage.removeItem('profile-get');
            setUserTrue(null);
          }
        } catch (error) {
          handleError(error, 'Error deleting user:');
        }
      };

      deleteUserData();
    }
  }, [state.keyQuery, user_true, setUserTrue]);

  // Handle sales data fetching sell-products
  useEffect(() => {
    if (keys === 'sell-products' && values === 'get' && user_true && !sessionStorage.getItem(`${keys}-${values}`)) {
     
      const fetchSalesData = async () => {
        try {
          const response = await get_ventas(user_true);
          const salesData = { sell_products: response };
          actions.setDataUser_db(salesData);
          saveToSession(`${keys}-${values}`, salesData);
        } catch (error) {
          handleError(error, 'Error fetching sales:');
        }
      };

      fetchSalesData();
    }
  }, [state.keyQuery, user_true, ]);

  // Handle sell-product creation
  useEffect(() => {
    if ( keys === "sell-products" && values.typeFunc === 'create' && keyQuery ) {
      const newData = {
        user_id : user_true.user_id,
        ...values.newState
      }
      
      const fetchData = async () => {
        try {
          const response = await create_sell_product(user_true, newData);
          if(response === 'error'){
            console.log('estoy en error')
            return;
          }

          if (response.message == 'SellProduct created successfully') {
            sessionStorage.removeItem(`sell-products-get`);
          }
        } catch (error) {
          handleError(error, 'Error creating sell-product:');
        }
      };

      fetchData();
    }
  }, [state.keyQuery, user_true]);


  // // Handle products
  useEffect(() => {
    if (user_true && state.keyQuery['sell-products'] === 'get_products' && !sessionStorage.getItem(`${keys}-${values}`)) {

      const fetchData = async () => {
        try {
          const data = await get_products(user_true);
          const salesData = {products: data };
          actions.setDataUser_db(salesData);
          saveToSession(`${keys}-${values}`, salesData);
          
 
        } catch (error) {
          handleError(error, 'Error getting products:');
        }
      };

      fetchData();
    }
  }, [state.keyQuery, user_true, state.keys, state.values]);


  // Handle user logout
  useEffect(() => {
    if (user_true === null) {
      sessionStorage.clear();
      actions.clearData();
    }
  }, [user_true]);

  return (
    <ContextQuery.Provider value={{ ...state, ...actions }}>
      {children}
    </ContextQuery.Provider>
  );
};