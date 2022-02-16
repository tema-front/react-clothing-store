import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recieveDeliveryPrice, resetDeliveryPrice } from "../../store/cart/actions";
import { getDeliveryPrice } from "../../store/cart/selectors";

export const CartShippingAdress = () => {
    const [country, setCountry] = useState('');
    const [sity, setSity] = useState('');
    const [postcode, setPostcode] = useState('');
    const dispatch = useDispatch();
    const deliveryPrice = useSelector(getDeliveryPrice);

    const handleCountry = (event) => {
        setCountry(event.target.value);
    }

    const handleSity = (event) => {
        setSity(event.target.value);
    }

    const handlePostcode = (event) => {
        setPostcode(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (country && sity && postcode && !deliveryPrice) dispatch(recieveDeliveryPrice)
    }

    useEffect(() => {
        if (!country && !sity && !postcode && deliveryPrice) dispatch(resetDeliveryPrice)
    }, [])

    return (
        <>
        <section className="products-delivery-adress">
            <span className="products-delivery-adress-heading">shipping adress</span>
            <form onSubmit={event => handleSubmit(event)} className="products-delivery-form">
                <input onChange={event => handleCountry(event)} value={country} className="products-delivery-form-item"type="text" placeholder="Country" />
                <input onChange={event => handleSity(event)} value={sity} className="products-delivery-form-item" type="text" placeholder="Sity"/>
                <input onChange={event => handlePostcode(event)} value={postcode} className="products-delivery-form-item"type="number" placeholder="Postcode / Zip" />
                <input className="products-delivery-form-submit-btn"type="submit" value="get a quote" />
            </form>
        </section>
        </>
    );
}