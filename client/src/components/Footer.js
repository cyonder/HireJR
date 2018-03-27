import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component{
    renderLinks(){
        return [
            <Link to="/" className="btn btn-link" key={1}>Home</Link>,
            <Link to="/dashboard" className="btn btn-link" key={2}>Dashboard</Link>,
            <Link to="/faq" className="btn btn-link disabled" key={3}>FAQ</Link>,
            <Link to="/contact" className="btn btn-link disabled" key={4}>Contact</Link>
        ];
    }

    render(){
        return(
            <footer>
                <div className="container grid-lg">
                    {this.renderLinks()}
                </div>
            </footer>
        )
    }
}

export default Footer;
