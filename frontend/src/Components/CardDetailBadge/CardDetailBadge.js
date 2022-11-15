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
import { Favorite, Edit, Save, DoDisturb, Image, Delete } from "@mui/icons-material";

import { useCardDetail } from "../../Context/CardDetailContext";

import { db } from "../../Service/dbConection";
import { RECORDED_MOVIES } from "../../Service/Utils/Tables";
import { deleteDB, updateDB } from "../../Service/Utils/Functions";

import { toasterModel } from "../../Utils/Functions";
import { DEFAULT_MESSAGE, LABEL_BUTTONS, TOAST_TYPE } from "../../Utils/Constants";

import { useListContextUpdate } from "../../Context/ListContext";

function CardDetailBadge() {
  const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);
  const CardDetail = useCardDetail();
  const theme = useTheme();
  const updateList = useListContextUpdate();

  const [isFavorite, setIsFavorited] = useState();
  const [loadingIsFavorite, setLoadingIsFavorite] = useState();
  const [localData, setLocalData] = useState(CardDetail);
  const [isLocalDataEditableToggled, setIsLocalDataEditableToggled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openImgForm, setOpenImgForm] = useState(localData.url_image);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [loadingDialog, setLoadingDialog] = useState(false);

  async function deleteCard() {
    const docRef = doc(recordedMoviesCollectionRef, CardDetail.id);
    setLoadingDialog(true);
    await deleteDB(docRef)
      .then(() => {
        toasterModel(DEFAULT_MESSAGE.deletedSuccessSave, TOAST_TYPE.success);
        setLoadingDialog(false);
        setConfirmDialog(false);
        updateList();
      })
      .catch(() => {
        toasterModel(DEFAULT_MESSAGE.failedDeletedSuccessSave, TOAST_TYPE.error);
      });
  }

  function handleDeleteDialogClose() {
    if (!loadingDialog) setConfirmDialog(false);
  }

  async function updateDataFavorite() {
    setIsFavorited(!isFavorite);
    const docRef = doc(recordedMoviesCollectionRef, CardDetail.id);
    setLoadingIsFavorite(true);
    await updateDB(docRef, {
      isFavorite: !isFavorite,
    })
      .then(() => {
        updateList();
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
              style={{
                width: "150px",
                height: "201px",
                border: `1px solid ${theme.palette.textSubtitleColor}`,
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleClickOpen}
              className="hover-effect-img"
            >
              <Image sx={{ color: theme.palette.textSubtitleColor, fontSize: "50px" }}></Image>
            </div>
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
              <>
                <IconButton
                  aria-label="edit"
                  size="small"
                  onClick={() => setIsLocalDataEditableToggled(true)}
                >
                  <Edit />
                </IconButton>
                <IconButton onClick={() => setConfirmDialog(true)}>
                  <Delete></Delete>
                </IconButton>
                <Dialog
                  open={confirmDialog}
                  onClose={handleDeleteDialogClose}
                  aria-labelledby="responsive-dialog-title"
                  disablebackdropclick
                >
                  <DialogTitle id="responsive-dialog-title">
                    {"Deseja excluir esse card?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>Essa ação não pode ser revertida</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    {loadingDialog ? (
                      <CircularProgress size={30}></CircularProgress>
                    ) : (
                      <>
                        <Button
                          variant="outlined"
                          autoFocus
                          onClick={() => setConfirmDialog(false)}
                        >
                          Cancelar
                        </Button>

                        <Button variant="outlined-cancel" onClick={deleteCard}>
                          Sim
                        </Button>
                      </>
                    )}
                  </DialogActions>
                </Dialog>
              </>
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
                // <Rating
                //   name="hover-feedback"
                //   max={10}
                //   precision={0.5}
                //   onChange={(event, newratingValue) => {
                //     changeForm(newratingValue);
                //   }}
                //   onChangeActive={(event, newHover) => {
                //     setHover(newHover);
                //   }}
                //   emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                // />
                <span></span>
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
      <Dialog open={isLocalDataEditableToggled} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default CardDetailBadge;
