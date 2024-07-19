import { Link, useLocation } from "react-router-dom";
import { logo } from "../../assets";
import { Links } from "../../constants";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Nav() {
  const location = useLocation()
  return (
    <nav className="w-full border shadow fixed top-0 left-0 z-[900] bg-white py-5">
      <div className="e_biding_container flex justify-between items-center">
        <div>
          <img src={logo} alt="" />
        </div>

        <div className="flex justify-between gap-8 items-center ">
          {Links.map((link) => (
            <Link to={link.link} key={link.link}>
              <div className={`${location.pathname === link.link && "border-b-2 border-EBD-Primary"}`}>
                <p
                  className={`${
                    location.pathname === link.link
                      ? "text-EBD-Primary border-EBD-Primary"
                      : " text-EBD/Medium"
                  } text-md leading-6 font-semibold`}
                >
                  {link.label}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="w-[12rem] rounded-lg h-10 border border-b-EBD/Light flex justify-between items-center px-2">
          <div className="w-6 h-6 rounded-full border border-black"></div>
          <p className="text-md text-EBD/Dark font-medium">Wale Adigun</p>
          <ExpandMoreIcon />
        </div>
      </div>
    </nav>
  );
}
