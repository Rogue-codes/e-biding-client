import { ReactNode } from "react";
import Nav from "../components/nav/Nav";
import Footer from "../components/footer/Footer";

interface ILayout {
  children: ReactNode;
}
export default function Layout({ children }: ILayout) {
  return (
    <div>
      <Nav />
      <Footer />
      <div className="ml-[20vw] px-6 w-[calc(100vw-20vw)] h-screen overflow-y-scroll py-24">
        {children}
      </div>
    </div>
  );
}
