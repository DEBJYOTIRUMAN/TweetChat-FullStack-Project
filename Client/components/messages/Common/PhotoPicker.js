import ReactDOM from "react-dom";

const PhotoPicker = ({onChange}) => {
  const component = (
    <input type="file" accept="image/*" hidden id="photo-picker" onChange={onChange} />
  );
  return ReactDOM.createPortal(
    component,
    document.getElementById("photo-picker-element")
  );
};

export default PhotoPicker;
