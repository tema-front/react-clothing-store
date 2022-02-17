import { useDispatch } from "react-redux";
import { onValue, ref } from "firebase/database";
import { useState } from "react";
import { db, login as firebaseLogin} from "../../services/firebase";
import { resetName } from "../../store/profile/actions";

export const ProfileLogin = ({goToRegistration}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleGoToRegistration = (event) => {
        event.preventDefault();
        goToRegistration();
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        setEmail('');
        setPassword('');

        try {
            await firebaseLogin(email, password)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <form className="registration-form-datas">
            <p className="registration-have-account-txt">Don't have an account yet? <button onClick={handleGoToRegistration} className="registration-have-account-btn">Sing up</button> </p>
            <div className="registration-login-details">
                <span className="registration-login-details-title">Login details</span>
                <input onChange={handleEmail} value={email} type="email" className="registration-form-inputs registration-login-email" placeholder="Email" />
                <input onChange={handlePassword} value={password}type="password" className="registration-form-inputs registration-login-password" placeholder="Password" />
            </div>
            <button onClick={handleLogin} className="registration-form-datas-submit">Login</button>
        </form>
    );
}