// Remove unused import
// import PropTypes from "prop-types";

import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState(
        localStorage.getItem("ACCESS_TOKEN") || null
    );
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
