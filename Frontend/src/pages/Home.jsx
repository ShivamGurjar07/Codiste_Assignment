import TravelForm from "../components/TravelForm";
import TravelList from "../components/TravelList";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import TravelMap from "../components/TravelMap";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1 className="h1">Travel Log</h1>
      {user ? (
        <>
          {/* <TravelForm refreshEntries={() => {}} /> */}
          <TravelList />
          {/* <TravelMap/> */}
        </>
      ) : (
        <div className="main-div">
          <p className="p">Please log in to view and add travel entries.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
