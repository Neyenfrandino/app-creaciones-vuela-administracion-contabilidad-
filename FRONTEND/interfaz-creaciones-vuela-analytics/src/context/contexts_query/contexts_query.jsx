import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextLogin } from '../context_login/context.login';

// Importaciones de utilidades
// User
import { 
  profile_create, 
  profile_get, 
  profile_update, 
  profile_delete 
} from '../../utlis/user';

// Ventas
import { 
  sell_get, 
  sell_create, 
  sell_update, 
  sell_delete
} from '../../utlis/ventas';

// Productos
import { 
  products_get, 
  products_create, 
  products_update, 
  products_delete
} from '../../utlis/products';

// Mapeo de solicitudes para centralizar la gestión
const REQUESTS_MAP = {
  'profile-get': profile_get,
  'profile-create': profile_create,
  'profile-update': profile_update,
  'profile-delete': profile_delete,
  'sell-get': sell_get,
  'sell-create': sell_create,
  'sell-update': sell_update,
  'sell-delete': sell_delete,
  'products-get': products_get,
  'products-create': products_create,
  'products-update': products_update,
  'products-delete': products_delete
};

const INITIAL_STATE = {
  keyQuery: {},
  dataUser_db: '',
  keys: '',
  values: '',
  statusQuery: { status: false, data: null }
};

const actionTypes = {
  SET_KEY_QUERY: 'SET_KEY_QUERY',
  SET_USER_DATA: 'SET_USER_DATA',
  CLEAR_DATA: 'CLEAR_DATA',
  SET_STATUS_QUERY: 'SET_STATUS_QUERY'
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_KEY_QUERY: {
      const { payload } = action;
      const [key] = Object.keys(payload);
      const [value] = Object.values(payload);
      return {
        ...state,
        keyQuery: payload,
        keys: key,
        values: value,
        action: payload['action'],
      };
    }

    case actionTypes.SET_USER_DATA: {
      const key = Object.keys(action.payload)[0];
      return ['products', 'sell', 'profile'].includes(key)
        ? { ...state, [key]: action.payload[key] }
        : { ...state, dataUser_db: action.payload };
    }

    case actionTypes.CLEAR_DATA:
      return INITIAL_STATE;

    case actionTypes.SET_STATUS_QUERY:
      return { ...state, statusQuery: action.payload };

    default:
      return state;
  }
};

const toSessionCache = async (nameVarCache, dataUpdate, values, user_true, handleError, actions, statusQuery) => {
  const keyRequest = `${nameVarCache}-${dataUpdate || 'get'}`;
  let cachedData;

  // Intenta recuperar datos del caché
  try {
    cachedData = sessionStorage.getItem(keyRequest);

    if (cachedData && user_true) {
      actions.setDataUser_db({ [nameVarCache]: JSON.parse(cachedData) });
      return; // No necesitamos hacer fetch si ya está en caché
    }
  } catch (error) {
    console.warn(`Error parsing session cache for ${keyRequest}:`, error);
  }

  // Si no hay datos en caché o hay un error, realiza la solicitud
  if(user_true){
    await fechtData(nameVarCache, dataUpdate, values, user_true, handleError, actions, statusQuery);
  }
};

const fechtData = async (nameVarCache, dataUpdate, values, user_true, handleError, actions, statusQuery) => {
  // const keyRequest = `${nameVarCache}-${dataUpdate || 'get'}`;
  const keyRequest = `${nameVarCache}-${statusQuery.status ? 'get': dataUpdate || 'get'}`;
  const requestFunc = REQUESTS_MAP[keyRequest];

  if (!requestFunc) {
    actions.setStatusQuery({ status: false, message: `Request function for ${keyRequest} not found` });
    return;
  }

  try {
    const response = await requestFunc({ user_true, values });
    
    if ([200, 201, 204].includes(response.status)) {
      const data = response.dataTrue || null;

      if (dataUpdate === 'get' || statusQuery.setNewState) {
        sessionStorage.setItem(keyRequest, JSON.stringify(data));
        actions.setDataUser_db({ [nameVarCache]: data });
        actions.setStatusQuery({ status: false, setNewState: null });
        return;

      } else {
        actions.setStatusQuery({ status: true, setNewState: nameVarCache });
      }
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    handleError(error, `Error fetching data for ${keyRequest}`);
    actions.setStatusQuery({ status: false, message: error.message });
  }
};

export const ContextQuery = createContext(INITIAL_STATE);

export const ContextQueryProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user_true, setUserTrue } = useContext(ContextLogin);

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { keys, values, action, dataUser_db, statusQuery } = state;

  const handleError = useCallback((error, message) => {
    console.error(message, error);
    return null;
  }, []);

  const actions = useMemo(() => ({
    setkeyQuery: (newQuery) => {
      dispatch({ type: actionTypes.SET_KEY_QUERY, payload: newQuery });
    },
    setDataUser_db: (data) => {
      dispatch({ type: actionTypes.SET_USER_DATA, payload: data });
    },
    clearData: () => {
      dispatch({ type: actionTypes.CLEAR_DATA });
    },
    setStatusQuery: (status) => {
      dispatch({ type: actionTypes.SET_STATUS_QUERY, payload: status });
    }
  }), []);

  useEffect(() => {
    if (keys && action) {
      (async () => {
        await toSessionCache(keys, action, values, user_true, handleError, actions, statusQuery);
      })();
    }
  }, [keys, action, values, user_true, actions]); // Dependencias mínimas necesarias

  useEffect(() => {
    if (statusQuery.status) {
      (async () => {
        await toSessionCache(statusQuery.setNewState, action, values, user_true, handleError, actions, statusQuery);
      })();
    }
  }, [ statusQuery ]); // Solo ejecutar una vez


  return (  
    <ContextQuery.Provider value={{ ...state, ...actions }}>
      {children}
    </ContextQuery.Provider>
  );
};
