import React, { useState } from "react";
import { collection, doc } from "firebase/firestore";

import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextareaAutosize,
  Typography,
  useTheme,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

import { useCardDetail, useCardDetailUpdate } from "Context/CardDetailContext";

import { updateDB } from "Service/Utils/Functions";
import { RECORDED_MOVIES } from "Service/Utils/Tables";
import { db } from "Service/dbConection";

import { toasterModel } from "Utils/Functions";
import { DEFAULT_MESSAGE, LABEL_BUTTONS, TOAST_TYPE } from "Utils/Constants";
import { useListContextUpdate } from "Context/ListContext";

function CardDetailDescription() {
  const changeCardDetail = useCardDetailUpdate();
  const CardDetail = useCardDetail();
  const updateList = useListContextUpdate();
  const [localData, setLocalData] = useState(CardDetail?.description ?? "");
  const [isLocalDataInFocus, setIsLocalDataInFocus] = useState(false);
  const [loadingLocalData, setLoadingLocalData] = useState(false);
  const [enableEditLocalData, setEnableEditLocalData] = useState(false);

  const theme = useTheme();
  const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);

  function handleCancelEdit() {
    setEnableEditLocalData(false);
    setLocalData(CardDetail?.description ?? "");
  }

  function onChangeLocalData() {
    if (!localData)
      return toasterModel(
        "Digite alguma descrição para poder salvá-la",
        TOAST_TYPE.info
      );

    changeCardDetail((prevState) => ({ ...prevState, description: localData }));
    updateData(localData);
  }

  React.useEffect(() => {
    setLocalData(CardDetail?.description ?? "");
  }, [CardDetail]);

  async function updateData(value) {
    const docRef = doc(recordedMoviesCollectionRef, CardDetail.id);
    setLoadingLocalData(true);
    await updateDB(docRef, {
      description: value,
    })
      .then(() => {
        toasterModel(DEFAULT_MESSAGE.updatedSuccessSave, TOAST_TYPE.success);
        setEnableEditLocalData(false);
        setLoadingLocalData(false);
        updateList();
      })
      .catch(() => {
        toasterModel(
          DEFAULT_MESSAGE.failedUpdatedSuccessSave,
          TOAST_TYPE.error
        );
      });
  }

  const textareaStyle = {
    boxSizing: " border-box",
    width: " 100% ",
    margin: "5px 0",
    padding: "0.5rem",
    resize: "none",
    borderRadius: "3px",
    outline: isLocalDataInFocus
      ? "1px solid " + theme.palette.primary.main
      : "0",
    border: enableEditLocalData
      ? "2px solid " + theme.palette.primary.main
      : "0",
    backgroundColor: theme.palette.background.foreground,
    color: theme.palette.textColor,
  };

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
            DESCRIÇÃO:{" "}
          </Typography>
        </Grid>
        <Grid item sx={{ display: "flex", gap: "1rem" }}>
          {!enableEditLocalData ? (
            <IconButton
              aria-label="edit"
              size="small"
              onClick={() => setEnableEditLocalData(true)}
            >
              <Edit />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextareaAutosize
          disabled={!enableEditLocalData}
          value={localData}
          onChange={(e) => setLocalData(e.target.value)}
          onFocus={() => setIsLocalDataInFocus(true)}
          onBlur={() => setIsLocalDataInFocus(false)}
          className="textarea"
          style={textareaStyle}
          aria-label="empty textarea"
          placeholder={
            enableEditLocalData
              ? "Edite a descrição da mídia e clique no botão salvar"
              : "Sem descrição cadastrada. Clique no botão de editar ao lado de 'Descrição'"
          }
        />

        {enableEditLocalData ? (
          <Grid container justifyContent="flex-end" marginTop="1rem">
            {loadingLocalData ? (
              <CircularProgress />
            ) : (
              <Grid container justifyContent="flex-end" gap="1rem">
                <Button variant="outlined-cancel" onClick={handleCancelEdit}>
                  {LABEL_BUTTONS.cancel}
                </Button>
                <Button variant="contained" onClick={onChangeLocalData}>
                  {LABEL_BUTTONS.save}
                </Button>
              </Grid>
            )}{" "}
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default CardDetailDescription;
