import { HeaderBottom } from './HeaderBottom';
import { HeaderTop } from './HeaderTop';

export const Header = ({isHomePage, isCatalog, isNavigate, title, auth}) => {
    return (
        <header className="header-page">
            <HeaderTop />
            <HeaderBottom isHomePage={isHomePage} isCatalog={isCatalog} isNavigate={isNavigate} title={title} auth={auth} />
        </header>
    );
}