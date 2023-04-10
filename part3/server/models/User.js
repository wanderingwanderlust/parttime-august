import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
});

UserSchema.pre('save', function(next) {
    const user = this;
    if(user.isModified('password') || user.isNew) {
        bcrypt.genSalt(10, function(saltErorr, salt) {
            if(saltErorr) {
                return next(saltError)
            }else {
                bcrypt.hash(user.password, salt, function(hasErrors, hash) {
                    if(hasErrors) {
                        return next(hasErrors)
                    }
                    user.password = hash
                    return next()
                })
            }
        })
    } else {
        return next()
    }
})

UserSchema.methods.comparePassword = function(usersPassword, cb) {
    bcrypt.compare(usersPassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch);
    })
}

export default mongoose.model('user', UserSchema)