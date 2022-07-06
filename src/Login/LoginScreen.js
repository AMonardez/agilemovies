import { useState } from "react";
import "./LoginScreen.css";
import apilogin from "./middlewares/login";

export default function LoginScreen(){
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    async function clickHandler(event) {
        event.preventDefault();
        const loginado = await apilogin(username, password);
        if(loginado===true) {
            window.location.href="/home";
        }
        else alert("Error de credenciales. Vuelva a intentarlo.");
    };
    
    return(
        <div>
            <form className="borde">
                <h3>AgileMovies</h3>
                <p>Ingrese con sus credenciales.</p>
                <legend for='user_field'>Usuario:</legend>
                <input type='text' id='user_field' requiered value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
                <legend for='user_field'>Contraseña:</legend> 
                <input type='text' requiered id='pass_field' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button onClick={clickHandler}>Iniciar Sesión</button>
            </form>
        </div>
    );

}