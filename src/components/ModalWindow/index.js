import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { singOut } from "../../services/firebase";
import { emptyCart } from "../../store/cart/actions";
import { getCartList } from "../../store/cart/selectors";
import { offAuth, resetName } from "../../store/profile/actions";
import { getAuthed } from "../../store/profile/selectors";

export const ModalWindow = ({onCloseModalWindow, reason, visibilityModalWindow}) => {
    const authed = useSelector(getAuthed);
    const cartList = useSelector(getCartList);
    const dispatch = useDispatch();

    useEffect(() => {
        document.addEventListener("click", event => handleClick(event))
        return () => document.removeEventListener('click', handleClick)
    }, [])

    const handleClick = (event) => {
        const checkoutWindowExist = event.composedPath().find(element => element.id === 'modalwindow')
        if (!checkoutWindowExist && !visibilityModalWindow) onCloseModalWindow();
    }

    const handleLogout = async () => {
        dispatch(offAuth);
        dispatch(resetName(''));
        // onCloseModalWindow();
        try {
            await singOut();
        } catch (error) {
            console.log(error);
        }
    }

    const handleEmptyCart = () => {
        dispatch(emptyCart)
    }   

    return (
        <div className="checkout-window-overlay">
            <section id="modalwindow" className="modal-window">
                {(reason === 'logout') &&
(                    authed 
                        ?   <div className="modal-window-logout-wrp">
                                <span className="modal-window-logout-txt">Are you sure you want to log out of your account?</span>
                                <div className="modal-window-logout-btns"> 
                                    <button onClick={onCloseModalWindow} className="modal-window-logout-btn">No</button>
                                    <button onClick={handleLogout} className="modal-window-logout-btn">Yes</button>
                                </div>
                            </div>  
                        :   <div className="modal-window-logout-wrp">
                                <span className="modal-window-logout-txt">You are not logged in</span>
                                <div className="modal-window-logout-btns"> 
                                    <button onClick={onCloseModalWindow} className="modal-window-logout-btn-cancel">Cancel</button>
                                </div>
                            </div>)       
                }

                {(reason === 'cleancart') &&
                    (cartList.length
                        ?   <div className="modal-window-logout-wrp">
                                <span className="modal-window-logout-txt">Are you sure you want to clean your shopping cart?</span>
                                <div className="modal-window-logout-btns"> 
                                    <button onClick={onCloseModalWindow} className="modal-window-logout-btn">No</button>
                                    <button onClick={handleEmptyCart} className="modal-window-logout-btn">Yes</button>
                                </div>
                            </div>  
                        :   <div className="modal-window-logout-wrp">
                                <span className="modal-window-logout-txt">Your shopping cart is empty</span>
                                <div className="modal-window-logout-btns"> 
                                    <button onClick={onCloseModalWindow} className="modal-window-logout-btn-cancel">Cancel</button>
                                </div>
                            </div>) 
                }
            </section>
        </div>
    )
}