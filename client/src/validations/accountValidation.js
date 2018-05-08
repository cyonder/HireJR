export default function accountValidation(values){
    const errors = {};

    if(!values.firstName){
        errors.firstName = 'Required';
    }

    if(!values.lastName){
        errors.lastName = 'Required';
    }

    if(!values.username){
        errors.username = 'Required';
    }
     
    return errors;
}
