import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { auth, db } from "../../../services/firebase";
import { offAuth, onAuth } from "../../../store/profile/actions";

export const Subscribing = () => {
    const [subscribingEmail, setSubscribingEmail] = useState('');
    const [subscribingExist, setSubscribingExist] = useState(false);
    const dispatch = useDispatch();

    const handleSubcribing = (event) => {
        debugger
        event.preventDefault();
        if (subscribingExist) return;
        setSubscribingExist(true);
        set(ref(db, `subcribings/${subscribingEmail.split('@')[0]}`), {
            email: subscribingEmail
        })
        set(ref(db, `users/${subscribingEmail.split('@')[0]}/subscribing`), true)
    }

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const login = user.email.split('@')[0];
                const usersDbRef = ref(db, `users/${login}`);
                onValue(usersDbRef, (snapshot) => {
                    const datas = snapshot.val();
                    
                    setSubscribingEmail(datas?.email)
                    if (datas?.subscribing) setSubscribingExist(true);
                })
                dispatch(onAuth);
            } else {
                dispatch(offAuth);
                setSubscribingExist(false);
            }
        })
        return subscribe;
    }, [])

    const handleUnsubcribing = () => {
        setSubscribingExist(false);
        setSubscribingEmail('');
        set(ref(db, `subcribings/${subscribingEmail.split('@')[0]}`), null)
        set(ref(db, `users/${subscribingEmail.split('@')[0]}/subscribing`), false)
    }

    return (
        <div className="subscribing">
            <span className="subscribing-title">subscribe</span>
            <span className="subscribing-subtitle">for our newletter and promotion</span>
            <div className="subscribing-wrap">
                <form onSubmit={(event) => handleSubcribing(event)} className="subscribing-form">
                    {subscribingExist ? 
                        <>
                        <input 
                            className="subscribing-input-email" 
                            placeholder={subscribingEmail}
                            value={subscribingEmail}
                            disabled
                        />
                        <button onClick={handleUnsubcribing} className="subscribing-btn">Unsubscribe</button>
                        </>
                    :
                        <>
                        <input 
                            className="subscribing-input-email" 
                            type="email" 
                            placeholder="Enter Your Email"
                            value={subscribingEmail}
                            onChange={(event) => {setSubscribingEmail(event.target.value)}}
                            required 
                        />
                        <input className="subscribing-btn" type="submit" value="Subscribe" />
                        </>
                    }
                </form>
            </div>
        </div>
    );
}

