import * as React from "react";
import { CircularProgress, Fab, Typography } from "@mui/material";

import { AddPhotoAlternate } from "@mui/icons-material";
import axios from "axios";
import { toasterModel } from "Utils/Functions";
import { DEFAULT_MESSAGE, TOAST_TYPE } from "Utils/Constants";
import { Box } from "@mui/system";
import { defaultImages } from "./defaultImages";

export default function FormImageSelector(props) {
  const [isImageLoading, setIsImageLoading] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(
    props.data.url_image
  );

  React.useEffect(() => {
    if (!props.data.url_image) setSelectedImage(null);
  }, [props.data.url_image]);

  async function handleUploadClick(event) {
    const fileUpload = event.target.files[0];
    if (isImage(fileUpload.name)) {
      const url_image = await handleUploadImage(fileUpload);
      handleSaveImage(url_image);
      setSelectedImage(url_image);
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

  function handleSaveImage(image) {
    console.log("aqui");
    props.setData({ ...props.data, url_image: image });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "flex-start",
      }}
    >
      <Typography color="textSubtitleColor">Imagem da capa</Typography>
      {!isImageLoading ? (
        <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {props.sugestions
            ? defaultImages.map((image) => (
                <Box
                  key={image.id}
                  className="hover-effect"
                  onClick={() => handleSaveImage(image.url)}
                >
                  <img
                    className={
                      props.data.url_image === image.url
                        ? "image-selector-border image-selector-small"
                        : "image-selector-small"
                    }
                    src={image.url}
                    alt={image.alt}
                  />
                </Box>
              ))
            : null}
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
              {selectedImage ? (
                <img
                  className={
                    props.sugestions
                      ? props.data.url_image === selectedImage
                        ? "image-selector-small image-selector-border hover-effect"
                        : "image-selector-small hover-effect"
                      : "image-selector hover-effect"
                  }
                  src={selectedImage}
                  alt={props.selectorId + "-alt-image"}
                />
              ) : (
                <Fab
                  component="span"
                  size={props.sugestions ? "small" : "large"}
                >
                  <AddPhotoAlternate />
                </Fab>
              )}
            </label>
          </Box>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
}
