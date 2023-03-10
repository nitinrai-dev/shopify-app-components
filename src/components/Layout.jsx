import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Header />
      <main className="w-full h-screen p-6">{children}</main>
    </div>
  );
};

export default Layout;
