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
      <div className="e_biding_container min-h-screen py-32">
        {children}
      </div>
      <Footer />
    </div>
  );
}
