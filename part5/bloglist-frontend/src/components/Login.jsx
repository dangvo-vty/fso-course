import { useState } from "react"
import loginService from "../services/login"

const Login = ({handleLogin}) => {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    

  const logging =  (event) => {
    event.preventDefault()
    console.log(username,password)
    handleLogin(username,password)
    setUserName('')
    setPassword('')
   
  }

    return (
        <form onSubmit={logging}> 
            <div>
              username 
              <input type='text' value={username} name='username' onChange={({target}) => setUserName(target.value)} />
            </div>
            <div>
              password 
              <input type='password' value={password} name='password' onChange={({target}) => setPassword(target.value)} />
            </div>
            <button type='submit'>LOGIN</button>
          </form>
      )
}

export default Login
    