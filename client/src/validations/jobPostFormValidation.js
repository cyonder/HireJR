import isURL from 'validator/lib/isURL';
import isLength from 'validator/lib/isLength';

export default function jobPostFormValidation(values){
    const errors = {};

    if(!values.position){
        errors.position = 'Required';
    }

    if(!values.companyName){
        errors.companyName = 'Required';
    }

    if(!values.companyWebsite){
        errors.companyWebsite = 'Required';
    }else{
        if(!isURL(values.companyWebsite, {
            protocols: ['http','https'],
            require_protocol: true
        })){
            errors.companyWebsite = "Don\'t forget to add 'http or https' protocol";
        }
    }

    if(!values.city){
        errors.city = 'Required';
    }

    if(!values.province){
        errors.province = 'Required';
    }

    if(!values.schedule){
        errors.schedule = 'Required';
    }

    if(!values.skills){
        errors.skills = 'Required';
    }

    if(!values.description){
        errors.description = 'Required';
    }else{
        if(!isLength(values.description, { min: 100 })){
            errors.description = 'Minimum 100 characters required'
        }
    }

    if(!values.applyThrough){
        errors.applyThrough = 'Required';
    }else{
        if(values.applyThrough === 'internal'){
            if(!values.internal){
                errors.internal = 'Required'
            }
        }else if(values.applyThrough === 'external'){
            if(!values.external){
                errors.external = 'Required'
            }
        }
    }

    return errors;
}
