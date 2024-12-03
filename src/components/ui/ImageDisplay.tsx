import { Grid } from "@mui/material";
import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type ImageGalleryProps = {
    imageUrls: string[];
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ imageUrls }) => {

    const [open, setOpen] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const handleOpenLightbox = (index: number) => {
        setCurrentIndex(index);
        setOpen(true);
    };
    return (
        <div className="w-full">
            {/* {imageUrls.map((url, index) => (
                    <div className="!flex grow bg-zinc-800 bg-opacity-65 h-52 items-center cursor-pointer" key={index} onClick={() => handleOpenLightbox(index)}>
                        <img
                            className="w-full"
                            src={url}
                            alt={`Image ${index + 1}`}
                        />
                    </div>
                ))} */}
            <Grid container spacing={2}>
                {/* Grid container */}
                {imageUrls.slice(0, 4).map((image, index) => (

                    <Grid key={index} item xs={index < 1 ? 12 : (imageUrls.length < 4? (imageUrls.length ==2? 12: 6): 4)}>
                        <div
                            key={index}
                            className={`${index == 3 ? 'relative' : ''}`}
                            onClick={() => handleOpenLightbox(index)}
                        >
                            <img
                                src={image}
                                alt={`image-${index}`}
                                className={`w-full ${index < 1 ? 'h-56' : 'h-28'} object-cover cursor-pointer rounded-lg `}
                            />
                            {index == 3 && <div className="absolute w-full h-full top-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                                <p className="font-bold text-4xl">+{imageUrls.length - 4}</p>
                            </div>}
                        </div>
                    </Grid>
                ))}
            </Grid>


            {open && (
                <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    slides={imageUrls.map((url) => ({ src: url }))}
                    index={currentIndex}
                    on={{ click: ({ index }) => setCurrentIndex(index) }}
                />
            )}
        </div>
    );
};

export default ImageGallery;
