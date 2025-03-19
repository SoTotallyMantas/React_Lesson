import { useState, useContext } from 'react'
import { RegisterEndpoint } from '../Api/UserAPI.jsx'
import { useNavigate } from 'react-router'
import AlertDismissible from '../Components/Alert.jsx'

function register() {
    const [show, setShow] = useState(false);
    const [variant, setVariant] = useState("danger");
    const [heading, setHeading] = useState("Error");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await RegisterEndpoint(username,password);
        
        if (result.success === true) {
            setVariant("success");
            setHeading("Succesful");
            setShow(true);
            setMessage(result.message);
            setTimeout(() => {
                navigate("/login");
            },3000)
           
        }
        else {
            setVariant("danger");
            setHeading("Error");
            setShow(true);
            setMessage(result.message);
        }
    };
    
    return (
        <>
            <main className="d-flex flex-column justify-content-center align-items-center min-vh-100">
                <div className="card m-5 p-5">
                    <div className="card-body">
                        <h5 className="card-title">Register</h5>
                        <form onSubmit={handleSubmit}>
                        <label for="inputUsername" class="form-label">Username</label>
                            <input type="text" id="inputUsername" class="form-control mb-3" value={username} onChange={(e) => setUsername(e.target.value)} />

                        <label for="inputPassword" class="form-label">Password</label>
                            <input type="password" id="inputPassword" class="form-control mb-3" value={password} onChange={(e) => setPassword(e.target.value)} />

                            <button type="submit" className="btn btn-primary w-50">
                                Register
                            </button>
                        </form>

                    </div>
                    <AlertDismissible variant={variant} heading={heading} message={message} show={show} setShow={setShow} />
                </div>
            </main>
        </>
    )
}

export default register
