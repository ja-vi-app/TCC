/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import EmojiPicker, { Emoji, EmojiStyle } from "emoji-picker-react";
import axios from "axios";
import dayjs from "dayjs";

import { collection, doc } from "firebase/firestore";

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
  IconButton,
} from "@mui/material";
import { Add, AddPhotoAlternate, EmojiEmotions, Remove } from "@mui/icons-material";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import CustomDate from "../../Components/CustomDate/CustomDate";
import RatingCustom from "../../Components/RatingCustom/RatingCustom.js";

import { useFormCreateCard, useFormCreateCardUpdate } from "../../Context/FormCreateCardContext";

import { addDB } from "../../Service/Utils/Functions";
import { db } from "../../Service/dbConection";
import { RECORDED_MOVIES } from "../../Service/Utils/Tables";

import {
  DATE_FORMAT,
  DEFAULT_MESSAGE,
  FORM_TYPE,
  LABEL_BUTTONS,
  SESSION_STORAGE_ITEM,
  TOAST_TYPE,
} from "../../Utils/Constants";
import { isEmpty, toasterModel } from "../../Utils/Functions";
import { Box } from "@mui/system";
import { useListContextUpdate } from "../../Context/ListContext";

const initialState = {
  category: null,
  title: "",
  file: null,
};

export default function List() {
  const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);

  const [image, setImage] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isOpenAccordion, setIsOpenAccordion] = useState(false);
  const [formType, setFormType] = useState(FORM_TYPE.rating);
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  const formCreateCard = useFormCreateCard();
  const changeFormCreateCard = useFormCreateCardUpdate();
  const updateList = useListContextUpdate();

  async function handleExpandAccordion() {
    if (!isOpenAccordion) {
      setIsOpenAccordion(true);
      return;
    }
    setIsOpenAccordion(false);
  }

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
      url: `${process.env.REACT_APP_BACKEND_URL}/movie/image`,
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
      const docRef = doc(recordedMoviesCollectionRef);

      await addDB(docRef, {
        id: docRef.id,
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
          updateList();
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
    setSelectedEmoji(emojiData.unifiedWithoutSkinTone);
    onChange("category", emojiData);
    handleClose();
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <Container maxWidth="xl" className="p1 text">
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
                  label={formType === FORM_TYPE.rating ? "Avaliação" : "Alerta"}
                  onClick={() =>
                    setFormType(formType === FORM_TYPE.date ? FORM_TYPE.rating : FORM_TYPE.date)
                  }
                  variant="standard"
                  sx={{ marginBottom: "1rem" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {formType === FORM_TYPE.rating ? (
                  <RatingCustom />
                ) : (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      color="text"
                      label="Date desktop"
                      inputFormat={DATE_FORMAT.YYYY_MM_DD}
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <Typography>Categoria</Typography>
                  <IconButton onClick={handleClick}>
                    {selectedEmoji ? (
                      <Emoji unified={selectedEmoji} emojiStyle={EmojiStyle.APPLE} size={24} />
                    ) : (
                      <EmojiEmotions></EmojiEmotions>
                    )}
                  </IconButton>
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
                    <EmojiPicker skinTonesDisabled onEmojiClick={onClickSaveEmoji} />
                  </Popover>
                </Box>
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
                  <CircularProgress />
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
                    {LABEL_BUTTONS.add}
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
