import Login from "../components/buttons/LoginButton";
import Logout from "@/components/buttons/LogoutButton";

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>
      <Login />
      <Logout />
    </>
  );
};

export default Home;
