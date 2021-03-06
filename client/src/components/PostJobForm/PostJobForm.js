import React, { Component } from 'react';
import { connect } from 'react-redux';

import Steps from '../Steps';
import PostJobFormOne from './PostJobFormOne';
import PostJobFormTwo from './PostJobFormTwo';
import PostJobAuth from './PostJobAuth';
import PostJobConfirmation from './PostJobConfirmation';

import postJobFormSteps from '../../data/postJobFormSteps.json';

class PostJobForm extends Component{
    constructor(){
        super();
        this.state = {
            page: 1,
            steps: postJobFormSteps.data
        };

        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.setPage = this.setPage.bind(this);
    }

    setPage(page){
        this.setState({ page });
    }

    nextPage(){
        this.setState({ page: this.state.page + 1 });
    }

    previousPage(){
        this.setState({ page: this.state.page - 1 });
    }

    renderAStep(){
        const { user } = this.props;
        const { page } = this.state;
        const authenticated = localStorage.getItem('authentication_token');

        switch(page){
            case 1:
                return <div className="container grid-sm">
                            <PostJobFormOne {...this.props} onSubmit={this.nextPage} /></div>;
            case 2:
                return <div className="container grid-sm">
                            <PostJobFormTwo previousPage={this.previousPage} onSubmit={this.nextPage} /></div>;
            case 3:
                if(!authenticated)
                    return <div className="container grid-md">
                                <PostJobAuth {...this.props} setPage={this.setPage} /></div>;
                else if(user.role === 'candidate') // candidate can't post a job
                    return this.props.history.push('/dashboard')                
                else
                    return <div className="container grid-md">
                                <PostJobConfirmation {...this.props} previousPage={this.previousPage} /></div>;

            default:
                return false;
        }
    }

    render(){
        return(
            <div className="post-job-form">
                <div className="container grid-md">
                    <Steps {...this.props}
                        page={this.state.page}
                        steps={this.state.steps} />
                </div>
                { this.renderAStep() }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(PostJobForm);
