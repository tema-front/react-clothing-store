export const HeaderBottom = ({isHomePage, isCatalog, isNavigate, title}) => {
    return (
        <>
            {isHomePage && 
                <section className="header-homepage-bottom">
                    <div className="header-preview-img-man"></div>
                    <div className="header-brand-name">
                        <div className="header-brand-name-wrp">
                            <div className="header-brand-decor-block"></div>
                            <span className="header-brand-name-title">the&nbsp;bazzy</span>
                            <span className="header-brand-name-subtitle">of&nbsp;luxerius&nbsp;
                            <span className="header-brand-name-subtitle-red">fashion</span>
                            </span>
                        </div>
                    </div>
                </section>
            }
            {isCatalog && 
                <section className="header-page-product-bottom header-page-bottom">
                    <div className="header-page-product-bottom-wrp header-page-bottom-wrp">
                        <span className="header-page-bottom-title header-page-product-bottom-title">{title}</span>
                        {isNavigate && 
                            <nav className="products-category">
                                <button className="products-category-item-btn">home</button> /
                                <button className="products-category-item-btn">&nbsp;men</button> /
                                <button className="products-category-item-btn">&nbsp;arrivals</button>
                            </nav>
                        }
                    </div>
                </section>
            }
        </>
    );
}

