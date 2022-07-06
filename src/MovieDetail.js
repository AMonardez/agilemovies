import { useLocation } from "react-router-dom";
import Userbar from "./Userbar";
import "./MovieDetail.css";
import { useState , useEffect} from "react";

export default function MovieDetail(){
    let params = useLocation().state; //Para pasar los params desde un Link anterior.
    let imgbaseurl = params.imgbaseurl;
    let movieinfo = params.movieinfo;
    let posterimgurl = imgbaseurl + movieinfo.poster_path; 
    let bannerimgurl = imgbaseurl + movieinfo.backdrop_path;

    let [actors, setActors] = useState([]);
    let [actorsbaseurl, setactorsbaseurl] = useState("");

    const getActors = async (movieid) =>
        (await fetch(`http://161.35.140.236:9005/api/movies/${movieid}/actors`, { 
           method: "GET",
           headers: {
            "Accept": "*/*",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
           }
        })).json();

    let handleActors = async (movieid) => {
        let data = await getActors(movieid);
        setActors([...actors, ...data.data]);
        setactorsbaseurl(data.imageBaseUrl);
        // console.log(actorsbaseurl);
        // console.log(actors);
    }

    //Para que cargue peliculas la primera vez que se renderiza.
    useEffect(() => { 
        (async () => {
            await handleActors(movieinfo.id);
        })() //hack recomendado por la docu de react
    }, []);

    return(
        <>
        <Userbar/>
            <h2>{movieinfo.title}</h2>
            <div className="banner"
            style={{
                "backgroundImage" : `url(${bannerimgurl})`,
               
            }}/>
            <div className='movieDetails'>
                <img className='posterimg' src={posterimgurl} height="200px"></img>
                {movieinfo.overview}
            </div>
            <div>
                <h2>Reparto</h2>
                <div className='actorRow'>
                    {actors.map(
                        (el, idx) =>{
                            let fullactorurl = actorsbaseurl + el.profile_path;
                            if(!el.profile_path) fullactorurl = 'https://via.placeholder.com/200x300';
                            return <div className='actorcard' key={idx}>
                                <img className='actorimg' src={fullactorurl} width='200px' height='300px'></img>
                                <p className='actorname'>{el.name}</p>
                            </div>
                        }
                    )}
                </div>
            </div>           
        </>
    );
}