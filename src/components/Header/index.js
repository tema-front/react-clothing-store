import { HeaderBottom } from './HeaderBottom';
import { HeaderTop } from './HeaderTop';

export const Header = ({isHomePage, isCatalog, isNavigate, title}) => {
    return (
        <header className="header-page">
            <HeaderTop />
            <HeaderBottom isHomePage={isHomePage} isCatalog={isCatalog} isNavigate={isNavigate} title={title}/>
        </header>
    );
}