import ProductRegistration from "./products/ProductRegistration";
import Header from "./shared/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./products/ProductList";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return ( 
    <BrowserRouter>
      <Toaster position="top-right" />
      <Header />
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<ProductRegistration />} />
        <Route path="/products/:id/edit" element={<ProductRegistration/>}  /> 
      </Routes>
    </BrowserRouter> 
  );
}
 
export default App;