import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const Menu = ({ onCloseMenu }) => {
    const handleCloseMenu = () => {
        onCloseMenu();
    }

    useEffect(() => {
        document.addEventListener("click", event => handleClick(event))

        return () => document.removeEventListener('click', handleClick)

        // document.addEventListener("click", (event) => {
        //     const menuExist = event.composedPath().find(element => element.id === 'menu')
        //     if (event.target.id != 'menu' && !menuExist) {
        //         onCloseMenu();
        //     };
        // });
    }, [])

    const handleClick = (event) => {
        const menuExist = event.composedPath().find(element => element.id === 'menu')
        if (event.target.id != 'menu' && !menuExist) {
            onCloseMenu();
        };
    }

    return (
        <section id="menu" className='menu'>
            <svg onClick={() => handleCloseMenu()} className="products-added-item-cross" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" />
            </svg>   
            <span className="menu-title">menu</span>
            <ul className="menu-list">
                <input type="checkbox" id="menu-list-item-catalog" className="menu-list-item-checkbox"/>
                <label htmlFor="menu-list-item-catalog"> 
                    <li className="menu-list-item">catalog</li>
                </label>
                <ul className="menu-sublist">
                    <li className="menu-sublist-item"><Link to={'/catalog/1'} className="menu-sublist-item-txt"><span>All products</span></Link></li>
                    <li className="menu-sublist-item"><span className="menu-sublist-item-txt">Men</span></li>
                    <li className="menu-sublist-item"><span className="menu-sublist-item-txt">Women</span></li>
                    <li className="menu-sublist-item"><span className="menu-sublist-item-txt">Kids</span></li>
                    <li className="menu-sublist-item"><span className="menu-sublist-item-txt">Accessories</span></li>
                </ul>


                <input type="checkbox" id="menu-list-item-account" className="menu-list-item-checkbox"/>
                <label htmlFor="menu-list-item-account">
                    <li className="menu-list-item">account</li>
                </label>
                <ul className="menu-sublist">
                    <li className="menu-sublist-item"><Link to={'/profile'} className="menu-sublist-item-txt"><span>Profile</span></Link></li>
                    <li className="menu-sublist-item"><span className="menu-sublist-item-txt">Login</span></li>
                    <li className="menu-sublist-item"><span className="menu-sublist-item-txt">Logout</span></li>
                    <li className="menu-sublist-item"><span className="menu-sublist-item-txt">Registration</span></li>
                </ul>
                

                <input type="checkbox" id="menu-list-item-cart" className="menu-list-item-checkbox"/>
                <label htmlFor="menu-list-item-cart">
                    <li className="menu-list-item">cart</li>
                </label>
                <ul className="menu-sublist">
                    <li className="menu-sublist-item"><Link to={'/cart'} className="menu-sublist-item-txt"><span className="menu-sublist-item-txt">My cart</span></Link></li>
                    <li className="menu-sublist-item"><span className="menu-sublist-item-txt">Clear shopping cart</span></li>
                </ul>
            </ul>
        </section>
    );
}