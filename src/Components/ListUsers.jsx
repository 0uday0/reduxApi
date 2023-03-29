import React from "react";
import { Link } from "react-router-dom";
import { Provider, connect } from 'react-redux'
import store from '../Redux/Reducers'
import { requesting_data,recieved_data,dataRequestHandler,go_home} from '../Redux/Reducers'
import './ListUsers.css'
class ListUsers extends React.Component {
    constructor (props) {
        super ()
    }
    startNum =2
    currentNum=this.startNum
    multipleUserHandler = ()=>{
        if (this.currentNum ===1) {
            this.currentNum =2
            this.props.requestHandler(`https://reqres.in/api/users?page=${this.currentNum}`,'multipleUsers')
            
        } else {
            this.currentNum = 1
            this.props.requestHandler(`https://reqres.in/api/users?page=${this.currentNum}`,'multipleUsers')
            
            
        }
        
    }
    singleUserHandler = ()=>{
        let id = Math.floor(1+(Math.random()*12))
        this.props.requestHandler(`https://reqres.in/api/users/${id}`,'singleUser')
        

    }
    home = ()=>{
        this.props.homeHandler()
    }
    render () {
        console.log(this.props)
        return (
            <div className="shared-top">
                <Link to='/'><button className="home" onClick={this.home}>Go To Home</button></Link>
                
                <div className="buttons-top">
                    <button onClick={this.multipleUserHandler} className={this.props.current.multipleUsers? 'active' : ''}>Users by page</button>
                    <button onClick={this.singleUserHandler} className={this.props.current.singleUser ? 'active' : ''}>Users by id</button>
                </div>
                <p>{this.props.current.status}</p>
                {this.props.current.singleUser ? 
                <div>
                    <div>
                    <h3>User Id is: {!this.props.current.data[0] ? '':this.props.current.data[0]['id']}</h3>
                </div>
                <img src={!this.props.current.data[0]? '':this.props.current.data[0]['avatar']}/>
                <p>First_Name: {!this.props.current.data[0]?'':this.props.current.data[0]['first_name']}</p>
                <p>Last_Name: {!this.props.current.data[0]?'':this.props.current.data[0]['last_name']}</p>
                <p className="data">Email: {!this.props.current.data[0]?'':this.props.current.data[0].email}</p>
                </div> : null
                }
                {
                    this.props.current.multipleUsers ? 
                    <div>
                        <h2>You're on page: {this.currentNum}</h2>
                        {!this.props.current.data.length ===0 ? null:
                        this.props.current.data.map((elem)=>{
                            console.log(elem)
                            return (
                               elem.map((item)=>{
                                return (
                                    <div key={item.email}>
                                    <div>
                                    <h3>User Id is: {item['id']}</h3>
                                </div>
                                <img src={item['avatar']}/>
                                <p>First_Name: {item['first_name']}</p>
                                <p>Last_Name: {item['last_name']}</p>
                                <p className="data">Email: {item.email}</p>
                                </div> 
                                )
                               })
                            )
                        })
                        }
                    </div>
                    
                    :
                    null
                }

                
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
        dataRequest : (url)=>{dispatch(requesting_data(url))},
        dataRecieved: (data)=>{dispatch(recieved_data(data))},
        requestHandler: (inputUrl,btn)=>{dispatch(dataRequestHandler(inputUrl,btn))},
        homeHandler: ()=>{dispatch(go_home())}
        
        
    }
}

const Container = connect(mapStateToProps,mapDispatchToProps)(ListUsers)

class WrapClass extends React.Component {
    constructor(props) {
        super()
    }
    render () {
        return (
            <Provider store={store}>
                <Container></Container>
            </Provider>
        )
    }
}


export default WrapClass