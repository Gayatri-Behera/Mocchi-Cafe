import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import coffeeimg from '../assets/Images/HD-wallpaper-plaid-book-a-cup-of-coffee-comfort.jpg'

export default function SignUP() {
    const navigate = useNavigate();
    const [ credentials, setCredentials ] = useState({name: "", email: "", password: "", geolocation: ""});
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:5000/api/createuser';
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        })
        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter Valid Credentials");
        }

        if (json.success) {
            alert("You have succesfully signed up!")
            navigate('/');
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    return (
        <><div data-bs-theme="dark"><img src={coffeeimg} alt='....' style={{ position: "absolute", top: '0px'}} />
            <div className='container' style={{ position: 'relative', marginTop: '130px', marginLeft: '100px', color: 'whitesmoke' }}>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label for="name" className="form-label">Name:</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" name='geolocation' value={credentials.geolocation} onChange={onChange} />
            </div>
                <button type="submit" className="btn btn-success">Submit</button>
                <Link to='/login' className='m-3 btn btn-danger'>Already a user!</Link>
        </form></div></div></>
    )
}
