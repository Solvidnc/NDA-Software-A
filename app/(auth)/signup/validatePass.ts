const newpasswordValidation = (password:string) => {
        const errors = [];
        
        if (password.length < 8) {
            errors.push("Password must be at least 8 characters long.");
        }
        if (!/[a-z]/.test(password)) {
            errors.push("Password must contain at least one lowercase letter.");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("Password must contain at least one uppercase letter.");
        }
        if (!/[0-9]/.test(password)) {
            errors.push("Password must contain at least one number.");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push("Password must contain at least one special character.");
        }
        return errors;
    };

export default newpasswordValidation;