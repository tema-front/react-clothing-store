import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { singUp, auth } from "../../services/firebase";

export const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authed, setAuthed] = useState(false)


    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await singUp(email, password);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthed(true);
            } else {
                setAuthed(false);
            }
        })
        return subscribe;
    }, [])

    return (
        <form class="registration-form-datas">
            <div class="registration-data-name">
                <span class="registration-data-name-title">Your Name</span>
                <input type="text" class="registration-form-inputs registration-data-name-input registration-data-first-name" placeholder="First Name" />
                <input type="text" class="registration-form-inputs registration-data-name-input registration-data-last-name" placeholder="Last Name" />
                <div class="registration-radio-btns">
                    <input type="radio" class="registration-radio-btns-item" name="registration-radio-btn" id="registration-radio-btn-male" value="male" />
                    <label class="registration-radio-btns-txt" htmlFor="registration-radio-btn-male">Male</label>
                    <input type="radio" class="registration-radio-btns-item" name="registration-radio-btn" id="registration-radio-btn-female" value="female" />
                    <label class="registration-radio-btns-txt" htmlFor="registration-radio-btn-female">Female</label>
                    <input type="radio" class="registration-radio-btns-item" name="registration-radio-btn" id="registration-radio-btn-other" value="female" />
                    <label class="registration-radio-btns-txt" htmlFor="registration-radio-btn-other">Other</label>
                </div>
            </div>
            <div class="registration-login-details">
                <span class="registration-login-details-title">Login details</span>
                <input onChange={handleEmail} value={email} type="email" class="registration-form-inputs registration-login-email" placeholder="Email" />
                <input onChange={handlePassword} value={password}type="password" class="registration-form-inputs registration-login-password" placeholder="Password" />
                <p class="registration-login-details-txt">Please use 8 or more characters, with at least 1 number and a mixture of uppercase and lowercase letters</p>
            </div>
            <button onClick={handleLogin} class="registration-form-datas-submit">join now</button>
        </form>

    );
}