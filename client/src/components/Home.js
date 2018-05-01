import React, { Component } from 'react';

import Hero from './Hero';
import JobPostIndex from './JobPostIndex';

class Home extends Component{
    render(){
        return [
            <Hero key={1} />,
            <JobPostIndex key={2} />
        ];
    }
}

export default Home;
