import { useState } from "react";

export const Subscribing = () => {
    const [subscribingEmail, setSubscribingEmail] = useState('');

    return (
        <div className="subscribing">
            <span className="subscribing-title">subscribe</span>
            <span className="subscribing-subtitle">for our newletter and promotion</span>
            <div className="subscribing-wrap">
                <form action="#" className="subscribing-form">
                    <input 
                        className="subscribing-input-email" 
                        type="email" 
                        placeholder="Enter Your Email"
                        value={subscribingEmail}
                        onChange={(event) => {setSubscribingEmail(event.target.value)}}
                        required 
                    />
                    <input className="subscribing-btn" type="submit" value="Subscribe" />
                </form>
            </div>
        </div>
    );
}

