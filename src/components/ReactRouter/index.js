import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Catalog } from '../Catalog';
import { HomePage } from '../HomePage';
import { NotFound } from '../NotFound';
import { Profile } from '../Profile';

export const ReactRouter = () => {
    return (
        <BrowserRouter>
        <Routes>
            {/* <Route path='/' redirect='/homepage' element={<HomePage />} /> */}
            <Route path='/home' element={<HomePage />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/catalog' element={<Catalog />} />

            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path='*'  element={<NotFound />} />
            {/* <Route path='/product' element={}>
                <Route path=':productId' element={}></Route>
            </Route> */}


        </Routes>
        </BrowserRouter>
    );
}