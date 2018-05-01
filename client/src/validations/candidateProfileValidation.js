export default function candidateProfileValidation(values){
    const errors = {};

    if(!values.city){
        errors.city = 'Required';
    }

    if(!values.province){
        errors.province = 'Required';
    }

    if(!values.skills){
        errors.skills = 'Required';
    }

    if(!values.summary){
        errors.summary = 'Required';
    }

    return errors;
}
