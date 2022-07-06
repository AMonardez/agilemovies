import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CarteleraEstrenos.css";

export default function CarteleraEstrenos(){

    let [movies, setMovies] = useState([]);
    let [baseurl, setBaseUrl] = useState('');
    let [page, setPage] = useState(1);

    const traepeliculas = async () =>
        (await fetch(`http://161.35.140.236:9005/api/movies/now_playing?page=${page}`, { 
           method: "GET",
           headers: {
            "Accept": "*/*",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
           }
        })).json();

    let handlemovies = async () => {
        let data = await traepeliculas();
        setBaseUrl(data.imageBaseUrl);
        setMovies([...movies, ...data.data]);
        // console.log("baseurl", baseurl);
        // console.log("estreno",movies);
    }

    //Para que cargue peliculas la primera vez que se renderiza.
    useEffect(() => { 
        (async () => {
            await handlemovies();
        })()
        }, []);

    return (
        <div className='estrenos'> 
            <h2>Películas en estreno</h2>
            <div className='cartelera'>
                { movies.slice(0,7).map(
                    (el, idx) => {
                        let imgurl= baseurl+el.poster_path;
                        return (
                            <div className='card' key={idx}>
                        <Link to='/movie_detail' state = {{"movieinfo":el, "imgbaseurl":baseurl}}>
                            
                                <img className='imgCard' src={imgurl} width="150px"></img>
                                </Link>
                            </div>
                        
                    );})}
            </div>
        </div>
    )
}