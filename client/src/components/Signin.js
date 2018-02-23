import React, { Component } from 'react';

class Signin extends Component{
    render(){
        return(
            <form>
                <div className="form-group">
                    <label className="form-label" for="signin-email">Email</label>
                    <input className="form-input" type="text" id="signin-email" placeholder="Email"/>
                </div>
                <div className="form-group">
                    <label className="form-label" for="signin-pasword">Password</label>
                    <input className="form-input" type="password" id="signin-pasword" placeholder="Password"/>
                </div>
                <div className="fcs">
                    <button className="btn btn-primary">Sign in</button>
                    <label className="form-checkbox remember-me">
                        <input type="checkbox" name="remember-me"/>
                        <i className="form-icon"></i> Remember me
                    </label>
                </div>
            </form>
        );
    }
}

export default Signin;
