export default function projectValidation(values){
    const errors = {};

    if(!values.projectName){
        errors.projectName = 'Required';
    }

    if(!values.url){
        errors.url = 'Required';
    }
    
    if(!values.skills){
        errors.skills = 'Required';
    }
    
    if(!values.summary){
        errors.summary = 'Required';
    }

    return errors;
}
