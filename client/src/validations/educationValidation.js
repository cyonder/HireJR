export default function educationValidation(values){
    const errors = {};

    if(!values.schoolName){
        errors.schoolName = 'Required';
    }

    if(!values.degree){
        errors.degree = 'Required';
    }

    if(!values.field){
        errors.field = 'Required';
    }

    if(!values.startYear){
        errors.startYear = 'Required';
    }

    if(!values.endYear){
        errors.endYear = 'Required';
    }

    return errors;
}
