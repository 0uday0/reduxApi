import React from "react";
import { Link } from "react-router-dom";
import './HomePage.css';

class HomePage extends React.Component {
    constructor (props) {
        super()
    }
    render () {
        return (
            <div className="container">
                <div className="header">
                    <h1>Handling API with Redux</h1>
                </div>
                <div className="home-body">
                    <h2>Select an option below</h2>
                    <div className="btn">
                    <Link to='/listusers'><button>List Users</button></Link>
                    <Link to='/registration'><button>Create User</button></Link>
                    </div>
                    
                </div>
                
            </div>
        )
    }
}

export default HomePage