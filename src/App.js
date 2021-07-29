import { useState } from 'react';

import Loader from 'react-loader-spinner';
import { ImageGallery } from './components/ImageGallery';
import { Searchbar } from './components/Searchbar';
import { Button } from './components/Button';
import { Api } from './api';
import { Modal } from './components/Modal';

const apiImages = new Api();

export function App(){
 const [searchImages,setSearchImages] =  useState([])
 const [loading,setLoading] =  useState(false)
 const [description,setDescription] =  useState(null)
 const [selectedImage,setSelectedImage] =  useState(null)

  const searchbar = async value => {
    if (!value) return;
    apiImages.query = value;
    apiImages.resetPage();

    setLoading(true)
    setSearchImages([])
    // this.setState({ loading: true, searchImages: [] });

    const img = await apiImages
      .fetchImage()
      .finally(() => setLoading(false));

    setSearchImages(img)
    // this.setState({ searchImages: img });
  };

  const loadMore = async () => {
    setLoading(true)
    // this.setState({ loading: true });

    const img = await apiImages
      .fetchImage()
      .finally(() => setLoading(false));

    setSearchImages(prev=> [...prev,...img]
    )

    // this.setState(prevState => {
    //   return { searchImages: [...prevState.searchImages, ...img] };
    // });

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

const   openModal = (selectedImage, description) => {

    setSelectedImage(selectedImage)
    setDescription(description)

    // this.setState({ selectedImage });
    // this.setState({ description });
  };

  const closeModal = () => {
    setSearchImages(null)
    // this.setState({ selectedImage: null });
  };

    return (
      <>
        <Searchbar onSubmit={searchbar} />
        {loading && (
          <Loader
            className="Overlay"
            style={loaderStyles}
            type="BallTriangle"
            color="#00BFFF"
            height={200}
            width={200}
          />
        )}
        <ImageGallery value={searchImages} openModal={openModal} />

        {searchImages.length !== 0 && <Button onClick={loadMore} />}
        {selectedImage && (
          <Modal closeModal={closeModal}>
            <img src={selectedImage} alt={description} />
          </Modal>
        )}
      </>
    );
}

const loaderStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
};
