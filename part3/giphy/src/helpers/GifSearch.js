import { useEffect, useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GifViewer from "./GifViewer";
import axios from 'axios'
import { useAuth } from "../contexts/authContext";

function GifSearch() {
    const apiKey = '6HdufP6nLgDzMy9VoZFe9OdpCXZlAu7i';
    // capture the user input from the search form
    const [input, setInput] = useState('');
    // handle the data that comes back from our giphy api
    const [gifs, setGifs] = useState([])
    // savedGifs
    // Pagination for Searched Gifs
    const [paginateGifs, setPaginateGifs] = useState([])
    const userData = useAuth()

    console.log('user',userData.user)


    // pagination config values
    const pageSize = 10
    const pageCount = Math.ceil(gifs.length / pageSize)
    const [currentPage, setCurrentPage] = useState(0)

    function handlePagination(e, index) {
        e.preventDefault();
        setCurrentPage(index)
        slicedGifs(gifs)
    }

    const search = async(event) => {
        // This will prevent the page from reloading when submit is clicked
        event.preventDefault();

        const res = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${input}&api_key=${apiKey}&rating=g`)
        console.log(res.data.data)
        setGifs(res.data.data)
        slicedGifs(res.data.data)
        toast(`You have successfully searched for ${input}`)
    }

    function slicedGifs(gifs) {
        const slicedGifs = gifs.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
        console.log('slicing', slicedGifs)
        setPaginateGifs(slicedGifs)
    }

    // we will want to be able to save this data to a db, but for now localStorage
    const save = (gif) => {
        // This is equivilant to our GIF model
        console.log('gifs', gif)
        const gifToPost = {
            "url": gif,
            "title": gif.title,
            "user": {
                "id": userData.user.id
            }
        }
        console.log(gifToPost)

        axios.post('/gifs', gifToPost).then((res) => {
            console.log(res)
            toast('Gif has been successfully saved')
        })


        
    }


    return (
        <div className="container">
            <ToastContainer />
            <div className="row">
                <h3>Search for gifs</h3>
                <form onSubmit={search}>
                    <input value={input} onChange={(event) => setInput(event.target.value)} />
                    <button>Search</button>
                </form>
            </div>
            <div className="row">
                <h3>Results for {input} </h3>

                <Pagination>
                    <PaginationItem disabled={currentPage <= 0}>
                        <PaginationLink 
                            onClick={e => handlePagination(e, currentPage - 1)}
                            previous
                            href="#"    
                        />
                        </PaginationItem>
                        {[...Array(pageCount)].map((page, i) => 
                            <PaginationItem active={i === currentPage} key={i}>
                                <PaginationLink onClick={e => handlePagination(e, i)} href="#">
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                </Pagination>

                <GifViewer 
                    gifs={paginateGifs}
                    buttonAction={save}
                    buttonText={'Save Gif'}
                />
            </div>
        </div>
    )
}

export default GifSearch