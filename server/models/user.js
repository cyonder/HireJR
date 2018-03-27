const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String,
    role: {
        type: String,
        enum: ['developer', 'employer']
    }
}, {
    timestamps: true
});

userSchema.pre('save', function(next){ // Don't use arrow function!
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

userSchema.methods.comparePassword = function(candidatePassword, callback){ // Don't use arrow function!
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if(err){ return callback(err); }
        callback(null, isMatch);
    });
}

const ModelClass = mongoose.model('User', userSchema);
module.exports = ModelClass;
