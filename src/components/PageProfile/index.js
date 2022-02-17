import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { singOut, auth, db } from "../../services/firebase";
import { offAuth, onAuth, resetName } from "../../store/profile/actions";
import { getAuthed, getName } from "../../store/profile/selectors";
import { Feedback } from "../Feedback";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { ProfileLogin } from "../ProfileLogin";
import { Registration } from "../Registration";
import { RegistrationPrivileges } from "../RegistrationPrivileges";
import { onValue, ref } from "firebase/database";

export const PageProfile = () => {
    const authed = useSelector(getAuthed);
    const dispatch = useDispatch();
    const name = useSelector(getName);
    const [registration, setRegistration] = useState(true)

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            debugger
            if (user) {
                const login = user.email.split('@')[0];
                const usersDbRef = ref(db, `users/${login}`);
                onValue(usersDbRef, (snapshot) => {
                    const datas = snapshot.val();
                    
                    dispatch(resetName(datas?.name))
                })
                dispatch(onAuth);
            } else {
                dispatch(offAuth)
            }
        })
        return subscribe;
    }, [])

    const goToLogin = () => {
        setRegistration(false)
    }

    const goToRegistration = () => {
        setRegistration(true)
    }

    return (
        <>
        {name ? <Header isCatalog={true} title={name} auth={true}/> : 
            registration ? <Header isCatalog={true} title={'registration'} /> : <Header isCatalog={true} title={'login'} />
        }
        <main className="content-account">

            {/* <div className="content-account-wrp"> */}
                <section className="registration"> 
                    {!authed &&
                        (registration ? <Registration goToLogin={goToLogin} /> : <ProfileLogin goToRegistration={goToRegistration} />)
                    }
                    <RegistrationPrivileges />
                </section>
            {/* </div> */}
            <Feedback />
        </main>
        <Footer />
        </>
    );
}