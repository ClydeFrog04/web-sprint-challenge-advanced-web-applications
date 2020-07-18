import * as React from "react";
import {useContext, useState} from "react";
import axios from "axios";
import {BubbleContext} from "../contexts/BubbleContext";



interface LoginProps {
}

const LoginForm:React.FC<LoginProps> = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const {loading, setLoading, history} = useContext(BubbleContext);

    const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        axios.post("http://localhost:5000/api/login", credentials)
            .then(res => {
                console.log(res);
                localStorage.setItem("token", res.data.payload);
                history.push("/bubble");
                setLoading(false);
            }).catch(err =>{
            console.log("Error logging in: ", err);
            setCredentials({username: credentials.username, password: ""});
            setLoading(false);
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return(
        <div className="login">
            {!loading ?
                <form className="form" onSubmit={submitLogin}>
                    <label className="label">
                        <input
                            className="input"
                            type="text"
                            name="username"
                            placeholder="username"
                            onChange={handleChange}
                            value={credentials.username}
                        />
                    </label>
                    <label className="label">
                        <input
                            className="input"
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={handleChange}
                            value={credentials.password}
                        />
                    </label>
                    <button className="button">LOG IN</button>
                </form>
                : <h2>Loading...</h2>}
        </div>
    );
}

export default LoginForm;