
const GifViewer = ({gifs, buttonAction, buttonText}) => (
    <div className="container">
        {gifs.map((gif, key) => {
            return(
                <div key={key} className='gif-container'>
                    <img src={buttonText === "Save Gif" 
                    ? gif.images.fixed_width.url
                    : gif.url
                } alt={gif.title} />
                    <button onClick={() => buttonAction(
                        buttonText === 'Save Gif' 
                        ? gif.images.fixed_width.url
                        : gif.id
                    )}>{buttonText}</button>
                </div>
            )
        })}
    </div>
)


export default GifViewer;