import { CatalogNavigation } from "../CatalogNavigation";
import { Filter } from "../Filter";
import { Search } from "../Search";

export const CatalogSettings = () => {
    return (
        <section className="catalog-settings">
            <div className="catalog-settings-wrp">
                <Filter />
                {/* <CatalogNavigation /> */}
                <Search />
            </div>
        </section>
    );
}

