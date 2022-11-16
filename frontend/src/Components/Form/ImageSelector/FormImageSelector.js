import * as React from "react";
import { CircularProgress, Fab } from "@mui/material";

import { AddPhotoAlternate } from "@mui/icons-material";
import axios from "axios";
import { toasterModel } from "../../../Utils/Functions";
import { DEFAULT_MESSAGE, TOAST_TYPE } from "../../../Utils/Constants";
import { Box } from "@mui/system";

export default function FormImageSelector(props) {
  const [isImageLoading, setIsImageLoading] = React.useState(false);

  async function handleUploadClick(event) {
    const fileUpload = event.target.files[0];
    if (isImage(fileUpload.name)) {
      const url_image = await handleUploadImage(fileUpload);
      props.setData({ ...props.data, url_image });
      return;
    } else {
      toasterModel(DEFAULT_MESSAGE.fileNotImage, TOAST_TYPE.info);
    }
  }

  async function handleUploadImage(file) {
    const formData = new FormData();
    formData.set("file", file);
    setIsImageLoading(true);
    return axios({
      method: "post",
      url: `http://ec2-44-204-105-222.compute-1.amazonaws.com:8080/movie/image`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        setIsImageLoading(false);
        if (response.status === 200) return response.data.movie_url;
        return null;
      })
      .catch(() => {
        setIsImageLoading(false);
        toasterModel(DEFAULT_MESSAGE.failedSaveImage, TOAST_TYPE.error);
        return null;
      });
  }

  function isImage(fileName) {
    let fileExt = fileName.replace(/^.*\./, "");
    let imagesExtension = ["png", "jpg", "jpeg"];
    if (imagesExtension.indexOf(fileExt) !== -1) {
      return true;
    } else return false;
  }

  return (
    <>
      {!isImageLoading ? (
        <Box className="hover-effect">
          <input
            accept="image/*"
            style={{ display: "none" }}
            id={props.selectorId}
            multiple={false}
            type="file"
            onChange={handleUploadClick}
          />
          <label htmlFor={props.selectorId}>
            {props.data.url_image ? (
              <img
                className="image-selector hover-effect"
                src={props.data.url_image}
                alt={props.selectorId + "-alt-image"}
              />
            ) : (
              <Fab component="span">
                <AddPhotoAlternate />
              </Fab>
            )}
          </label>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
