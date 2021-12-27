import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Cart } from '../Cart';
import { Catalog } from '../Catalog';
import { HomePage } from '../HomePage';
import { NotFound } from '../NotFound';
import { PageSelectedProduct } from '../PageSelectedProduct';
import { PageProfile } from '../PageProfile';

export const ReactRouter = () => {
    return (
        <BrowserRouter>
        <Routes>
            {/* <Route path='/' redirect='/homepage' element={<HomePage />} /> */}
            <Route path='/home' element={<HomePage />} />
            <Route path='/catalog' element={<Catalog />}>
                    <Route path=':pageId' element={<Catalog />}/>
            </Route>
            <Route path='/profile' element={<PageProfile />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/product' element={<PageSelectedProduct />}>
                    <Route path=':productId' element={<PageSelectedProduct />}/>
            </Route>

            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path='*'  element={<NotFound />} />
            {/* <Route path='/product' element={}>
                <Route path=':productId' element={}></Route>
            </Route> */}


        </Routes>
        </BrowserRouter>
    );
}