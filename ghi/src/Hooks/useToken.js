import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "./useFavorites";
let internalToken = null;

export function getToken() {
    return internalToken;
}


export async function getTokenInternal() {
    const url = `${process.env.REACT_APP_ACCOUNTS_SERVICE_API_HOST}/token/`;
    try {
        const response = await fetch(url, {
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            internalToken = data.access_token;
            return internalToken;
        }
    } catch (e) { }
    return false;
}


function handleErrorMessage(error) {
    if ("error" in error) {
        error = error.error;
        try {
            error = JSON.parse(error);
            if ("__all__" in error) {
                error = error.__all__;
            }
        } catch { }
    }
    if (Array.isArray(error)) {
        error = error.join("<br>");
    } else if (typeof error === "object") {
        error = Object.entries(error).reduce(
            (acc, x) => `${acc}<br>${x[0]}: ${x[1]}`,
            ""
        );
    }
    return error;
}


export const AuthContext = createContext({
    token: null,
    setToken: () => null,
});
AuthContext.displayName = 'AuthContext';


export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuthContext = () => useContext(AuthContext);


export function useToken() {

    const { token, setToken } = useAuthContext();
    const [getFavorites] = useFavorites();
    const navigate = useNavigate();

    useEffect(() => {
        const loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
        
        async function fetchToken() {
            const token = await getTokenInternal();
            setToken(token);
        }


        if (!token && loginStatus) {
            fetchToken();
        }

    }, [setToken, token]);

    async function logout() {
        if (token) {
            const url = `${process.env.REACT_APP_ACCOUNTS_SERVICE_API_HOST}/token`;
            await fetch(url, { method: "delete", credentials: "include" });
            internalToken = null;
            setToken(null);
            navigate("/");
        }

    }

    async function login(username, password) {
        const url = `${process.env.REACT_APP_ACCOUNTS_SERVICE_API_HOST}/token`;
        const form = new FormData();
        form.append("username", username);
        form.append("password", password);
        const response = await fetch(url, {
            method: "post",
            credentials: "include",
            body: form,
        });
        if (response.ok) {
            const token = await getTokenInternal();
            setToken(token);
            const IDurl = `${process.env.REACT_APP_ACCOUNTS_SERVICE_API_HOST}/accounts/${username}`
            const IDresponse = await fetch(IDurl, {
                method: "get",
                credentials: "include",
                headers: { 'Content-Type': 'application/json' }
            })
            const IDdata = await IDresponse.json();
            getFavorites(IDdata.id, token)
            return {
                "email": IDdata.email,
                "ID": IDdata.id,
                "token": token
            };
        };
        let error = await response.json();
        return handleErrorMessage(error);
    }

    async function signup(password, email, firstName, lastName) {
        const url = `${process.env.REACT_APP_ACCOUNTS_SERVICE_API_HOST}/api/accounts/`;
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                password,
                email,
                first_name: firstName,
                last_name: lastName,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const user = await login(email, password);
            return {
                "email": user.email,
                "ID": user.ID,
                "token": user.token
            }
        }
        return false;
    }

    async function update(username, password, email, firstName, lastName) {
        const url = `${process.env.REACT_APP_ACCOUNTS_SERVICE_API_HOST}/api/accounts/`;
        const response = await fetch(url, {
            method: "patch",
            body: JSON.stringify({
                username,
                password,
                email,
                first_name: firstName,
                last_name: lastName,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            await login(username, password);
        }
        return false;
    }

    return [login, logout, signup, update];
}
