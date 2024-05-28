import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";
import { CDN_URL, Menu_Api } from "../Utils/Constants";
import { useParams } from "react-router-dom";
import RestaurantCaregory from "./RestaurantCaregory";

const ResturantMenu = () => {
  const { resId } = useParams();
  const [resInfo, setResInfo] = useState(null);
  // console.log(resInfo);
  const [showIndex,setShowIndex]=useState()

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(Menu_Api + resId);
    const json = await data.json();
    // console.log(json);
    setResInfo(json.data);
  };
  //doubt
  // console.log(resInfo);
  if (resInfo !== null) {
    let { name, cuisines, costForTwoMessage } =
      resInfo?.cards[2]?.card?.card?.info;
    // console.log(name);

    const { itemCards } =
      resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card
        ?.card;
    // console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

    const categories =
      resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) =>
          c.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );
    console.log(categories);

    return (
      <div>
        <div className="justify-center bg-cyan-500 text-center p-4 text-lg">
        <h2>{name}</h2>
        <p>
          {cuisines.join(", ")} - {costForTwoMessage}
        </p>
        </div>
           {categories.map((category,index)=>(<RestaurantCaregory data={category?.card?.card} key={category?.card?.card.title}
           showItems={index === showIndex ? true : false}
           setShowIndex={()=> setShowIndex(index)}/>))}
      </div>
    );
  }
};

export default ResturantMenu;
