import './Auth.css'
import Logo from '../../img/macaron5.png'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { logIn, SignUp } from '../../actions/AuthAction'

const Auth = () => {

  const [isSignUp, setIsSignUp] = useState(true)

  const dispatch = useDispatch()

  const loading = useSelector((state) => state.authReducer.loading)

  const [data, setData] = useState({firstname: "", lastname: "", username: "", password: "", confirmpass:""})

  const [passwordConfirmed, setPasswordConfirmed]= useState(true)

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignUp) {
      data.password === data.confirmpass ? dispatch(SignUp(data)) : setPasswordConfirmed(false)
    } else {
      dispatch(logIn(data))
    }
  }

  const resetForm = () => {
    setPasswordConfirmed(true)
    setData({firstname: "", lastname: "", username: "", password: "", confirmpass:""})
  }

  return (
    <div className="Auth">
        <div className="a-left">
            <img src={Logo} alt=""/>
            <div className="Webname">
                <h1>Storyful</h1>
                <h6>Open Your Storybook <br/>and Discover Beautiful Souls</h6>
            </div>
        </div>

         <div className="a-right">
            <form action="" className='infoForm authForm' onSubmit={handleSubmit}>
                <h3>{isSignUp ? 'Sign Up' : 'Log In'}</h3>

                {isSignUp && (
                  <div>
                      <input type="text" placeholder='First Name' className='infoInput' name='firstname' onChange={handleChange} value={data.firstname}/>
                      <input type="text" placeholder='Last Name' className='infoInput' name='lastname' onChange={handleChange} value={data.lastname}/>
                  </div>
                )}
                
                <div>
                    <input type="text" placeholder='Username' className='infoInput' name='username' onChange={handleChange} value={data.username}/>
                </div>
                <div>
                    <input type="password" placeholder='Password' className='infoInput' name='password' onChange={handleChange} value={data.password}/>
                    {isSignUp && (
                        <input type="password" placeholder='Confirm Password' className='infoInput' name='confirmpass' onChange={handleChange} value={data.confirmpass}/>
                    )}
                    
                </div>

                {!passwordConfirmed && (<span style={{color:'#F582A8', fontSize: '12px', alignSelf: 'flex-end', marginRight: '5px'}}>* Confirm password is diffrent with password</span>) }

                <div>
                    <span style={{fontSize: '12px', cursor: 'pointer'}}
                          onClick={() => {
                            setIsSignUp(!isSignUp)
                            resetForm()
                          }}
                    >{isSignUp ? 'Already have an account? Login' : 'Do not have an account? Sign Up.'}</span>
                    
                </div>
                <button className='button info-button' type='submit' disabled={loading}>{loading ? "Loading..." : isSignUp ? 'Sign Up' : 'Log In'}</button>
            </form>
        </div>
    </div>
  )
}

export default Auth