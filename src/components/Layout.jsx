import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Header />
      <main className="w-full h-screen overflow-auto bg-gray-50">{children}</main>
    </div>
  );
};

export default Layout;
