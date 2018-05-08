export default function passwordValidation(values){
    const errors = {};

    if(!values.currentPassword){
        errors.currentPassword = 'Required';
    }

    if(!values.newPassword){
        errors.newPassword = 'Required';
    }else if(values.newPassword.length < 8){
        errors.newPassword = 'Password should be at least 8 characters long'
    }

    if(!values.passwordConfirmation){
        errors.passwordConfirmation = 'Required';
    }else if(values.passwordConfirmation !== values.newPassword){
        errors.passwordConfirmation = 'Passwords must match';
    }
     
    return errors;
}
