import { Feedback } from "../Feedback";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Registration } from "../Registration";
import { RegistrationInfo } from "../RegistrationInfo";

export const Profile = () => {
    return (
        <>
        <Header isCatalog={true} title={'registration'}/>
        <main class="content-account">
            {/* <div class="content-account-wrp"> */}
                <section class="registration">
                    <Registration />
                    <RegistrationInfo />
                </section>
            {/* </div> */}
            <Feedback />
        </main>
        <Footer />
        </>
    );
}