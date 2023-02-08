import React, {useState, useEffect, useReducer} from 'react'
import './LoginForm.css'

function reducer(state, action){
  if(action.type==="SET_EMAIL"){
    return {emailEntered:action.payload, isEmailValid:(action.payload.includes('@') && action.payload.length >= 8), passwordEntered:state.passwordEntered, isPasswordValid:state.isPasswordValid}
  }else if(action.type === 'SET_PASSWORD'){
    return {emailEntered:state.emailEntered, isEmailValid:state.isEmailValid, passwordEntered:action.payload, isPasswordValid:(action.payload.length >= 8)}
  }
}

const LoginForm = (props) =>{

  const [formValid, setFormValid] = useState(false);
  const [credentials, dispatch] = useReducer(reducer, {emailEntered:'', isEmailValid:false, passwordEntered:'', isPasswordValid:false})

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setFormValid(credentials.isEmailValid && credentials.isPasswordValid)
      console.log('formValid', formValid)
    }, 300);
    return ()=>{
      console.log('Cleanup triggered')
      clearTimeout(timeout);
    }
  }, [credentials.emailEntered, credentials.passwordEntered])

  function handleEmailChange(event){
    const enteredEmail = event.target.value;
    dispatch({type:'SET_EMAIL', payload:enteredEmail});
  }

  function handlePasswordChange(event){
    const enteredPassword = event.target.value;
    dispatch({type:'SET_PASSWORD', payload:enteredPassword});
  }

  function handleSubmit(){
    props.handleFormSubmit(formValid);
  }

  return <div className="form-container">
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email :</label>
      <input type="email" id="email" placeholder='Eg:xyz@somemail.com' onChange={handleEmailChange} value={credentials.emailEntered}/>
      <label htmlFor='password'>Password :</label>
      <input type="password" id="password" value={credentials.passwordEntered} onChange={handlePasswordChange}/>
      <button>Login</button>
    </form>
  </div>
}

export default LoginForm;