import { Link } from "react-router";
import logoNoText from "../assets/logo-no_text.png";
import BtnFooter from "../components/BtnFooter";

function Home() {
  return (
    <>
      <main className="flex-1 w-75 mx-auto flex flex-col justify-center items-center">
        <h1 className="mb-6 w-full text-6xl font-bold tracking-wider uppercase text-center">
          Bet<span className="text-4xl lowercase">a</span>B
          <span className="text-4xl lowercase">o</span>x
        </h1>
        <img className="w-full px-6" src={logoNoText} alt="" />
      </main>
      <Link to="/login">
        <BtnFooter>Sign in</BtnFooter>
      </Link>
    </>
  );
}

export default Home;
