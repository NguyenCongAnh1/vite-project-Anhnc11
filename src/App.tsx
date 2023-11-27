import './App.css'
import ShoppingCart from './components/cart/cart'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Example from './components/lanningPage/LannningPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import CmsPage from './components/cmsPage/CmsPage';
import { createContext, useState } from 'react';
import Login from './components/login/login';
import useApi, { UseApiOptions, UseApiResult } from './components/api/api';
import DataContext from './store/Context';


export interface Product {
  name: string;
  price: number;
  quantity: number;
  productId: number;
  image: string;
}

const App: React.FC = () => {


  const apiOptions: UseApiOptions = {
    url: 'http://localhost:3000',
    method: 'GET',
  }
  const { data, loading, error }: UseApiResult = useApi(apiOptions);
  const [cart, setCart] = useState<Product[]>([]);
  return (
    <DataContext.Provider value={data? data: []}>
      <Router>
        <Routes>
          <Route path="/" element={<Example />} />
          <Route path="shop" element={<ShoppingCart {...{ cart, setCart }} />} />
          <Route path="CMS" element={<CmsPage />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>

    </DataContext.Provider>


  )
}

export default App
