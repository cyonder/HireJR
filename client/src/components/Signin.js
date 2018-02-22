import React, { Component } from 'react';

class Signin extends Component{
    render(){
        return(
            <form>
                <div className="form-group">
                    <label className="form-label" for="input-example-1">Email</label>
                    <input className="form-input" type="text" id="input-example-1" placeholder="Email"/>
                </div>
                <div className="form-group">
                    <label className="form-label" for="input-example-2">Password</label>
                    <input className="form-input" type="password" id="input-example-2" placeholder="Password"/>
                </div>
                <div className="form-group">
                    <label className="form-checkbox">
                        <input type="checkbox"/>
                        <i className="form-icon"></i> Remember me
                    </label>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Sign in</button>
                </div>
            </form>
        );
    }
}

export default Signin;
