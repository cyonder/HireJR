import React, { Component } from 'react';

class Signup extends Component{
    render(){
        return(
            <form>
                <div className="form-group">
                    <label className="form-label" for="input-first">First Name</label>
                    <input className="form-input" type="text" id="input-first" placeholder="Cagdas"/>
                </div>
                <div className="form-group">
                    <label className="form-label" for="input-last">Last Name</label>
                    <input className="form-input" type="text" id="input-last" placeholder="Yonder"/>
                </div>
                <div className="form-group">
                    <label className="form-label" for="input-email">Email</label>
                    <input className="form-input" type="text" id="input-email" placeholder="cagdasyonder@gmail.com"/>
                </div>
                <div className="form-group">
                    <label className="form-label" for="input-password">Password</label>
                    <input className="form-input" type="pasword" id="input-password" placeholder="Min. length 8 character"/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block">Sign up</button>
                </div>
            </form>
        );
    }
}

export default Signup;
