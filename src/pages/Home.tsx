import { Link } from "react-router";
import logoNoText from "../assets/logo-no_text.png";

function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-75">
        <h1 className="mb-6 w-full text-6xl font-bold tracking-wider uppercase text-center">
          Bet<span className="text-4xl lowercase">a</span>B
          <span className="text-4xl lowercase">o</span>x
        </h1>
        <img className="w-full px-6" src={logoNoText} alt="" />
      </div>
      <Link
        to="/login"
        className="fixed bottom-0 w-full bg-foreground hover:brightness-150 flex justify-center items-center cursor-pointer">
        <p className="text-background uppercase px-auto py-3">Login</p>
      </Link>
    </div>
  );
}

export default Home;
