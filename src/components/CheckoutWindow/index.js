import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ref, set } from "firebase/database";
import { auth, db } from "../../services/firebase";
import { getCartList } from "../../store/cart/selectors";
import { getAuthed } from "../../store/profile/selectors";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

export const CheckoutWindow = ({onCloseCheckoutWindow}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const cartList = useSelector(getCartList);
    const authed = useSelector(getAuthed);
    const [orderRegistred, setOrderRegistred] = useState(false);

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

    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    
    const handleAddress = (event) => {
        setAddress(event.target.value);
    }

    const handleCloseCheckoutWindow = () => {
        onCloseCheckoutWindow();
    }

    useEffect(() => {
        document.addEventListener("click", event => handleClick(event))
        return () => document.removeEventListener('click', handleClick)
    }, [])
    
    const handleClick = (event) => {
        const checkoutWindowExist = event.composedPath().find(element => element.id === 'checkoutwindow')
        if (event.target.id != 'checkoutwindow' && !checkoutWindowExist) onCloseCheckoutWindow();
    }


    const handleCheckoutSubmit = (event) => {
        event.preventDefault();
        console.log(cartList);
        debugger
        let login = '';
        let orderId = ``
        debugger

        const subscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                login = user.email.split('@')[0];
                orderId = `${login}${Date.now()}`
                set(ref(db, `orders/${login}/${orderId}/userdata`), {
                    FirstName: firstName,
                    LastName: lastName,
                    Phone: phoneNumber,
                    Email: email,
                    Address: address
                })
                for (let i = 0; i < cartList.length; i++) {
                    set(ref(db, `orders/${login}/${orderId}/products/${i + 1}`), cartList[i])
                }
                setOrderRegistred(true);
            }
        })

        

        return subscribe;
    }

    return (
        <div className="checkout-window-overlay">
            <section id="checkoutwindow" className="checkout-window">
                <div className="checkout-window-title-wrp">
                    <h3 className="checkout-window-title">Place an order</h3>
                    <svg onClick={handleCloseCheckoutWindow} className="products-added-item-cross" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" />
                    </svg> 
                </div>
                {authed ? 
                <form onSubmit={event => handleCheckoutSubmit(event)} className="checkout-window-form">
                    <span className="checkout-window-subtitle">Your Name</span>
                    <input onChange={event => handleFirstName(event)} value={firstName} className="checkout-window-inputs" type='text' placeholder="First Name" />
                    <input onChange={event => handleLastName(event)} value={lastName} className="checkout-window-inputs" type='text' placeholder="Last Name" />

                    <span className="checkout-window-subtitle">Your data</span>
                    <input onChange={event => handlePhoneNumber(event)} value={phoneNumber} className="checkout-window-inputs" type='tel' placeholder="Phone number" />
                    <input onChange={event => handleEmail(event)} value={email} className="checkout-window-inputs" type='email' placeholder="Email" />

                    <span className="checkout-window-subtitle">Your address</span>
                    <input onChange={event => handleAddress(event)} value={address} className="checkout-window-inputs" type='text' placeholder="Address" />
                    {(firstName && lastName && phoneNumber && email && address && !orderRegistred) 
                        ? <input className="checkout-window-btn" type='submit' value='Checkout' />
                        : <input disabled className="checkout-window-btn disable" type='submit' value='Checkout' />
                    }
                    {orderRegistred && <span className="checkout-window-order-done">Done! Your order has been placed. Our manager will contact you shortly to clarify the order</span>}
                    {/* <input className="checkout-window-btn" type='submit' value='Checkout' /> */}
                </form>
                :   
                <div className="checkout-window-false">
                    <span className="checkout-window-false-title">Oops!</span>
                    <span className="checkout-window-false-txt">Ordering is available only to authorized users</span>
                    <Link to={'/profile'} className='checkout-window-false-link'>Login or create a Profile</Link>
                </div>
                }
            </section>
        </div>
    )
}