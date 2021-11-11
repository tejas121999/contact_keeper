import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer'
import axios from 'axios'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../type'

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Load User 
    const loadUser = async () => {
        // @todo - load token into global header 
        try {
            const res = await axios.get('http://localhost:5000/api/auth')
        } catch (err) {

        }
    }

    // Register User
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('http://localhost:5000/api/user', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }
    };

    // Login User
    const loginUser = () => console.log('user login');

    // Logout
    const logoutUser = () => console.log('user logout');

    // Cleare Errors
    const cleareEror = () => dispatch({ type: CLEAR_ERRORS})


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                loginUser,
                logoutUser,
                cleareEror
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;