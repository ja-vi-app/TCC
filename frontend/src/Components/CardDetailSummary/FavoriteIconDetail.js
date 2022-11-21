import * as React from "react";
import { CircularProgress, IconButton } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

import { collection, doc } from "firebase/firestore";
import { RECORDED_MOVIES } from "Service/Utils/Tables";
import { db } from "Service/dbConection";
import { updateDB } from "Service/Utils/Functions";
import { useCardDetail } from "Context/CardDetailContext";
import { useListContextUpdate } from "Context/ListContext";
import { toasterModel } from "Utils/Functions";
import { DEFAULT_MESSAGE, TOAST_TYPE } from "Utils/Constants";

export default function FavoriteIconDetail() {
  const [isFavorite, setIsFavorited] = React.useState();
  const [loadingIsFavorite, setLoadingIsFavorite] = React.useState();
  const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);
  const CardDetail = useCardDetail();
  const updateList = useListContextUpdate();
  const theme = useTheme();

  React.useEffect(() => {
    setIsFavorited(CardDetail?.isFavorite);
  }, [CardDetail]);

  async function updateDataFavorite() {
    const docRef = doc(recordedMoviesCollectionRef, CardDetail.id);
    setLoadingIsFavorite(true);
    setIsFavorited(!isFavorite);
    await updateDB(docRef, {
      isFavorite: !isFavorite,
    })
      .then(() => {
        updateList();
        setLoadingIsFavorite(false);
      })
      .catch(() => {
        toasterModel(
          DEFAULT_MESSAGE.failedUpdatedSuccessSave,
          TOAST_TYPE.error
        );
      });
  }

  return (
    <>
      {loadingIsFavorite ? (
        <CircularProgress />
      ) : (
        <IconButton onClick={updateDataFavorite}>
          <Favorite
            sx={{
              color: isFavorite ? "#D0000B" : theme.palette.textSubtitleColor,
            }}
          />
        </IconButton>
      )}
    </>
  );
}
