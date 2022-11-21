import * as React from "react";
import Button from "@mui/material/Button";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  useCardDetail,
  useCardDetailUpdate,
} from "../../Context/CardDetailContext";
import { collection, doc } from "firebase/firestore";
import { db } from "../../Service/dbConection";
import { RECORDED_MOVIES } from "../../Service/Utils/Tables";
import { updateDB } from "../../Service/Utils/Functions";
import { useListContextUpdate } from "../../Context/ListContext";
import { toasterModel } from "../../Utils/Functions";
import { DEFAULT_MESSAGE, TOAST_TYPE } from "../../Utils/Constants";
import { Box } from "@mui/system";
import FormImageSelector from "../Form/ImageSelector/FormImageSelector";
import FormRatingSelector from "../Form/RatingSelector/FormRatingSelector";
import FormTitleSelector from "../Form/TitleSelector/FormTitleSelector";
import FormCategorySelector from "../Form/CategorySelector/FormCategorySelector";

export default function EditCardDetail(props) {
  const CardDetail = useCardDetail();

  const [cardEditInformation, setCardEditInformation] = React.useState({
    ...CardDetail,
  });
  const [isCardEditLoading, setIsCardEditLoading] = React.useState(false);
  const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);
  const updateList = useListContextUpdate();
  const changeCardDetail = useCardDetailUpdate();

  function handleDialogClose(event, reason) {
    if (isCardEditLoading) return;
    props.setEditDialogOpen(!props.editDialogOpen);
  }

  async function handleSaveEdit() {
    setIsCardEditLoading(true);
    const docRef = doc(recordedMoviesCollectionRef, CardDetail.id);
    await updateDB(docRef, {
      ...cardEditInformation,
    })
      .then(() => {
        setIsCardEditLoading(false);
        props.setEditDialogOpen(!props.editDialogOpen);
        changeCardDetail({ ...CardDetail, ...cardEditInformation });
        updateList();
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
      <Dialog open={props.editDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Editar Card</DialogTitle>
        <DialogContent>
          <DialogContentText>Edite os dados do seu card</DialogContentText>
          <DialogContent>
            <FormTitleSelector
              data={cardEditInformation}
              setData={setCardEditInformation}
            ></FormTitleSelector>
          </DialogContent>
          <DialogContent>
            <FormRatingSelector
              data={cardEditInformation}
              setData={setCardEditInformation}
            ></FormRatingSelector>
          </DialogContent>

          <DialogContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <FormImageSelector
                selectorId={"contained-button-file-form-edit"}
                data={cardEditInformation}
                setData={setCardEditInformation}
              ></FormImageSelector>

              <FormCategorySelector
                data={cardEditInformation}
                setData={setCardEditInformation}
              ></FormCategorySelector>
            </Box>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          {isCardEditLoading ? (
            <CircularProgress size={30}></CircularProgress>
          ) : (
            <>
              <Button variant="outlined-cancel" onClick={handleDialogClose}>
                Cancelar
              </Button>
              <Button variant="contained" onClick={handleSaveEdit}>
                Salvar edições
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
