import { ref, set, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { db, auth, singUp, login } from "../../services/firebase";
import { setName } from "../../store/profile/actions";

export const Registration = ({goToLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const dispatch = useDispatch();
    const [onLogin, setOnLogin] = useState(false);

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
        const login = email.split('@')[0];

        set(ref(db, `users/${login}`), {
            name: `${firstName} ` + lastName,
            email: email,
            gender: gender,
            subscribing: false
        })

        try {
            await singUp(email, password);
            // 
            // const usersDbRef = ref(db, `users/${login}`);
            // onValue(usersDbRef, (snapshot) => {
            //     const datas = snapshot.val();
            //     
            //     dispatch(setName(datas?.name))
            // })
        } catch (error) {
            console.log(error);
        }
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }

    // const handleLogin = async (event) => {
    //     
    //     event.preventDefault();
    //     const login = email.split('@')[0];

    //     setEmail('');
    //     setPassword('');
    //     try {
    //         await login(email, password)
    //         const usersDbRef = ref(db, `users/${login}`);
    //         onValue(usersDbRef, (snapshot) => {
    //             const datas = snapshot.val();
    //             
    //             dispatch(setName(datas?.name))
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // useEffect(() => {
    //     
    //     const login = email.split('@')[0];
    //     const usersDbRef = ref(db, `users/${login}`);
    //     onValue(usersDbRef, (snapshot) => {
    //         const datas = snapshot.val();
    //         
    //         dispatch(setName(datas?.name))
    //     })
    // }, [])

    const handleGoToLogin = (event) => {
        event.preventDefault();
        goToLogin()
    }

    const handleSetGender = (event) => {
        setGender(event.currentTarget.value);
    }

    return (
        <form class="registration-form-datas">
            <p className="registration-have-account-txt">Already have an accounte? <button onClick={handleGoToLogin} className="registration-have-account-btn">Login</button> </p>
            <div class="registration-data-name">
                <span class="registration-data-name-title">Your Name</span>
                <input onChange={handleFirstName} value={firstName} type="text" class="registration-form-inputs registration-data-name-input registration-data-first-name" placeholder="First Name" />
                <input onChange={handleLastName} value={lastName} type="text" class="registration-form-inputs registration-data-name-input registration-data-last-name" placeholder="Last Name" />
                <div class="registration-radio-btns">
                    <input onChange={event => handleSetGender(event)} type="radio" class="registration-radio-btns-item" name="registration-radio-btn" id="registration-radio-btn-male" value="male" />
                    <label class="registration-radio-btns-txt" htmlFor="registration-radio-btn-male">Male</label>
                    <input onChange={event => handleSetGender(event)} type="radio" class="registration-radio-btns-item" name="registration-radio-btn" id="registration-radio-btn-female" value="female" />
                    <label class="registration-radio-btns-txt" htmlFor="registration-radio-btn-female">Female</label>
                    <input onChange={event => handleSetGender(event)} type="radio" class="registration-radio-btns-item" name="registration-radio-btn" id="registration-radio-btn-other" value="other" />
                    <label class="registration-radio-btns-txt" htmlFor="registration-radio-btn-other">Other</label>
                </div>
            </div>
            <div class="registration-login-details">
                <span class="registration-login-details-title">Sign up details</span>
                {/* <span class="registration-login-details-title">Login details</span> */}
                <input onChange={handleEmail} value={email} type="email" class="registration-form-inputs registration-login-email" placeholder="Email" />
                <input onChange={handlePassword} value={password}type="password" class="registration-form-inputs registration-login-password" placeholder="Password" />
                <p class="registration-login-details-txt">Please use 8 or more characters, with at least 1 number and a mixture of uppercase and lowercase letters</p>
            </div>
            <button onClick={handleSignUp} class="registration-form-datas-submit">join now</button>
            {/* <button onClick={handleLogin} class="registration-form-datas-submit">Login</button> */}
        </form>

    );
}