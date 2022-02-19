import { useEffect } from "react";

export const SliderSelectedProduct = ({ cardId }) => {

    return (
    <section className="product-selected-slider">
        <button className="slide-btn slide-btn-left">
            <svg width="31" height="31" viewBox="0 0 31 31" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.6998 7.7499L13.9498 15.4999L21.6998 23.2499L20.1498 26.3499L9.2998 15.4999L20.1498 4.6499L21.6998 7.7499Z" />
            </svg>                
        </button>
        <div className="product-selected-wrp">
            <img className="product-selected-img" src={`https://picsum.photos/id/${cardId + 8}/600/724`} height='724' alt="Product photo" />
        </div>
        <button className="slide-btn slide-btn-right">
            <svg width="31" height="31" viewBox="0 0 31 31" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.2998 23.2499L17.0498 15.4999L9.2998 7.7499L10.8498 4.6499L21.6998 15.4999L10.8498 26.3499L9.2998 23.2499Z" />
            </svg>                
        </button>
    </section>
    );
}