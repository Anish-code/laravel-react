import { useEffect } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const { user, token, setUser, setToken, notification } = useStateContext();

    // Redirect to login page if token is not present
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Logout function
    const onLogout = async (ev) => {
        ev.preventDefault();
        try {
            await axiosClient.post("/logout");
            setUser({});
            setToken(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axiosClient.get("/user");
                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, [setUser]);

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/user">Users</Link>
            </aside>

            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user && user.name && (
                            <>
                                {user.name}
                                <a
                                    href="#"
                                    onClick={onLogout}
                                    className="btn-logout"
                                >
                                    Logout
                                </a>
                            </>
                        )}
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>

            {notification && <div className="notification">{notification}</div>}
        </div>
    );
}
