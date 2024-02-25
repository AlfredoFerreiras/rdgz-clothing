import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.styles.scss";

const catagories = [
  {
    id: 1,
    title: "Hats",
    imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    routes: "shop/hats",
  },
  {
    id: 2,
    title: "Jackets",
    imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    routes: "shop/jackets",
  },
  {
    id: 3,
    title: "Sneakers",
    imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    routes: "shop/Sneakers",
  },
  {
    id: 4,
    title: "Womens",
    imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
    routes: "shop/womens",
  },
  {
    id: 5,
    title: "Mens",
    imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
    routes: "shop/mens",
  },
];

const Directory = () => {
  return (
    <div className="directory-container">
      {catagories?.map((category) => {
        return <DirectoryItem key={category.id} category={category} />;
      })}
    </div>
  );
};

export default Directory;
