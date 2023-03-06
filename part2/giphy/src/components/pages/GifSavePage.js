import GifViewer from "../helpers/GifViewer";

function GifSavePage() {

    const remove = () => {
        console.log('deleting gif');
    }

    const userGif = JSON.parse(localStorage.getItem('userGif')).gif;
    const userGifs = [{
        url: userGif
    }]
    console.log(userGifs)

    

    return (
        <div>
            <h1>Welcome to the Save Page</h1>
            <div className="row">
                <p>This is where saved Gifs can populate</p>
                <GifViewer
                    gifs={userGifs}
                    buttonAction={remove}
                    buttonText={"Delete"}
                    />
            </div>
        </div>
    )
}


export default GifSavePage