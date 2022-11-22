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
import { collection, doc } from "firebase/firestore";
import { db } from "Service/dbConection";
import { RECORDED_MOVIES } from "Service/Utils/Tables";
import { deleteDB } from "Service/Utils/Functions";
import { useListContextUpdate } from "Context/ListContext";
import { toasterModel } from "Utils/Functions";
import { DEFAULT_MESSAGE, TOAST_TYPE, LABEL_BUTTONS } from "Utils/Constants";

export default function DeleteDialog(props) {
  const [loadingDeleteDialog, setLoadingDeleteDialog] = React.useState(false);
  const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);
  const updateList = useListContextUpdate();

  async function deleteCard() {
    const docRef = doc(recordedMoviesCollectionRef, props.id);
    setLoadingDeleteDialog(true);
    await deleteDB(docRef)
      .then(() => {
        toasterModel(DEFAULT_MESSAGE.deletedSuccessSave, TOAST_TYPE.success);
        setLoadingDeleteDialog(false);
        updateList(true);
      })
      .catch(() => {
        toasterModel(
          DEFAULT_MESSAGE.failedDeletedSuccessSave,
          TOAST_TYPE.error
        );
      });
  }

  function handleDeleteDialogClose() {
    if (!loadingDeleteDialog) props.setDeleteDialog(false);
  }

  return (
    <>
      <Dialog
        open={props.deleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Deseja excluir esse card?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Essa ação não pode ser revertida
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {loadingDeleteDialog ? (
            <CircularProgress size={30}></CircularProgress>
          ) : (
            <>
              <Button
                variant="outlined"
                autoFocus
                onClick={handleDeleteDialogClose}
              >
                {LABEL_BUTTONS.cancel}
              </Button>
              <Button variant="outlined-cancel" onClick={deleteCard}>
                Sim
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
