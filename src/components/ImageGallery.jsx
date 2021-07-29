import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ value, openModal }) => {
  return (
    <>
      <ul className="ImageGallery">
        <ImageGalleryItem value={value} openModal={openModal} />
      </ul>
    </>
  );
};
