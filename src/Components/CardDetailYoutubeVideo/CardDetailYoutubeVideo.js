import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { toasterModel } from "../../Utils/Functions";
import { useCardDetail, useCardDetailUpdate } from "../../Context/CardDetailContext";
import { updateDB } from "../../Service/Utils/Functions";
import { collection, doc } from "firebase/firestore";
import { RECORDED_MOVIES } from "../../Service/Utils/Tables";
import { db } from "../../Service/dbConection";
import { DEFAULT_MESSAGE, TOAST_TYPE } from "../../Utils/Constants";
import EditIcon from "@mui/icons-material/Edit";
import YoutubeEmbed from "../YoutubeVideo/YoutubeVideo";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

function CardDetailYoutubeVideo() {
  const [videoUrlForm, setVideoUrlForm] = useState(null);
  const [loadingVideoUrlForm, setloadingVideoUrlForm] = useState(false);
  const [trailerExpanded, setTrailerExpanded] = useState(true);
  const [open, setOpen] = React.useState(false);

  const CardDetail = useCardDetail();
  const changeCardDetail = useCardDetailUpdate();
  const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onChangeFormVideo() {
    if (!videoUrlForm) return toasterModel("Passe a url do vídeo antes de continuar", "info", 5000);

    const videoId = videoUrlForm.match(/([a-z0-9_-]{11})/gim);
    if (!videoId)
      return toasterModel(
        "Url inválida \n(É necessário que contenha o id do vídeo, um sequência de 8 caracteres)",
        "info",
        10000
      );

    changeCardDetail((prevState) => ({ ...prevState, embed_id: videoId[0] }));
    updateData(videoId[0]);
  }

  async function updateData(value) {
    const docRef = doc(recordedMoviesCollectionRef, CardDetail.id);
    setloadingVideoUrlForm(true);
    await updateDB(docRef, {
      embed_id: value,
    })
      .then(() => {
        toasterModel(DEFAULT_MESSAGE.updatedSuccessSave, TOAST_TYPE.success);
        setOpen(false);
        setloadingVideoUrlForm(false);
      })
      .catch(() => {
        toasterModel(DEFAULT_MESSAGE.failedUpdatedSuccessSave, TOAST_TYPE.error);
      });
  }

  return (
    <Grid container spacing={2}>
      <Grid
        container
        item
        xs={12}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          {" "}
          <Typography variant="subtitle1" sx={{ fontSize: "1.5rem" }}>
            TRAILER:{" "}
          </Typography>
        </Grid>
        <Grid item sx={{ display: "flex", gap: "1rem" }}>
          <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
            <EditIcon></EditIcon>
          </IconButton>
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
                value={videoUrlForm?.title}
                onChange={(e) => setVideoUrlForm(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="outlined-cancel">
                Cancelar
              </Button>
              <Button
                onClick={onChangeFormVideo}
                disabled={loadingVideoUrlForm}
                variant="contained"
              >
                Trocar URL
              </Button>
            </DialogActions>
          </Dialog>
          <IconButton
            aria-label="expand"
            size="small"
            onClick={() => setTrailerExpanded(!trailerExpanded)}
          >
            {trailerExpanded ? (
              <ExpandLessIcon></ExpandLessIcon>
            ) : (
              <ExpandMoreIcon></ExpandMoreIcon>
            )}
          </IconButton>
        </Grid>
      </Grid>
      {trailerExpanded ? (
        <Grid item xs={12}>
          {CardDetail?.embed_id ? (
            <YoutubeEmbed embed_id={CardDetail?.embed_id ?? ""} />
          ) : (
            <Stack
              sx={{
                display: "flex ",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                border: "1px solid " + theme.palette.background.default,
                borderRadius: "5px",
              }}
              className="video-responsive"
            >
              <PlayCircleOutlineIcon
                sx={{ fontSize: "500%" }}
                className="no-video"
              ></PlayCircleOutlineIcon>
              <Typography sx={{ marginTop: "1rem" }}>
                Adicione o link do trailer no Youtube
              </Typography>
              <FormControl>
                <TextField
                  value={videoUrlForm?.title}
                  onChange={(e) => setVideoUrlForm(e.target.value)}
                  id="videoUrl"
                  className="w100"
                  multiline={true}
                  label="URL do trailer*"
                  variant="standard"
                ></TextField>
              </FormControl>

              <Button
                variant="contained"
                onClick={onChangeFormVideo}
                disabled={loadingVideoUrlForm || !videoUrlForm}
              >
                Adicionar trailer
              </Button>
            </Stack>
          )}
        </Grid>
      ) : null}
    </Grid>
  );
}

export default CardDetailYoutubeVideo;
