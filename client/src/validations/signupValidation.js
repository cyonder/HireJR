import isEmail from 'validator/lib/isEmail';

export default function signupValidation(values){
    const errors = {};

    if(!values.firstName){
        errors.firstName = 'Required';
    }

    if(!values.lastName){
        errors.lastName = 'Required';
    }

    if(!values.email){
        errors.email = 'Required';
    }else if(!isEmail(values.email)){
        errors.email = 'Incorrect format for the email';
    }

    if(!values.password){
        errors.password = 'Required';
    }else if(values.password.length < 8){
        errors.password = 'Password should be at least 8 characters long'
    }

    if(!values.passwordConfirmation){
        errors.passwordConfirmation = 'Required';
    }else if(values.passwordConfirmation !== values.password){
        errors.passwordConfirmation = 'Passwords must match';
    }

    if(!values.role){
        errors.role = 'Required';
    }

    return errors;
}
