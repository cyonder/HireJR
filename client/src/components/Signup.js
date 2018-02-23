import React, { Component } from 'react';

class Signup extends Component{
    render(){
        return(
            <form>
                <div className="form-group">
                    <label className="form-label" htmlFor="signup-first">First Name</label>
                    <input className="form-input" type="text" id="signup-first" placeholder="Cagdas"/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="signup-last">Last Name</label>
                    <input className="form-input" type="text" id="signup-last" placeholder="Yonder"/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="signup-email">Email</label>
                    <input className="form-input" type="text" id="signup-email" placeholder="cagdasyonder@gmail.com"/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="signup-password">Password</label>
                    <input className="form-input" type="pasword" id="signup-password" placeholder="Min. length 8 character"/>
                </div>
                <div className="form-group">
                    <button className="btn btn-success btn-block">Sign up</button>
                </div>
            </form>
        );
    }
}

export default Signup;
