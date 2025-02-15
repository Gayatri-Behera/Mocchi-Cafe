import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import coffeeimg from '../assets/Images/latte.webp'


const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:5000/api/loginuser';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter Valid Credentials");
        }
        if (json.success) {
            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authToken", json.authToken);
            console.log(localStorage.getItem("authToken"));
            navigate('/');
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }
    return (
        <><div data-bs-theme="dark"><img src={coffeeimg} alt='....' style={{ position: "absolute", top: '0px' }} />
            <div className='container' style={{ zIndex: 1000, position: 'relative', marginTop: '130px', marginLeft: '100px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to='/createuser' className='m-3 btn btn-danger'>I'm a new user</Link>
                </form></div>
        </div>
        </>
    )
};

export default Login;