
// import { useEffect, useState } from "react";
// import RestCard from "./RestCard";
// import Shimmer from "./Shimmer";

// export default function Restaurant() {

//     const [RestData, setRestData] = useState([]);

//     useEffect(() => {

//         async function fetchData() {

//             const proxyServer = "https://cors-anywhere.herokuapp.com/";
//             const swiggyAPI = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true";
//             const response = await fetch(proxyServer + swiggyAPI);
//             const data = await response.json();
//              console.log("Full API Data:", data);

//             // Get all cards
//             const cards = data?.data?.cards || [];

//             // Find the card which contains restaurants
//             const restaurantCard = cards.find((item) => item?.card?.card?.gridElements?.infoWithStyle?.restaurants);

//             // Get restaurant array
//             const restaurants = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

//             console.log("Restaurant Data:", restaurants);

//             setRestData(restaurants);
//         }

//         fetchData();

//     }, []);


//     if(RestData.length==0)
//          return <Shimmer></Shimmer>

//     return (
//         <div className="flex flex-wrap w-[80%] mx-auto mt-20 gap-5">

//             {RestData.map((restInfo) => (
//                 <RestCard  key={restInfo?.info?.id} restInfo={restInfo}
//                 />
//             ))}

//         </div>
//     );
// }






import { useEffect, useState } from "react";
import RestCard from "./RestCard";
import Shimmer from "./Shimmer";

export default function Restaurant() {
    const [RestData, setRestData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const swiggyAPI =
                    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true";

                const proxyServer =
                    "https://corsproxy.io/?key=6f542ca7&url=";

                const response = await fetch(
                    proxyServer + encodeURIComponent(swiggyAPI)
                );

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                const data = await response.json();

                console.log("Full API Data:", data);

                const cards = data?.data?.cards || [];

                const restaurantCard = cards.find(
                    (item) =>
                        item?.card?.card?.gridElements?.infoWithStyle?.restaurants
                );

                const restaurants =
                    restaurantCard?.card?.card?.gridElements?.infoWithStyle
                        ?.restaurants || [];

                console.log("Restaurant Data:", restaurants);

                setRestData(restaurants);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        }

        fetchData();
    }, []);

    if (RestData.length === 0) {
        return <Shimmer />;
    }

    return (
        <div className="flex flex-wrap w-[80%] mx-auto mt-20 gap-5">
            {RestData.map((restInfo) => (
                <RestCard
                    key={restInfo?.info?.id}
                    restInfo={restInfo}
                />
            ))}
        </div>
    );
}