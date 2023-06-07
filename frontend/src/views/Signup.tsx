import React from 'react'
import {useState } from "react";
import axios from 'axios';
import "./signup.css";



interface AccountFormData {
  username:string
  email: string
  password: string
  confirmpassword: string
}


function Signup () {
  const [username, setUserName] = useState('')

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [confirmpassword, setConfirmPassword] = useState('')


  const [registerat, setRegisterat] = useState(false)
  const [usertrysigngup, setUserTrySignup] = useState(false)

  const [formData, setFormData] =
  useState<AccountFormData>({
    username: '',
    email: '',
    password: '',
    confirmpassword:'',
  });

  const [Errors, setErrors] = useState<Partial<AccountFormData>>({});

  const handleInputChange = (event: React.
    ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,

    }));

  };



  const handleSignup = (event: React.FormEvent) => {
  console.log('signup' + username +  email + password)
    setUserTrySignup(true)
    axios({
      method: 'post',
      url: '/api/Signup',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { username: username,email: email, password: password},
    })

      .then(response => { setRegisterat(true); console.log(registerat)})


      .catch(error => {
      setRegisterat(false)
      console.log(error)
    })

    event.preventDefault();
    // const errors: Partial<AccountFormData> = {};

// if (!formData.username) {
//   errors.username = "Please enter your user";
// }

// if (!formData.email) {
//   errors.email = "Please enter your email";
// }

// if (!formData.password) {
//   errors.password = "Please enter your password";
// }

// if (!formData.confirmpassword) {
//   errors.confirmpassword = "Please confirm your password";
// }


// if (Object.keys(errors).length > 0) {
//   setErrors(errors);
//   return;
//   }
//     console.log(formData);
//     setErrors({});

//     setFormData({

//   username:'',
//   email: '',
//   password: '',
//   confirmpassword:'',

// });
  };


  function handleInputChangeuser(e: { target: HTMLInputElement }) {
    setUserName(e.target.value)


  }

  function handleInputChangeemail(e: { target: HTMLInputElement }) {
    setEmail(e.target.value)

  }

  function handleInputChangepass(e: { target: HTMLInputElement }) {
    setPassword(e.target.value)

  }


  function handleInputChangeconfirm(e: { target: HTMLInputElement }) {
    setConfirmPassword(e.target.value)

  }



  return (

    <div className='formsign'>
      <h2 className='rubrik'>Sign Up</h2>
       <div className="form-sign" onSubmit={handleSignup}>
        <label className="label">
          User Name:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleInputChangeuser}
            className="input"
          />
          {Errors.username && <span className="error-message">{Errors.username}</span>}
          </label>
        <br />

        <label className="label">
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChangeemail}
            className="input"
          />
          {Errors.email&& <span className="error-message">{Errors.email}</span>}
        </label>
        <br />


        <label className="label">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChangepass}
            className="input"
          />
          {Errors.password && <span className="error-message">{Errors.password}</span>}
        </label>
        <br />


        <label className="label">
          Confirm Password:
          <input
            type="confirmpassword"
            name="confirmpassword"
            value={confirmpassword}
            onChange={handleInputChangeconfirm}
            className="input"
          />
          {Errors.confirmpassword && <span className="error-message">{Errors.confirmpassword}</span>}
        </label>
        <br />

        <button onClick={handleSignup} type="submit" className="btn">Sign Up</button>
        {usertrysigngup &&( registerat ? <p>Du är Registerat </p>:<p>Feläktigt account</p> )}

      </div>
    </div>
  )

}
export default Signup
