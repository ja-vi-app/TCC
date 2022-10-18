import React, { useState } from "react";
import { collection, doc } from "firebase/firestore";
import { Emoji } from "emoji-picker-react";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Favorite, Edit, Save, DoDisturb } from "@mui/icons-material";

import { useCardDetail } from "../../Context/CardDetailContext";

import { db } from "../../Service/dbConection";
import { RECORDED_MOVIES } from "../../Service/Utils/Tables";
import { updateDB } from "../../Service/Utils/Functions";

import { toasterModel } from "../../Utils/Functions";
import { DEFAULT_MESSAGE, LABEL_BUTTONS, TOAST_TYPE } from "../../Utils/Constants";

import Star from "../CardMovie/star";

function CardDetailBadge() {
  const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);
  const CardDetail = useCardDetail();
  const theme = useTheme();

  const [isFavorite, setIsFavorited] = useState();
  const [loadingIsFavorite, setLoadingIsFavorite] = useState();
  const [localData, setLocalData] = useState(CardDetail);
  const [isLocalDataEditableToggled, setIsLocalDataEditableToggled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openImgForm, setOpenImgForm] = useState(localData.url_image);

  async function updateDataFavorite() {
    setIsFavorited(!isFavorite);
    const docRef = doc(recordedMoviesCollectionRef, CardDetail.id);
    setLoadingIsFavorite(true);
    await updateDB(docRef, {
      isFavorite: !isFavorite,
    })
      .then(() => {
        setLoadingIsFavorite(false);
      })
      .catch(() => {
        toasterModel(DEFAULT_MESSAGE.failedUpdatedSuccessSave, TOAST_TYPE.error);
      });
  }

  function handleCloseEdit() {
    setIsLocalDataEditableToggled(false);
    setLocalData(CardDetail);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChangeURL() {
    setLocalData({ ...localData, url_image: openImgForm });
    handleClose();
  }

  function handleEditRating(e) {
    if (isNaN(parseFloat(e.target.value)))
      if (parseFloat(e.target.value) >= 0 && parseFloat(e.target.value) <= 10)
        setLocalData({ ...localData, title: e.target.value });
  }

  async function handleSaveEdit() {
    console.log(localData);
    // const docRef = doc(recordedMoviesCollectionRef, CardDetail.id);
    // setLoadingLocalData(true);
    // await updateDB(docRef, {
    //   title: localData.title,
    //   alertData: localData.alertData,
    //   category: localData.category,
    //   url_image: localData.url_image,
    //   rating: localData.rating,
    // })
    //   .then(() => {
    //     toasterModel(DEFAULT_MESSAGE.updatedSuccessSave, TOAST_TYPE.success);
    //     setLocalData(null);
    //     setLoadingLocalData(false);
    //   })
    //   .catch(() => {
    //     toasterModel(DEFAULT_MESSAGE.failedUpdatedSuccessSave, TOAST_TYPE.error);
    //   });
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        {!CardDetail?.url_image || isLocalDataEditableToggled ? (
          <>
            <div
              style={{ width: "150px", height: "201px", backgroundColor: "gray" }}
              onClick={handleClickOpen}
            />
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Troque a URL do trailer</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Para a URL do youtube ser considerada válida é necessária que tenha o id do vídeo
                  nela, esse é um número exclusivo que troca a cada vídeo e tem 8 caracteres
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Nova URL"
                  type="email"
                  fullWidth
                  variant="standard"
                  value={openImgForm}
                  onChange={(e) => setOpenImgForm(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} variant="outlined-cancel">
                  {LABEL_BUTTONS.cancel}
                </Button>
                <Button
                  onClick={handleChangeURL}
                  disabled={!localData?.url_image}
                  variant="contained"
                >
                  {LABEL_BUTTONS.changeUrl}
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          <img
            style={{ width: "150px", height: "201px" }}
            src={CardDetail?.url_image}
            alt="logo-img"
          />
        )}
      </Grid>
      <Grid item container sx={{ display: "flex" }} direction="column" xs={12} sm={8} spacing={2}>
        <Grid
          item
          sx={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            position: "relative",
            width: "100%",
          }}
        >
          {isLocalDataEditableToggled ? (
            <TextField
              textAlign="flex-start"
              autoFocus
              margin="dense"
              id="edit-title"
              label="Editar título"
              type="email"
              variant="standard"
              value={localData?.title}
              onChange={(e) => setLocalData({ ...localData, title: e.target.value })}
            />
          ) : (
            <Typography sx={{ textTransform: "uppercase" }}>{CardDetail?.title}</Typography>
          )}
          <Box style={{ right: "0", position: "absolute" }}>
            {!isLocalDataEditableToggled ? (
              <IconButton
                aria-label="edit"
                size="small"
                onClick={() => setIsLocalDataEditableToggled(true)}
              >
                <Edit />
              </IconButton>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                <IconButton aria-label="edit" size="small" onClick={handleCloseEdit}>
                  <DoDisturb />
                </IconButton>
                <IconButton aria-label="edit" size="small" onClick={handleSaveEdit}>
                  <Save color="primary"></Save>
                </IconButton>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={4} display="flex" justifyContent="center">
            <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography>CATEGORIA</Typography>
              <Emoji unified={CardDetail?.category}></Emoji>
            </Box>
          </Grid>
          <Grid item xs={4} display="flex" justifyContent="center">
            <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography>NOTA</Typography>
              {isLocalDataEditableToggled ? (
                <TextField
                  textAlign="flex-start"
                  autoFocus
                  margin="dense"
                  id="edit-title"
                  label="Editar nota"
                  type="email"
                  variant="standard"
                  value={localData?.rating}
                  onChange={(e) => handleEditRating(e)}
                />
              ) : (
                <Star isSmall={false} data={CardDetail?.rating} sx={{ transform: "scale(2)" }} />
              )}
            </Box>
          </Grid>
          <Grid item xs={4} display="flex" justifyContent="center">
            <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography>FAVORITO</Typography>
              {loadingIsFavorite ? (
                <CircularProgress />
              ) : (
                <IconButton onClick={updateDataFavorite}>
                  <Favorite
                    sx={{ color: isFavorite ? "#D0000B" : theme.palette.textSubtitleColor }}
                  />
                </IconButton>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CardDetailBadge;
