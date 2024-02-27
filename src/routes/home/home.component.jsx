import Directory from "../../components/directory/directory.component";
import DragShuffleHero from "../../components/hero/DragShuffleHero.component";

const Home = () => {
  //comment

  return (
    <div>
      <div className="py-5">
        <DragShuffleHero />
      </div>
      <Directory />
    </div>
  );
};

export default Home;
