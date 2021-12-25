export const CartShippingAdress = () => {
    return (
        <>
        <div className="products-delivery-adress">
            <span className="products-delivery-adress-heading">shipping adress</span>
            <form className="products-delivery-form">
                <input className="products-delivery-form-item" type="text" placeholder="Bangladesh"/>
                <input className="products-delivery-form-item"type="text" placeholder="State" />
                <input className="products-delivery-form-item"type="text" placeholder="Postcode / Zip" />
                <input className="products-delivery-form-submit-btn"type="submit" value="get a quote" />
            </form>
        </div>
        </>
    );
}