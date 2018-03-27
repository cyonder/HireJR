import React, { Component } from 'react';

import Hero from './Hero';
import JobIndex from './JobIndex';

class Home extends Component{
    render(){
        return [
            <Hero key={1} />,
            <JobIndex key={2} />
        ];
    }
}

export default Home;
