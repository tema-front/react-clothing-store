import { ref, set } from "firebase/database";
import { useState } from "react";
import { db, singUp } from "../../services/firebase";

export const Registration = ({goToLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');

    const handleFirstName = (event) => {
        let newFirstName = ''
        if (event.target.value) {
            newFirstName = event.target.value?.[0]?.toUpperCase() + event.target.value?.slice(1)?.toLowerCase();
        }
        setFirstName(newFirstName);
    }

    const handleLastName = (event) => {
        let newLastName = ''
        if (event.target.value) {
            newLastName = event.target.value?.[0]?.toUpperCase() + event.target.value?.slice(1)?.toLowerCase();
        }
        setLastName(newLastName);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (!firstName || !lastName || !email || !password) return
        const login = email.split('@')[0];

        set(ref(db, `users/${login}`), {
            name: `${firstName} ` + lastName,
            email: email,
            gender: gender,
            subscribing: false
        })

        try {
            await singUp(email, password);
        } catch (error) {
            console.log(error);
        }
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }

    const handleGoToLogin = (event) => {
        event.preventDefault();
        goToLogin()
    }

    const handleSetGender = (event) => {
        setGender(event.currentTarget.value);
    }

    return (
        <form className="registration-form-datas">
            <p className="registration-have-account-txt">Already have an accounte? <button onClick={handleGoToLogin} className="registration-have-account-btn">Login</button> </p>
            <div className="registration-data-name">
                <span className="registration-data-name-title">Your Name</span>
                <input onChange={handleFirstName} value={firstName} type="text" className="registration-form-inputs registration-data-name-input registration-data-first-name" placeholder="First Name" />
                <input onChange={handleLastName} value={lastName} type="text" className="registration-form-inputs registration-data-name-input registration-data-last-name" placeholder="Last Name" />
                <div className="registration-radio-btns">
                    <input onChange={event => handleSetGender(event)} type="radio" className="registration-radio-btns-item" name="registration-radio-btn" id="registration-radio-btn-male" value="male" />
                    <label className="registration-radio-btns-txt" htmlFor="registration-radio-btn-male">Male</label>
                    <input onChange={event => handleSetGender(event)} type="radio" className="registration-radio-btns-item" name="registration-radio-btn" id="registration-radio-btn-female" value="female" />
                    <label className="registration-radio-btns-txt" htmlFor="registration-radio-btn-female">Female</label>
                    <input onChange={event => handleSetGender(event)} type="radio" className="registration-radio-btns-item" name="registration-radio-btn" id="registration-radio-btn-other" value="other" />
                    <label className="registration-radio-btns-txt" htmlFor="registration-radio-btn-other">Other</label>
                </div>
            </div>
            <div className="registration-login-details">
                <span className="registration-login-details-title">Sign up details</span>
                <input onChange={handleEmail} value={email} type="email" className="registration-form-inputs registration-login-email" placeholder="Email" />
                <input onChange={handlePassword} value={password}type="password" className="registration-form-inputs registration-login-password" placeholder="Password" />
                <p className="registration-login-details-txt">Please use 8 or more characters, with at least 1 number and a mixture of uppercase and lowercase letters</p>
            </div>
            <button onClick={event => handleSignUp(event)} className="registration-form-datas-submit" type={'submit'}>Join now</button>
        </form>

    );
}