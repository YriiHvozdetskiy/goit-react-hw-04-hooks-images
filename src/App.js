import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Loader from 'react-loader-spinner';
import { ImageGallery } from './components/ImageGallery';
import { Searchbar } from './components/Searchbar';
import { Button } from './components/Button';
import { Api } from './api';
import { Modal } from './components/Modal';

const apiImages = new Api();

export function App() {
  const [searchImages, setSearchImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);


  const searchbar = async value => {
    if (!value) return;
    apiImages.query = value;
    apiImages.resetPage();

    setLoading(true);
    setSearchImages([]);

    const img = await apiImages
      .fetchImage()
      .finally(() => setLoading(false));

    if (img.length !== 0) toast.success('success');
    if (img.length === 0) toast.error('nothing found');

    setSearchImages(img);
  };

  const loadMore = async () => {
    setLoading(true);

    const img = await apiImages
      .fetchImage()
      .finally(() => setLoading(false));

    if (img.length !== 0) toast.success('success');
    if (img.length === 0) toast.error('nothing more was found');

    setSearchImages(prev => [...prev, ...img]);

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const openModal = (selectedImage, description) => {
    setSelectedImage(selectedImage);
    setDescription(description);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Searchbar onSubmit={searchbar} />
      {loading && (
        <Loader
          className='Overlay'
          style={loaderStyles}
          type='BallTriangle'
          color='#00BFFF'
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
      <Toaster position='top-right' toastOptions={toastStyle} />
    </>
  );
}

const loaderStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
};

const toastStyle = {
  success: {
    style: {
      color: '#fff',
      background: 'green',
    },
  },
  error: {
    style: {
      color: '#fff',
      background: 'red',
    },
  },
};