import { Categories } from "../Categories";
import { Header } from "../Header";

export const HomePage = () => {
    return (
        <>
        <Header itsHomePage={true}/>
        <main className="content-home">
            <Categories />
            <div className="products-info">
                <span className="products-title">Fetured Items</span>
                <p className="products-txt">Shop for items based on what we featured in this week</p>
            </div>  
        </main>
        </>
    );
}