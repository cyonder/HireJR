import React, { Component } from 'react';

class JobPostForm extends Component{
    renderForm(){
        return(
            <form className="form-horizontal">
                <div className="form-group">
                    <div className="col-3 col-sm-12">
                        <label className="form-label" htmlFor="input-position">Position</label>
                    </div>
                    <div className="col-6 col-sm-12">
                        <input className="form-input" type="text" id="input-position" placeholder="Jr. Rails Developer"/>
                    </div>
                    <div className="col-3 col-sm-12 switch-input">
                        <div className="form-group float-right">
                            <label className="form-switch">
                                <input type="checkbox" name="remote"/>
                                <i className="form-icon"></i> This position is Remote
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-3 col-sm-12">
                        <label className="form-label" htmlFor="input-company">Company Name</label>
                    </div>
                    <div className="col-6 col-sm-12">
                        <input className="form-input" type="text" id="input-company" placeholder="Apple Inc."/>
                    </div>
                    <div className="col-3 col-sm-12 switch-input">
                        <div className="form-group float-right">
                            <label className="form-switch">
                                <input type="checkbox" name="degree"/>
                                <i className="form-icon"></i> Related degree required
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-3 col-sm-12">
                        <label className="form-label" htmlFor="input-website">Company Website</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <div className="input-group">
                            <span className="input-group-addon text-primary">https://</span>
                            <input className="form-input" type="text" id="input-website" placeholder="www.apple.com"/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-3 col-sm-12">
                        <label className="form-label" htmlFor="input-city">City</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <input className="form-input" type="text" id="input-city" placeholder="Toronto"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-3 col-sm-12">
                        <label className="form-label" htmlFor="input-state">State</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <div className="form-group">
                            <select className="form-select" id="input-state">
                                <option>Choose a state</option>
                                <option>Ontario</option>
                                <option>British Columbia</option>
                                <option>Alberta</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-3 col-sm-12">
                        <label className="form-label" htmlFor="input-schedule">Schedule</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <div className="form-group">
                            <select className="form-select" id="input-schedule">
                                <option>Choose a schedule</option>
                                <option>Full Time</option>
                                <option>Part Time</option>
                                <option>Intern</option>
                                <option>Contact</option>
                                <option>N/A</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-3 col-sm-12">
                        <label className="form-label" htmlFor="input-salary">Salary Range</label>
                    </div>
                    <div className="col-3 col-sm-12 mr-5">
                        <div className="input-group">
                            <span className="input-group-addon text-primary">$</span>
                            <input className="form-input" type="text" id="input-salary" placeholder="50,000.00"/>
                        </div>
                    </div>
                    <div className="col-1 col-sm-12 salary-to text-primary"><i className="icon icon-resize-horiz"></i></div>
                    <div className="col-3 col-sm-12">
                        <div className="input-group">
                            <span className="input-group-addon text-primary">$</span>
                            <input className="form-input" type="text" placeholder="65,000.00"/>
                        </div>
                    </div>
                    <div className="col-2 col-sm-12 ml5">
                        <div className="form-group">
                            <select className="form-select" id="input-state">
                                <option>Yearly</option>
                                <option>Monthly</option>
                                <option>Weekly</option>
                                <option>Daily</option>
                                <option>Hourly</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-3 col-sm-12">
                        <label className="form-label" htmlFor="input-skills">Skills</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <input className="form-input" type="text" id="input-skills" placeholder="HTML, CSS, JavaScript, React JS, Ruby on Rails, etc."/>
                    </div>
                </div>
                <button className="btn btn-primary float-right">Next</button>
            </form>
        );
    }

    render(){
        console.log("JobPostForm-props:",this.props);
        return this.renderForm();
    }
}

export default JobPostForm;
