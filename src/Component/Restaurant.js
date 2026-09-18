
// import { useEffect, useState } from "react";
// import RestCard from "./RestCard";

// export default function Restaurant() {

//   const [restData, setRestData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");


//   useEffect(() => {

//     async function fetchData() {

//       try {

//         const response = await fetch(
//           "http://localhost:5000/api/restaurants?lat=28.7040592&lng=77.10249019999999"
//         );


//         if (!response.ok) {
//           throw new Error(`HTTP Error: ${response.status}`);
//         }


//         const data = await response.json();

//         console.log("Swiggy API Data:", data);


//         // Find restaurant card dynamically
//         const restaurantCard = data?.data?.cards?.find(
//           (card) =>
//             card?.card?.card?.gridElements?.infoWithStyle?.restaurants
//         );


//         // Get restaurants
//         const restaurants =
//           restaurantCard?.card?.card?.gridElements?.infoWithStyle
//             ?.restaurants || [];


//         setRestData(restaurants);


//       } catch (error) {

//         console.error("Error fetching restaurant data:", error);

//         setError(
//           "Failed to load restaurants. Please try again."
//         );

//       } finally {

//         setLoading(false);

//       }

//     }


//     fetchData();

//   }, []);


//   // Loading
//   if (loading) {

//     return (
//       <div className="text-center mt-20 text-lg">
//         Loading restaurants...
//       </div>
//     );

//   }


//   // Error
//   if (error) {

//     return (
//       <div className="text-center mt-20 text-red-500 text-lg">
//         {error}
//       </div>
//     );

//   }


//   return (

//     <div className="flex flex-wrap w-[80%] mx-auto mt-20 gap-5">

//       {restData.map((restInfo) => (

//         <RestCard
//           key={restInfo?.info?.id}
//           restInfo={restInfo}
//         />

//       ))}

//     </div>

//   );
// }


// import { useEffect, useState } from "react";
// import RestCard from "./RestCard";

// export default function Restaurant(){
   
//     const [RestData, setRestData] = useState([])

//     useEffect(()=>{
    
//      async function fetchData() {
        
//         const proxyServer = "https://cors-anywhere.herokuapp.com/"
//         const swiggyAPI = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true";
//         const response = await fetch(proxyServer+swiggyAPI);
//         const data = await response.json();

//          console.log(data?.data?.cards);
//         setRestData(data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
//      }

//      fetchData();
//     },[])

//     // console.log(RestData);
   

//     return (
//         <div className="flex flex-wrap w-[80%] mx-auto mt-20 gap-5">
            
//             {
//                 RestData.map((restInfo)=><RestCard key={restInfo?.info?.id} restInfo={restInfo}></RestCard>)
//             }

//         </div>
//     )

// }



import { useEffect, useState } from "react";
import RestCard from "./RestCard";
import Shimmer from "./Shimmer";

export default function Restaurant() {

    const [RestData, setRestData] = useState([]);

    useEffect(() => {

        async function fetchData() {

            const proxyServer = "https://cors-anywhere.herokuapp.com/";
            const swiggyAPI = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true";
            const response = await fetch(proxyServer + swiggyAPI);
            const data = await response.json();
             console.log("Full API Data:", data);

            // Get all cards
            const cards = data?.data?.cards || [];

            // Find the card which contains restaurants
            const restaurantCard = cards.find((item) => item?.card?.card?.gridElements?.infoWithStyle?.restaurants);

            // Get restaurant array
            const restaurants = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

            console.log("Restaurant Data:", restaurants);

            setRestData(restaurants);
        }

        fetchData();

    }, []);


    if(RestData.length==0)
         return <Shimmer></Shimmer>

    return (
        <div className="flex flex-wrap w-[80%] mx-auto mt-20 gap-5">

            {RestData.map((restInfo) => (
                <RestCard  key={restInfo?.info?.id} restInfo={restInfo}
                />
            ))}

        </div>
    );
}