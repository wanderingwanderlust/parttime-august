import GifViewer from "../helpers/GifViewer";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import axios from "axios";
import { toast } from "react-toastify";

function GifSavePage() {
    const [userGifs, setUserGifs] = useState([]);
    const userData = useAuth()

    useEffect(() => {
        fetchGifs();
    }, [])

    const remove = async (id) => {
        console.log(id)
        await axios.delete(`/gifs/${id}`)
        toast('Gif has been deleted')
        await fetchGifs();
    }

    const fetchGifs = async () => {
        console.log('userdata', userData.user.id)
        const userId = userData.user.id;

        const res = await axios.get('/gifs', {
            params: {
                "user": {
                    "id": userId
                }
            }
        })
        console.log(res.data)
        setUserGifs(res.data)
    }

    

    return (
        <div>
            <h1>Welcome to the Save Page</h1>
            <div className="row">
                <p>This is where saved Gifs can populate</p>
                    { userGifs.length > 0 &&
                     <GifViewer
                    gifs={userGifs}
                    buttonAction={remove}
                    buttonText={"Delete"}
                    />
                    }
            </div>
        </div>
    )
}


export default GifSavePage