import React, { Component } from 'react';

class Hero extends Component{
    render(){
        return(
            <div className="splash">
                <div className="hero">
                    <div className="text-center">
                        <div className="h2">Find Your First Developer Job</div>
                        <div className="h5">Hirejr is free of charge for both employers and candidates. By listing your job post here, you help Canada's junior programmers</div>
                    </div>
                    <div className="input-group">
                        <input type="text"
                            className="form-input input-lg"
                            placeholder="Search jobs by; Title, Skills, City, State, Company..."/>

                        <button className="btn btn-primary input-group-btn btn-lg">
                            <i className="icon icon-search"></i> Search
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Hero;
