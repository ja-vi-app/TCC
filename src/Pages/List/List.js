/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { collection } from "firebase/firestore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Fab,
  Container,
  TextField,
  FormControlLabel,
  Switch,
  Grid,
  Typography,
  CircularProgress,
  Popover,
} from "@mui/material";
import { Add, AddPhotoAlternate, Remove } from "@mui/icons-material";
import EmojiPicker, { Emoji, EmojiStyle } from "emoji-picker-react";
import CustomDate from "../../Components/CustomDate/CustomDate";
import { DEFAULT_MESSAGE, SESSION_STORAGE_ITEM, TOAST_TYPE, URLS } from "../../Utils/Constants";
import { isEmpty, toasterModel } from "../../Utils/Functions";

import { addDB } from "../../Service/Utils/Functions";
import { db } from "../../Service/dbConection";
import { RECORDED_MOVIES } from "../../Service/Utils/Tables";
import RatingCustom from "../../Components/CreateCardForm/RatingCustom/RatingCustom";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormCreateCard, useFormCreateCardUpdate } from "../../Context/FormCreateCardContext";

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

  // const [{ category, title, file, aditional }, setState] = useState({ ...initialState });
  const [image, setImage] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isOpenAccordion, setIsOpenAccordion] = useState(false);
  const [formType, setFormType] = useState("rating");
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  const formCreateCard = useFormCreateCard();
  const changeFormCreateCard = useFormCreateCardUpdate();

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

  const prevFile = usePrevious(formCreateCard?.file);
  useEffect(() => {
    if (formCreateCard?.file && prevFile !== formCreateCard?.file) {
      const fetchData = async () => {
        const data = await handleUploadImage();
        if (data) {
          setImage(data);
        }
      };

      fetchData().catch((error) => console.log(error));
    }
  }, [formCreateCard?.file]);

  function usePrevious(value) {
    const ref = useRef(null);
    useEffect(() => {
      ref.current = value;
    }, [ref.current]);
    return ref.current;
  }

  function getFileExtension(fileName) {
    let fileExtension;
    fileExtension = fileName.replace(/^.*\./, "");
    return fileExtension;
  }
  function isIMage(fileName) {
    let fileExt = getFileExtension(fileName);
    let imagesExtension = ["png", "jpg", "jpeg"];
    if (imagesExtension.indexOf(fileExt) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  async function handleUploadClick(event) {
    const fileUpload = event.target.files[0];
    if (isIMage(fileUpload.name)) {
      changeFormCreateCard((prevState) => ({ ...prevState, file: fileUpload }));

      return;
    } else {
      toasterModel(DEFAULT_MESSAGE.fileNotImage, TOAST_TYPE.info);
    }
  }

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  async function handleUploadImage() {
    const formData = new FormData();
    formData.set("file", formCreateCard?.file);
    setIsLoadingImage(true);
    return axios({
      method: "post",
      url: `http://ec2-44-204-105-222.compute-1.amazonaws.com:8080/movie/image`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        setIsLoadingImage(false);
        if (response.status === 200) return response.data;
        return null;
      })
      .catch(() => {
        setIsLoadingImage(false);
        toasterModel(DEFAULT_MESSAGE.failedSaveImage, TOAST_TYPE.error);
        return null;
      });
  }

  function onChange(fieldKey, value) {
    changeFormCreateCard((prevState) => ({ ...prevState, [fieldKey]: value }));
  }

  async function handleSaveNewCardMovie() {
    if (image) {
      await addDB(recordedMoviesCollectionRef, {
        title: formCreateCard?.title,
        category: formCreateCard?.category?.unifiedWithoutSkinTone,
        rating: formCreateCard?.rating ?? null,
        alertDate: formCreateCard?.alertDate ?? null,
        name: sessionStorage.getItem(SESSION_STORAGE_ITEM.nameUser),
        email: sessionStorage.getItem(SESSION_STORAGE_ITEM.email),
        upload_date: CustomDate.dateFormatter(new Date()),
        url_image: image.movie_url,
        owner: sessionStorage.getItem(SESSION_STORAGE_ITEM.userUid),
      })
        .then(() => {
          toasterModel(DEFAULT_MESSAGE.successSave, TOAST_TYPE.success);
          changeFormCreateCard(initialState);
          handleExpandAccordion();
        })
        .catch(() => {
          toasterModel(DEFAULT_MESSAGE.failedSave, TOAST_TYPE.error);
        });
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selectedEmoji, setSelectedEmoji] = useState("");

  function onClickSaveEmoji(emojiData, event) {
    console.log(emojiData, event);
    setSelectedEmoji(emojiData.unifiedWithoutSkinTone);
    onChange("category", emojiData);
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
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
            <Grid container sx={{ marginBottom: "2rem" }}>
              <Grid item xs={12} sm={12} md={6}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label={formType === "rating" ? "Avaliação" : "Alerta"}
                  onClick={() => setFormType(formType === "date" ? "rating" : "date")}
                  variant="standard"
                  sx={{ marginBottom: "1rem" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
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
              </Grid>
            </Grid>

            <Grid container spacing={3} style={{ alignItems: "center" }}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  value={formCreateCard?.title}
                  onChange={(e) => onChange("title", e.target.value)}
                  id="title"
                  className="w100"
                  multiline={true}
                  label="Título*"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                  Escolher categoria
                </Button>
                {selectedEmoji ? (
                  <Emoji unified={selectedEmoji} emojiStyle={EmojiStyle.APPLE} size={12} />
                ) : null}
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <EmojiPicker onEmojiClick={onClickSaveEmoji} />
                </Popover>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                {!isLoadingImage ? (
                  <div>
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
                    {formCreateCard?.file ? formCreateCard?.file.name : null}
                  </div>
                ) : (
                  <CircularProgress></CircularProgress>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={2} justifyContent="flex-end">
                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveNewCardMovie}
                    size="large"
                    variant="contained"
                    disabled={
                      isEmpty(formCreateCard?.title) ||
                      isEmpty(formCreateCard?.file) ||
                      isEmpty(formCreateCard?.category) ||
                      (isEmpty(formCreateCard?.rating) && isEmpty(formCreateCard?.date))
                    }
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
