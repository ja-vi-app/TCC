import React, { useState } from "react";
import { Button, Card, FormControl, Grid, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Emoji } from "emoji-picker-react";
import YoutubeEmbed from "../YoutubeVideo/YoutubeVideo";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import "./CardDetail.scss";
import { toasterModel } from "../../Utils/Functions";
import { useCardDetail, useCardDetailUpdate } from "../../Context/CardDetailContext";
import { updateDB } from "../../Service/Utils/Functions";
import { collection, doc } from "firebase/firestore";
import { RECORDED_MOVIES } from "../../Service/Utils/Tables";
import { db } from "../../Service/dbConection";
import { DEFAULT_MESSAGE, TOAST_TYPE } from "../../Utils/Constants";

function CardDetail() {
  const [videoUrlForm, setVideoUrlForm] = useState(null);
  const changeCardDetail = useCardDetailUpdate();
  const CardDetail = useCardDetail();
  const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);

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
    await updateDB(docRef, {
      embed_id: value,
    })
      .then(() => {
        toasterModel(DEFAULT_MESSAGE.successSave, TOAST_TYPE.success);
      })
      .catch(() => {
        toasterModel(DEFAULT_MESSAGE.failedSave, TOAST_TYPE.error);
      });
  }

  return (
    <Card
      sx={{
        padding: "1rem",
        wordWrap: "break-word",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Typography>{JSON.stringify(CardDetail)}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <img
            style={{ width: "150px", height: "201px" }}
            src={CardDetail?.url_image}
            alt="logo-img"
          />
        </Grid>
        <Grid item container direction="column" xs={12} sm={8} spacing={2}>
          <Grid item>
            <Typography sx={{ textTransform: "uppercase" }}>{CardDetail?.title}</Typography>
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
                <Emoji unified={CardDetail?.category}></Emoji>
              </Box>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center">
              <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography>FAVORITO</Typography>
                <Emoji unified={CardDetail?.category}></Emoji>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

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
            backgroundColor: "#262626",
          }}
          className="video-responsive"
        >
          <PlayCircleOutlineIcon
            sx={{ fontSize: "500%" }}
            className="no-video"
          ></PlayCircleOutlineIcon>
          <Typography sx={{ marginTop: "1rem" }}>Adicione o link do trailer no Youtube</Typography>
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
          <Button variant="outlined" onClick={onChangeFormVideo}>
            Adicionar trailer
          </Button>
        </Stack>
      )}
    </Card>
  );
}

export default CardDetail;
