import React, { Component } from 'react';

class Popover extends Component{
    render(){
        return(
            <div class="popover popover-right">
                <button class="btn btn-primary">!</button>
                <div class="popover-container">
                    <div class="card">
                        <div class="card-body">
                            The career objective is helpful if you’re not applying to a specific job posting, but instead are sending out unsolicited applications to potential employers.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Popover;
