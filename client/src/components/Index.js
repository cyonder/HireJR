import React, { Component } from 'react';

import JobIndex from './JobIndex';

class Index extends Component{
    render(){
        return(
            <div>
                <div className="mb20">HireJR is free of charge for both employers and employees. By listing your job listing here, you help Canada's junior programmers</div>
                <JobIndex />
            </div>
        );
    }
}

export default Index;
