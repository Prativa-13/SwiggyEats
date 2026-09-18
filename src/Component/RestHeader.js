import { useSelector } from "react-redux"
import { Link } from "react-router";


export default function RestHeader(){

    const counter = useSelector(state=> state.cartslice.count);
    
    return (
        <div className="container w-[70%] mx-auto py-3 px-6 mt-4 bg-white shadow-md rounded-xl text-5xl flex justify-between items-center">
            <div>
                <p className="text-orange-600 font-bold text-3xl">Swiggy</p>
            </div>
            <div>
                <Link to="/Checkout">
                <p className="text-xl font-semibold text-gray-700 hover:text-orange-600 cursor-pointer">Cart {`(${counter})`}</p>
                </Link>
            </div>
        </div>
    )
}