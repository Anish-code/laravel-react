import { Link } from "react-router-dom";

export default function Signup() {
    const onSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="tittle">Signup for Free</h1>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Conform Password" />
                    <button className="btn btn-block" type="submit">
                        Signup
                    </button>
                    <p className="message">
                        Already Registered?
                        <Link to="/login"> Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
