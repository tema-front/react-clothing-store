import { Footer } from "../Footer";
import { Header } from "../Header";
import notFoundImg from '../../img/.png/notfound.png'
import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <>
        <Header />
        <main className="content-notfound">
            <div className="content-notfound-wrp">
                <div className="notfound-info">
                    <span className="notfound-title">Oops!</span>
                    <nav className="notfound-ways-return">
                        <ul className="notfound-ways-return-list">
                            <Link className="notfound-ways-return-list-item" to={'/home'}><li>Home</li></Link>
                            <Link className="notfound-ways-return-list-item" to={'/catalog/1'}><li>Catalog</li></Link>
                            <Link className="notfound-ways-return-list-item" to={'/profile'}><li>Profile</li></Link>
                        </ul>
                    </nav>
                </div>
                <img className="notfound-img" src={notFoundImg} alt='PageNotFound' height='617'></img>
            </div>
        </main>
        <Footer className='footer-page-notfound' />
        </>
    );
}