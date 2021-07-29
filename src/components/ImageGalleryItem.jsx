export const ImageGalleryItem = ({ value, openModal }) => {
  return (
    <>
      {value.map(img => {
        return (
          <li
            key={img.id}
            className="ImageGalleryItem"
            onClick={() => openModal(img.largeImageURL, img.tags)}
          >
            <img
              src={img.webformatURL}
              alt={img.tags}
              className="ImageGalleryItem-image"
            />
          </li>
        );
      })}
    </>
  );
};
