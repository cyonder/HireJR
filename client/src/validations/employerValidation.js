export default function employerValidation(values){
    const errors = {};

    if(!values.companyName){
        errors.companyName = 'Required';
    }

    if(!values.companyWebsite){
        errors.companyWebsite = 'Required';
    }
     
    return errors;
}
