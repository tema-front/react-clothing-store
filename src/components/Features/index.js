import { useState } from "react";
import { Feature } from "./Feature";

export const Features = () => {
    const [featuresList, setFeaturesList] = useState([
        {
            feature: 'delivery', 
            title: 'Free Delivery', 
            info: 'Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models',
        },
        {
            feature: 'stocks', 
            title: 'Sales \u0026 Discount', 
            info: 'Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models',
        },
        {
            feature: 'quality', 
            title: 'Quality assurance', 
            info: 'Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models',
        },
    ])

    return (
        <section className="features">
            <Feature list={featuresList}/>
        </section>      
    );
}