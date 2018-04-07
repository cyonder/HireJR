import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent){
    class Deauthentication extends Component{
        PropTypes = {
            router: PropTypes.object
        }

        componentWillMount(){
            if(this.props.authenticated){
                this.props.history.goBack();
            }
        };

        componentWillUpdate(nextProps){
            if(nextProps.authenticated){
                this.props.history.goBack();
            }
        };

        render(){
            return <ComposedComponent {...this.props} />
        };
    };

    function mapStateToProps(state){
        return {
            authenticated: state.authentication.authenticated
        };
    };

    return connect(mapStateToProps)(Deauthentication);
};
