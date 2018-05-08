const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcrypt-nodejs');
const validator = require('validator');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true  
    },
    lastName: {
        type: String,
        required: true  
    },
    username: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (v)=>(validator.isEmail(v)),
            message: 'Invalid Email Address!'
        }
    },
    password: {
        type: String,
        required: true  
    },
    role: {
        type: String,
        required: true,
        enum: ['candidate', 'employer']
    },
    _employerId: {
        type: Schema.Types.ObjectId,
        ref: 'Employer'
    },
    _candidateId: {
        type: Schema.Types.ObjectId,
        ref: 'Candidate'
    }
}, {
    timestamps: true
});

userSchema.pre("save", function(next){
    const self = this;

    mongoose.models["User"].findOne({ email : self.email }, function(err, results){
        if(err){
            next(err);
        }else if(results){
            self.invalidate("email", "This email address is already registered!");
            next(new Error("This email address is already registered!"));
        }else{
            next();
        }
    });
});

userSchema.pre('save', function(next){
    const user = this;

    bcrypt.genSalt(10, (err, salt) => {
        if(err){ return next(err); }

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err){ return next(err); }

            user.password = hash;
            next();
        });
    });
});

userSchema.pre("update", function(next) {    
    const password = this.getUpdate().$set.password;
    if(!password){ return next() }
    
    try{
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        this.getUpdate().$set.password = hash;
        next();
    }catch(error){
        return next(error);
    }
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if(err){ return callback(err); }
        callback(null, isMatch);
    });
}

const ModelClass = mongoose.model('User', userSchema);

module.exports = ModelClass;
