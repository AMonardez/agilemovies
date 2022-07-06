import CarteleraEstrenos from "./CarteleraEstrenos";
import CarteleraPopulares from "./CarteleraPopulares";
import "./Home.css";
import Userbar from "./Userbar.js";

export default function Home(){
    return(
        <>
            <Userbar/>
            <CarteleraEstrenos/>
            <CarteleraPopulares/>
        </>
    );
}
    
