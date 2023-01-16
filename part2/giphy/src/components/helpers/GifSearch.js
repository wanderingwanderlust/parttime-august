import { useEffect, useState } from "react";
import GifViewer from "./GifViewer";
import axios from 'axios'

function GifSearch() {
    const apiKey = '6HdufP6nLgDzMy9VoZFe9OdpCXZlAu7i';
    // capture the user input from the search form
    const [input, setInput] = useState('');
    // handle the data that comes back from our giphy api
    const [gifs, setGifs] = useState([])

    const search = async(event) => {
        // This will prevent the page from reloading when submit is clicked
        event.preventDefault();

        const res = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${input}&api_key=${apiKey}&rating=g&limit=10`)
        console.log(res.data.data)
        setGifs(res.data.data)
    }

    // we will want to be able to save this data to a db, but for now localStorage
    const save = (gif_url) => {

    }

    return (
        <div className="container">
            <div className="row">
                <h3>Search for gifs</h3>
                <form onSubmit={search}>
                    <input value={input} onChange={(event) => setInput(event.target.value)} />
                    <button>Search</button>
                </form>
            </div>

            <div className="row">
                <h3>Results for {input} </h3>
                <GifViewer 
                    gifs={gifs}
                    buttonAction={save}
                    buttonText={'Save Gif'}
                />
            </div>
        </div>
    )
}

export default GifSearch