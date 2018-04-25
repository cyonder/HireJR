export default function educationValidation(values){
    const errors = {};

    if(!values.companyName){
        errors.companyName = 'Required';
    }

    if(!values.title){
        errors.title = 'Required';
    }
    
    if(!values.startYear){
        errors.startYear = 'Required';
    }
    
    if(!values.endYear){
        errors.endYear = 'Required';
    }
    
    if(!values.summary){
        errors.summary = 'Required';
    }

    return errors;
}
