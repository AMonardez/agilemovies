import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import LoadingSpinner from "./LoadingSpinner";
import "./CarteleraPopulares.css";

export default function CarteleraPopulares() {
    let [movies, setMovies] = useState([]);
    let [page, setPage] = useState(1);
    let [baseurl, setBaseUrl] = useState('');

    const traepeliculas = async (page) =>
        (await fetch(`http://161.35.140.236:9005/api/movies/popular?page=${page}`, { 
           method: "GET",
           headers: {
            "Accept": "*/*",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
           }
        })).json();

    let handlemovies = async () => {
        let data = await traepeliculas(page);
        setBaseUrl(data.imageBaseUrl);
        setMovies([...movies, ...data.data]);
        setPage(page+1);
    }

    //Para que cargue peliculas la primera vez que se renderiza.
    useEffect(() => { 
        ;(async () => {
            await handlemovies();
        })()
        }, [])

    // let handleclick = async (e) =>{
    //     e.preventDefault();
    //     let data = await traepeliculas(page);
    //     setBaseUrl(data.imageBaseUrl);
    //     setMovies([...movies, ...data.data]);
    //     setPage(page+1);
    // };


    return (<div className='popularmovies'>
        <h2>Películas más populares</h2>
        
        <InfiniteScroll
            dataLength={movies.length}
            next={handlemovies}
            hasMore={true}
            loader={<LoadingSpinner/>}
        >
            <div className="moviegrid">
        {movies.map(
            (el, idx)=> {
                let imgurl= baseurl + el.poster_path;
                return (<div className='moviecard' key ={idx}>


                    <Link to='/movie_detail' state = {{"movieinfo":el, "imgbaseurl":baseurl}}>
                        <img className='moviecover' src={imgurl} width={"200px"}></img>
                    </Link>
                    
                    <p className='movietitle'>{el.title}</p>
                </div>);
            }
        )}
        </div>
        </InfiniteScroll>
        </div>
    );
}