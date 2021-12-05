import { HeaderBottom } from './HeaderBottom';
import { HeaderTop } from './HeaderTop';

export const Header = (itsHomePage) => {
    return (
        <header className="header-page">
            <HeaderTop />
            {itsHomePage && <HeaderBottom />}
        </header>
    );
}