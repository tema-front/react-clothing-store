import { useSelector } from "react-redux";
import { getAuthed } from "../../store/profile/selectors";
import { Feedback } from "../Feedback";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Registration } from "../Registration";
import { RegistrationInfo } from "../RegistrationInfo";

export const Profile = () => {
    const authed = useSelector(getAuthed);

    return (
        <>
        <Header isCatalog={true} title={'registration'}/>
        <main class="content-account">
            {/* <div class="content-account-wrp"> */}
                <section class="registration">
                    {!authed && <Registration />}
                    <RegistrationInfo />
                </section>
            {/* </div> */}
            <Feedback />
        </main>
        <Footer />
        </>
    );
}