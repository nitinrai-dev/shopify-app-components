import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Sections/Home";
import Products from "./components/Sections/Products";
import Orders from "./components/Sections/Orders";
import Account from "./components/Sections/Account";
import Settings from "./components/Sections/Settings";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="settings" element={<Settings />} />
        <Route path="account" element={<Account />} />
      </Routes>
    </Layout>
  );
}
