import Footer from './components/Footer';
import Header from './components/Header';
import Product from './components/Product';
import Slider from './components/Slider';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Slider />
      <Product/>
      <Outlet /> 
      <Footer />
    </>
  );
}

export default App;
