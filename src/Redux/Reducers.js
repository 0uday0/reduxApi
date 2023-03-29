import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// import rootReducer from './redux/reducers'


const INITIAL_STATE = {
    data: [],
    multipleUsers: false,
    singleUser: false,
    status: '',
    registration: {
        email: '',
        password: ''
    },
    postedID:''
}

export const requesting_data = (url,btn)=>{
    return {
        type: 'REQUESTING_DATA',
        urlPassed: url,
        button: btn
    }
}

export const recieved_data = (data)=>{
    return {
        type: 'RECIEVED_DATA',
        data: data
    }
}

export const go_home = ()=>{
    return {
        type: 'HOME',
    }
}
export const email_updater = (value)=>{
    return {
        type: 'EMAIL',
        email: value
    }
}

export const password_updater = (value)=>{
    return {
        type: 'PASSWORD',
        password: value
    }
}
export const sending_data = ()=>{
    return {
        type: 'SENDING',
        
    }
}

export const posted_data = (id)=>{
    return {
        type: 'POSTED',
        identity: id
    }
}

export const dataRequestHandler = (url,btn) =>{
    return function (dispatch) {
        dispatch(requesting_data(url,btn))
        console.log('requesting_data',url)
        fetch(url).then((response)=>{return response.json()})
        .then((data)=>
        {
        dispatch(recieved_data(data))})
    }
}

export const dataPostHandler = (data)=>{
    return function (dispatch) {
        dispatch(sending_data ())
        fetch('https://reqres.in/api/users',{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type':'application/json'}
        }).then ((res)=>res.json())
        .then((data)=> dispatch(posted_data(data.id)))
    }
}



export const rootReducer = (state=INITIAL_STATE,action)=>{
    let stringObject = JSON.stringify(state)
    let newObject = JSON.parse(stringObject)
    switch (action.type) {
        case 'REQUESTING_DATA':
            newObject['status'] = 'loading...'
            newObject['url'] = action.urlPassed
            if (action.button === 'singleUser') {
                newObject['singleUser'] = true
                newObject['multipleUsers'] = false

            } else {
                newObject['multipleUsers'] = true
                newObject['singleUser'] = false
            }
            newObject['data'] = []
            return newObject
        case 'RECIEVED_DATA':
            newObject['status'] = ''
            newObject['data'] = [action.data.data]
            return newObject
        case 'HOME':
            return {
                data: [],
                multipleUsers: false,
                singleUser: false,
                status: '',
                registration: {
                    email: '',
                    password: ''
                    },
                postedID:''
            }
        case 'EMAIL':
            newObject['registration']['email'] = action.email
            return newObject
        case 'PASSWORD':
            newObject.registration.password = action.password
            return newObject
        case 'POSTED':
            newObject.postedID = action.identity
            return newObject
        default:
            return state

    }
}

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export default store