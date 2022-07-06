import { useEffect } from "react";
import CarteleraEstrenos from "./CarteleraEstrenos";
import CarteleraPopulares from "./CarteleraPopulares";
import "./Home.css";
import refreshToken from "./Login/middlewares/refresh";
import Userbar from "./Userbar.js";

export default function Home(){
    refreshToken();
    return(
        <>
            <Userbar/>
            <CarteleraEstrenos/>
            <CarteleraPopulares/>
        </>
    );
}
    
