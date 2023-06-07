import React from 'react'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import "./login.css";


interface accountInterface {
  id: string
  email: string
  password: string

}


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [inloggad, setInloggad] = useState(false)
  const [usertrylogin, setUserTryLogin] = useState(false)

  function handleChange(e: { target: HTMLInputElement }) {
    setEmail(e.target.value)


  }

  function handleChangePass(e: { target: HTMLInputElement }) {
    setPassword(e.target.value)

  }


  function handleLogin() {

    setUserTryLogin(true)

      console.log('fetch in data')
    axios({
      method: 'post',
      url: '/api/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { email: email, password: password },

    })
      .then(response => setInloggad(true))

      .catch(error => {
        setInloggad(false)
        console.log(error)
      })

  }


  return (
      <div className='formlogin'>
      <h3 className='rubrik'>Sign in to your account</h3>

      <div className='form-login'>

        <label className='label'>
        <input type="email"
          className='input'
          placeholder='Email/Username'
          onChange={handleChange}
          value={email}
        // value={values.email}

      >
        </input>
        </label>

        <label className='label'>

        <input type='password'
          className='input'
          placeholder='Password'
          onChange={handleChangePass}
          value={password}
        >
          </input>
          </label>


        <label className='forget'>
          Forget Password?
        </label>


        <button onClick={handleLogin} type='submit'
          className="btn1">Sign in</button>
        {usertrylogin &&( inloggad ? <p>Du är Inloggad </p> :<p>Feläktigt användarname eller lösenord </p> )}

        <p className='btn2'>----Or connect with----</p>
      </div>

      <div className='ikonbtn'>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"

        className="button">

        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />

      </svg>


      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
        className="button" >

        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />

      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"


        className="button">

        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />


        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />

        </svg>

        </div>


      <Link className="btn2" to="/Signup">
        No account? SignUp
      </Link>



    </div>




    )

}



export default Login
