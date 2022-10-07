/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { collection } from "firebase/firestore";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Fab,
} from "@mui/material";
import { Add, AddPhotoAlternate, Remove } from "@mui/icons-material";

import CustomDate from "../Components/CustomDate/CustomDate";
import { CustomTextField } from "../Components/CustomTextField/CustomTextField";
import { DEFAULT_MESSAGE, SESSION_STORAGE_ITEM, TOAST_TYPE, URLS } from "../Utils/Constants";
import { isEmpty, toasterModel } from "../Utils/Functions";

import { addDB } from "../Service/Utils/Functions";
import { db } from "../Service/dbConection";
import { RECORDED_MOVIES } from "../Service/Utils/Tables";

const optionsCategory = [
  { id: "movie", descricao: "Filme" },
  { id: "series", descricao: "Séries" },
];

const initialState = {
  category: null,
  title: "",
  file: null,
};

export default function List() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);

  const [{ category, title, file }, setState] = useState({ ...initialState });
  const [isOpenAccordion, setIsOpenAccordion] = useState(false);

  async function handleExpandAccordion() {
    if (!isOpenAccordion) {
      navigate(URLS.list);
      setIsOpenAccordion(true);
      return;
    }
    navigate(URLS.home);
    setIsOpenAccordion(false);
  }

  useEffect(() => {
    if (pathname === URLS.list) {
      setIsOpenAccordion(true);
    }
  }, [isOpenAccordion, setIsOpenAccordion]);

  function getFileExtension(fileName) {
    var fileExtension;
    fileExtension = fileName.replace(/^.*\./, "");
    return fileExtension;
  }
  function isIMage(fileName) {
    var fileExt = getFileExtension(fileName);
    var imagesExtension = ["png", "jpg", "jpeg"];
    if (imagesExtension.indexOf(fileExt) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  async function handleUploadClick(event) {
    const fileUpload = event.target.files[0];

    if (isIMage(fileUpload.name)) {
      setState((prevState) => ({ ...prevState, file: fileUpload }));
      return;
    }

    toasterModel(DEFAULT_MESSAGE.fileNotImage, TOAST_TYPE.info);
  }

  async function handleUploadImage() {
    const formData = new FormData();
    formData.set("file", file);
    return axios({
      method: "post",
      url: `http://ec2-44-204-105-222.compute-1.amazonaws.com:8080/movie/image`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status === 200) return response.data;
        return null;
      })
      .catch(() => {
        toasterModel(DEFAULT_MESSAGE.failedSaveImage, TOAST_TYPE.error);
        return null;
      });
  }

  function onChange(fieldKey, value) {
    setState((prevState) => ({ ...prevState, [fieldKey]: value }));
  }

  async function handleSaveNewCardMovie() {
    const infoImage = await handleUploadImage();

    if (infoImage) {
      await addDB(recordedMoviesCollectionRef, {
        title,
        category: category.id,
        name: sessionStorage.getItem(SESSION_STORAGE_ITEM.nameUser),
        email: sessionStorage.getItem(SESSION_STORAGE_ITEM.email),
        upload_date: CustomDate.dateFormatter(new Date()),
        url_image: infoImage.movie_url,
        owner: sessionStorage.getItem(SESSION_STORAGE_ITEM.userUid),
      })
        .then(() => {
          toasterModel(DEFAULT_MESSAGE.successSave, TOAST_TYPE.success);
          setState(initialState);
          handleExpandAccordion();
        })
        .catch(() => {
          toasterModel(DEFAULT_MESSAGE.failedSave, TOAST_TYPE.error);
        });
    }
  }

  return (
    <>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "2%" }}>
        <Accordion
          expanded={isOpenAccordion}
          onChange={handleExpandAccordion}
          style={{
            backgroundColor: "#262626",
            width: "65%",
            color: "#fff",
            borderRadius: "15px",
          }}
        >
          <AccordionSummary
            expandIcon={
              <Button style={{ background: "#8980E8" }}>
                {isOpenAccordion ? (
                  <Remove fontSize="large" style={{ color: "#fff" }} />
                ) : (
                  <Add fontSize="large" style={{ color: "#fff" }} />
                )}
              </Button>
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ height: "100px" }}
          >
            <div style={{ display: "grid" }}>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>CRIAR </span>
              <span style={{ fontSize: "13px" }}>
                Crie um card pra se lembrar de seu filme favorito!
              </span>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <CustomTextField
              value={title}
              onChange={(e) => onChange("title", e.target.value)}
              id="title"
              multiline={true}
              maxRows="2"
              label="Título*"
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              multiple={false}
              type="file"
              onChange={handleUploadClick}
            />
            <label htmlFor="contained-button-file">
              <Fab component="span">
                <AddPhotoAlternate />
              </Fab>
            </label>
            {file ? file.name : null}
            <Autocomplete
              disablePortal
              id="category"
              key="category"
              options={optionsCategory}
              multiple={false}
              onChange={(e, newValue) => onChange("category", newValue)}
              value={category}
              getOptionLabel={(prop) => (prop.descricao ? prop.descricao : prop)}
              sx={{ width: 300 }}
              renderInput={(params) => <CustomTextField {...params} label="Categoria*" />}
              isOptionEqualToValue={(option, value) => option === value}
            />
            <Button
              onClick={handleSaveNewCardMovie}
              style={{ color: "white" }}
              size="large"
              variant="contained"
              disabled={isEmpty(title) || isEmpty(file) || isEmpty(category)}
            >
              Adicionar
            </Button>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
