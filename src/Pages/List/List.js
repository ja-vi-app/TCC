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
  Container,
  TextField,
  FormControlLabel,
  Switch,
  Grid,
  Typography,
} from "@mui/material";
import { Add, AddPhotoAlternate, Remove } from "@mui/icons-material";

import CustomDate from "../../Components/CustomDate/CustomDate";
import { CustomTextField } from "../../Components/CustomTextField/CustomTextField";
import { DEFAULT_MESSAGE, SESSION_STORAGE_ITEM, TOAST_TYPE, URLS } from "../../Utils/Constants";
import { isEmpty, toasterModel } from "../../Utils/Functions";

import { addDB } from "../../Service/Utils/Functions";
import { db } from "../../Service/dbConection";
import { RECORDED_MOVIES } from "../../Service/Utils/Tables";
import { RatingSelector } from "../../Components/CreateCardForm/RatingSelector/RatingSelector";
import RatingCustom from "../../Components/CreateCardForm/RatingCustom/RatingCustom";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
  const [formType, setFormType] = useState("rating");
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  async function handleExpandAccordion() {
    if (!isOpenAccordion) {
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

  const handleChange = (newValue) => {
    setValue(newValue);
  };

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
      <Container
        maxWidth="xl"
        className="p1 text"
        // style={{ width: "100%", display: "flex", justifyContent: "center", paddingTop: "2%" }}
      >
        <Accordion
          expanded={isOpenAccordion}
          onChange={handleExpandAccordion}
          style={{
            borderRadius: "15px",
          }}
        >
          <AccordionSummary
            expandIcon={
              <Button className="bg-accent">
                {isOpenAccordion ? (
                  <Remove fontSize="large" className="color-white" />
                ) : (
                  <Add fontSize="large" className="color-white" />
                )}
              </Button>
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ height: "100px" }}
          >
            <div style={{ display: "grid" }}>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>CRIAR </span>
              <Typography color="textSubtitleColor" style={{ fontSize: "13px" }}>
                Crie um card pra se lembrar de seu filme favorito!
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {/* <RatingSelector></RatingSelector> */}
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Label"
              onClick={() => setFormType(formType === "date" ? "rating" : "date")}
              variant="standard"
            />
            {formType === "rating" ? (
              <RatingCustom></RatingCustom>
            ) : (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  color="text"
                  label="Date desktop"
                  inputFormat="MM/DD/YYYY"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  value={title}
                  onChange={(e) => onChange("title", e.target.value)}
                  id="title"
                  className="w100"
                  multiline={true}
                  label="Título*"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Autocomplete
                  disablePortal
                  id="category"
                  key="category"
                  options={optionsCategory}
                  multiple={false}
                  onChange={(e, newValue) => onChange("category", newValue)}
                  value={category}
                  getOptionLabel={(prop) => (prop.descricao ? prop.descricao : prop)}
                  renderInput={(params) => (
                    <CustomTextField variant="standard" {...params} label="Categoria*" />
                  )}
                  isOptionEqualToValue={(option, value) => option === value}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
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
              </Grid>
              <Grid item xs={12} sm={6} md={2} justifyContent="flex-end">
                <div class="flex justify-end">
                  <Button
                    onClick={handleSaveNewCardMovie}
                    size="large"
                    variant="contained"
                    disabled={isEmpty(title) || isEmpty(file) || isEmpty(category)}
                  >
                    Adicionar
                  </Button>
                </div>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
}
