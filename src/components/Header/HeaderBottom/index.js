import { useDispatch } from "react-redux";
import { singOut } from "../../../services/firebase";
import { offAuth, resetName } from "../../../store/profile/actions";

export const HeaderBottom = ({isHomePage, isCatalog, isNavigate, title, auth}) => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(offAuth)
        dispatch(resetName(''))
        try {
            await singOut();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {isHomePage && 
                <section className="header-homepage-bottom">
                    {/* <img className="header-preview-img-man" src={headerPhoto} alt="header-photo" height="724" /> */}
                    <div className="header-preview-img-man"></div>
                    <div className="header-brand-name">
                        <div className="header-brand-name-wrp">
                            <div className="header-brand-decor-block"></div>
                            <span className="header-brand-name-title">the&nbsp;bazzy</span>
                            <span className="header-brand-name-subtitle">of&nbsp;luxerius&nbsp;
                            <span className="header-brand-name-subtitle-red">fashion</span>
                            </span>
                        </div>
                    </div>
                </section>
            }
            {isCatalog && 
                <section className="header-page-product-bottom header-page-bottom">
                    <div className="header-page-product-bottom-wrp header-page-bottom-wrp">
                        <span className="header-page-bottom-title header-page-product-bottom-title">{title}
                        {auth && 
                            <svg onClick={handleLogout} className="header-bottom-logout-btn" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z"/></svg>
                        }
                        </span>
                        {isNavigate && 
                            <nav className="products-category">
                                <button className="products-category-item-btn">home</button> /
                                <button className="products-category-item-btn">&nbsp;men</button> /
                                <button className="products-category-item-btn">&nbsp;arrivals</button>
                            </nav>
                        }
                    </div>
                </section>
            }
        </>
    );
}

