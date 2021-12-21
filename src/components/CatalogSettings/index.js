import { CatalogNavigation } from "../CatalogNavigation";
import { Filter } from "../Filter";

export const CatalogSettings = () => {
    return (
        <section className="catalog-settings">
            <div className="catalog-settings-wrp">
                <Filter />
                <CatalogNavigation />
            </div>
        </section>
    );
}

