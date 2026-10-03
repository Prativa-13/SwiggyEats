// import { useEffect, useState } from "react";
// import {Link, useParams } from "react-router";
// import MenuCard from "./MenuCard"


// export default function RestaurantMenu(){
   
//     let {id} = useParams();
//      const [selected, setSelected] = useState(null);
//     console.log(id);

//     const [RestData, setRestData] = useState([]);

//     useEffect(()=>{
    
//         async function fetchData() {
           
//             const proxyServer = "https://cors-anywhere.herokuapp.com/";
//            const swiggyAPI =  `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId=${id}`;
//            const response = await fetch(proxyServer+swiggyAPI);
//            const data = await response.json();
//            const tempData = data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
//            const filterData = tempData.filter((items)=> 'title' in items?.card?.card || {})
//            setRestData(filterData);
//         }
   
//         fetchData();
//        },[id])

//        console.log(RestData);


//          return(

//       <div>
//       <div className="w-[80%] mx-auto mt-20 mb-20">
//       <Link to={`/city/delhi/${id}/search`}>
//       <p className="w-full text-center py-4 rounded-4xl bg-gray-200 text-2xl">Search for Dishes</p>
//       </Link>
//       </div>  
      
//       <div className="w-[80%] mx-auto mt-20 mb-20">
//       <button className={`text-2xl py-2 px-8 mr-4 border rounded-2xl ${selected==="veg"? "bg-green-600": "bg-gray-300"} `} onClick={()=>setSelected(selected==='veg'?null:'veg')}>Veg</button>
//       <button className={`text-2xl py-2 px-4 border rounded-2xl ${selected==="nonveg"? "bg-red-500": "bg-gray-300"}`} onClick={()=>setSelected(selected==='nonveg'?null:'nonveg')}>Non veg</button>
//       </div>

//         <div className="w-[80%] mx-auto mt-20">
//           {
//             RestData.map((menuItems)=><MenuCard key={menuItems?.card?.card?.title} menuItems={menuItems?.card?.card} foodselected={selected}></MenuCard>)
//           }
//         </div>
//         </div>
//     )

// }

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import MenuCard from "./MenuCard";

export default function RestaurantMenu() {
    const { id } = useParams();

    const [selected, setSelected] = useState(null);
    const [RestData, setRestData] = useState([]);

    console.log("Restaurant ID:", id);

    useEffect(() => {
        async function fetchData() {
            try {
                const swiggyAPI = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId=${id}`;

                const proxyServer =
                    "https://corsproxy.io/?key=6f542ca7&url=";

                const response = await fetch(
                    proxyServer + encodeURIComponent(swiggyAPI)
                );

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                const data = await response.json();

                console.log("Full Menu Data:", data);

                // Find the card which contains the REGULAR menu
                const menuCard = data?.data?.cards?.find(
                    (item) =>
                        item?.groupedCard?.cardGroupMap?.REGULAR?.cards
                );

                console.log("Menu Card:", menuCard);

                // Get menu categories
                const tempData =
                    menuCard?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

                // Keep only cards which have a title
                const filterData = tempData.filter(
                    (items) => items?.card?.card?.title
                );

                console.log("Menu Data:", filterData);

                setRestData(filterData);

            } catch (error) {
                console.error("Restaurant menu error:", error);
            }
        }

        if (id) {
            fetchData();
        }
    }, [id]);

    return (
        <div>
            <div className="w-[80%] mx-auto mt-20 mb-20">
                <Link to={`/city/delhi/${id}/search`}>
                    <p className="w-full text-center py-4 rounded-4xl bg-gray-200 text-2xl">
                        Search for Dishes
                    </p>
                </Link>
            </div>

            <div className="w-[80%] mx-auto mt-20 mb-20">
                <button
                    className={`text-2xl py-2 px-8 mr-4 border rounded-2xl ${
                        selected === "veg"
                            ? "bg-green-600"
                            : "bg-gray-300"
                    }`}
                    onClick={() =>
                        setSelected(
                            selected === "veg" ? null : "veg"
                        )
                    }
                >
                    Veg
                </button>

                <button
                    className={`text-2xl py-2 px-4 border rounded-2xl ${
                        selected === "nonveg"
                            ? "bg-red-500"
                            : "bg-gray-300"
                    }`}
                    onClick={() =>
                        setSelected(
                            selected === "nonveg" ? null : "nonveg"
                        )
                    }
                >
                    Non veg
                </button>
            </div>

            <div className="w-[80%] mx-auto mt-20">
                {RestData.map((menuItems) => (
                    <MenuCard
                        key={menuItems?.card?.card?.title}
                        menuItems={menuItems?.card?.card}
                        foodselected={selected}
                    />
                ))}
            </div>
        </div>
    );
}