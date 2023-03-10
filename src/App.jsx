import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Sections/Home";
import Products from "./components/Sections/Products";
import Orders from "./components/Sections/Orders";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
      </Routes>
    </Layout>
  );
}
