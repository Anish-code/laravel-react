// Remove unused import
// import PropTypes from "prop-types";

import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
});

export const ContextProvider = ({ children }) => {
    // Add prop types validation
    const [user, setUser] = useState({
        name: null,
    });
    const [notification, _setNotification] = useState("");

    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };
    const [token, _setToken] = useState(null);
    // localStorage.getItem("ACCESS_TOKEN") || null
    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
                notification,
                setNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

ContextProvider.propTypes = {
    children: PropTypes.node, // Validate children prop
};

export const useStateContext = () => useContext(StateContext);
