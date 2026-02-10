import ProductRegistration from "./products/ProductRegistration";
import Header from "./shared/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./products/ProductList";
import { Toaster } from 'react-hot-toast';
import RawMaterialRegistration from "./raw-materials/RawMaterialRegistration";
import RawMaterialList from "./raw-materials/RawMaterialList";
import ProductComposition from "./compositions/ProductComposition";
import Home from "./home/Home";
import ProductSuggestions from "./product-suggestions/ProductSugestions";

const App = () => {
  return ( 
    <BrowserRouter>
      <Toaster position="top-right" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<ProductRegistration />} />
        <Route path="/products/:id/edit" element={<ProductRegistration/>}  /> 
        <Route path="/products/:productId/composition" element={<ProductComposition/>}/>
        <Route path="/raw-materials" element={<RawMaterialList/>}/>
        <Route path="/raw-materials/new" element={<RawMaterialRegistration/>} />
        <Route path="/raw-materials/:id/edit" element={<RawMaterialRegistration/>}/>
        <Route path="/product-suggestions" element={< ProductSuggestions/>} />
      </Routes>
    </BrowserRouter> 
  );
}
 
export default App;