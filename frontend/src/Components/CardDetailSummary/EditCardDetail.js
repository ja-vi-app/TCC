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
import { useCardDetailUpdate } from "Context/CardDetailContext";
import { collection, doc } from "firebase/firestore";
import { db } from "Service/dbConection";
import { RECORDED_MOVIES } from "Service/Utils/Tables";
import { updateDB } from "Service/Utils/Functions";
import { useListContextUpdate } from "Context/ListContext";
import { toasterModel } from "Utils/Functions";
import { DEFAULT_MESSAGE, TOAST_TYPE, LABEL_BUTTONS } from "Utils/Constants";
import { Box } from "@mui/system";
import FormImageSelector from "Components/Form/ImageSelector/FormImageSelector";
import FormRatingSelector from "Components/Form/RatingSelector/FormRatingSelector";
import FormTitleSelector from "Components/Form/TitleSelector/FormTitleSelector";
import FormCategorySelector from "Components/Form/CategorySelector/FormCategorySelector";

export default function EditCardDetail(props) {
  const [cardEditInformation, setCardEditInformation] = React.useState({
    ...props.CardDetail,
  });
  const [isCardEditLoading, setIsCardEditLoading] = React.useState(false);
  const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);
  const updateList = useListContextUpdate();
  const changeCardDetail = useCardDetailUpdate();

  function handleDialogClose(event, reason) {
    if (isCardEditLoading) return;
    props.setEditDialogOpen(!props.editDialogOpen);
  }

  React.useEffect(() => {
    setCardEditInformation(props.CardDetail);
  }, [props.CardDetail]);

  async function handleSaveEdit() {
    setIsCardEditLoading(true);
    const docRef = doc(recordedMoviesCollectionRef, props.CardDetail.id);
    await updateDB(docRef, {
      ...cardEditInformation,
    })
      .then(() => {
        setIsCardEditLoading(false);
        props.setEditDialogOpen(!props.editDialogOpen);
        changeCardDetail({ ...props.CardDetail, ...cardEditInformation });
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
            />
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
              />

              <FormCategorySelector
                data={cardEditInformation}
                setData={setCardEditInformation}
              />
            </Box>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          {isCardEditLoading ? (
            <CircularProgress size={30}></CircularProgress>
          ) : (
            <>
              <Button variant="outlined-cancel" onClick={handleDialogClose}>
                {LABEL_BUTTONS.cancel}
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
