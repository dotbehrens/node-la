import Axios from "axios";

const CLOUDINARY_URL = 'http://res.cloudinary.com/dx8lsbkh7/image/upload/';
const CLOUDINARY_UPLOAD_PRESET = 'a5lm50bv';
const image = document.querySelector('#fileupload');
image.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

axios({
    url:CLOUDINARY_URL,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    data: formData
})
.then((res) => {
    console.log(res)
})
.catch((err)=> {
    console.log('error with cloudinary', err)
});