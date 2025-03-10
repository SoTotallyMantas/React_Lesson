import { useState, useEffect } from 'react';
import { useAuth } from "../Context/AuthContext.jsx";
import AlertDismissible from '../Components/Alert.jsx';
import { useNavigate } from 'react-router';
function login() {

    const [show, setShow] = useState(false);
    const [variant, setVariant] = useState("danger");
    const [heading, setHeading] = useState("Error");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { isAuthenticated, login, Message } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const { success, message } = await login(username, password);
        setVariant(success ? "success" : "danger");
        setHeading(success ? "Successful" : "Error");
        setMessage(message);
        setShow(true);

        if (success) {
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        }
    };
    

    return (
        <>
            <main className="d-flex flex-column justify-content-center align-items-center min-vh-100">
                <div className="card m-5 p-5">
                <div className="card-body">
                        <h5 className="card-title">Login</h5>
                      <form onSubmit={handleSubmit}>
                            <label htmlFor="inputUsername" className="form-label">Username</label>
                            <input type="text" id="inputUsername" className="form-control mb-3" value={username} onChange={(e) => setUsername(e.target.value)} />

                            <label htmlFor="inputPassword" className="form-label">Password</label>
                        <input type="password" id="inputPassword" className="form-control mb-3" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <button type="submit" className="btn btn-primary w-50">
                            Login
                            </button>
                        </form>
                    </div>
                    <AlertDismissible variant={variant} heading={heading} message={message} show={show} setShow={setShow} />
                </div>  
            </main>
        </>
    )
}

export default login
