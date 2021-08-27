export const UPLOAD_START = "UPLOAD_START";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const UPLOAD_FAILED = "UPLOAD_FAILED";

export const uploadStart = () => {
  return {
    type: UPLOAD_START
  }
}

export const uploadSuccess = (data) => {
  return {
    type: UPLOAD_SUCCESS,
    data
  }
}

export const uploadFailed = (error) => {
  return {
    type: UPLOAD_FAILED,
    error
  }
}

export const uploader = (data) => {
  // Personal information handlers start here
  const formData = new FormData();

  formData.append('file', data);
  // replace this with your upload preset name
  formData.append('upload_preset', "gare-upload-preset");

  const options = {
    method: 'POST',
    body: formData,
  };
  return dispatch => {
    dispatch(uploadStart());
    fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`, options)
    .then(response => response.json())
    .then(resp => {
      dispatch(uploadSuccess(resp));
    })
    .catch(err => {
      dispatch(uploadFailed(err));
    });
  }
}
