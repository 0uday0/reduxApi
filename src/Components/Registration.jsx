import React from "react";
import { Link } from "react-router-dom";
import { Provider, connect } from 'react-redux'
import store from '../Redux/Reducers'
import { email_updater, password_updater,dataPostHandler,go_home} from "../Redux/Reducers";
import './Registration.css'

class Registration extends React.Component {
    constructor (props) {
        super()
    }
    submitHandler = ()=>{
        if (this.props.current.registration.email && this.props.current.registration.password) {
            this.props.postHandler(this.props.current.registration)
        }
    }
    emailHandler = (event)=>{
        this.props.email(event.target.value)
    }
    passwordHandler=(event)=>{
        this.props.password(event.target.value)
    }
    goHomeHandler = ()=>{
        this.props.homeHandler()
    }
    render () {
        console.log(this.props)
        return (
            <div className="top">
                <Link to='/'><button className='home' onClick={this.goHomeHandler}>Go to Home</button></Link>
                <div className="login-form">
                    <h2>Create a User</h2>
                    <div className="login-content">
                        <div className='email-bar'>
                            <label htmlFor='email'>Email:</label>
                            <input id='email' placeholder="enter your email"  onChange={this.emailHandler}></input>
                        </div>
                        <div className="password-bar">
                            <label htmlFor='password'>Password:</label>
                            <input id='password' placeholder="enter your password" onChange={this.passwordHandler}></input>
                        </div> 
                        <button onClick={this.submitHandler} >Submit</button>
                    </div>
                    <h2>{this.props.current.postedID ? 'Your userID is '+this.props.current.postedID:null}</h2>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        current: state
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        homeHandler: ()=>{dispatch(go_home())},
        email: (addr)=>{dispatch(email_updater(addr))},
        password: (pass)=>{dispatch(password_updater(pass))},
        postHandler: (data)=>{dispatch(dataPostHandler(data))}
        
    }
}

const RegCont = connect(mapStateToProps,mapDispatchToProps)(Registration)

class WrapReg extends React.Component {
    constructor(props) {
        super()
    }
    render () {
        return (
            <Provider store={store}>
                <RegCont></RegCont>
            </Provider>
        )
    }
}

export default WrapReg