import React, { useState } from "react";
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
import { useCardDetail } from "../../Context/CardDetailContext";
import { Emoji } from "emoji-picker-react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { collection, doc } from "firebase/firestore";
import { db } from "../../Service/dbConection";
import { RECORDED_MOVIES } from "../../Service/Utils/Tables";
import { updateDB } from "../../Service/Utils/Functions";
import { toasterModel } from "../../Utils/Functions";
import { DEFAULT_MESSAGE, TOAST_TYPE } from "../../Utils/Constants";
import Star from "../CardMovie/star";
import EditIcon from "@mui/icons-material/Edit";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

function CardDetailBadge() {
  const CardDetail = useCardDetail();

  const [isFavorite, setIsFavorited] = useState();
  const [loadingIsFavorite, setLoadingIsFavorite] = useState();

  const [localData, setLocalData] = useState(CardDetail);
  const [isLocalDataEditableToggled, setIsLocalDataEditableToggled] = useState(false);
  const [loadingLocalData, setLoadingLocalData] = useState();
  const [open, setOpen] = React.useState(false);
  const [openImgForm, setOpenImgForm] = React.useState(localData.url_image);

  const theme = useTheme();
  const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);

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
            ></div>
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
                  Cancelar
                </Button>
                <Button
                  onClick={handleChangeURL}
                  disabled={!localData?.url_image}
                  variant="contained"
                >
                  Trocar URL
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
            ></TextField>
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
                <EditIcon></EditIcon>
              </IconButton>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                <IconButton aria-label="edit" size="small" onClick={handleCloseEdit}>
                  <DoDisturbIcon></DoDisturbIcon>
                </IconButton>
                <IconButton aria-label="edit" size="small" onClick={handleSaveEdit}>
                  <SaveIcon color="primary"></SaveIcon>
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
                ></TextField>
              ) : (
                <Star
                  isSmall={false}
                  data={CardDetail?.rating}
                  sx={{ transform: "scale(2)" }}
                ></Star>
              )}
            </Box>
          </Grid>
          <Grid item xs={4} display="flex" justifyContent="center">
            <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography>FAVORITO</Typography>
              {loadingIsFavorite ? (
                <CircularProgress></CircularProgress>
              ) : (
                <IconButton onClick={updateDataFavorite}>
                  <FavoriteIcon
                    sx={{ color: isFavorite ? "#D0000B" : theme.palette.textSubtitleColor }}
                  ></FavoriteIcon>
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
