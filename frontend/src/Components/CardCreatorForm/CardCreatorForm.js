import * as React from "react";
import Button from "@mui/material/Button";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { collection, doc } from "firebase/firestore";
import { db } from "../../Service/dbConection";
import { RECORDED_MOVIES } from "../../Service/Utils/Tables";
import { addDB } from "../../Service/Utils/Functions";
import { useListContextUpdate } from "../../Context/ListContext";
import { toasterModel } from "../../Utils/Functions";
import {
  DEFAULT_MESSAGE,
  SESSION_STORAGE_ITEM,
  TOAST_TYPE,
} from "../../Utils/Constants";
import FormImageSelector from "../Form/ImageSelector/FormImageSelector";
import FormRatingSelector from "../Form/RatingSelector/FormRatingSelector";
import FormTitleSelector from "../Form/TitleSelector/FormTitleSelector";
import { Add, Remove } from "@mui/icons-material";
import CustomDate from "../CustomDate/CustomDate";
import FormCategorySelector from "../Form/CategorySelector/FormCategorySelector";

export default function CardCreatorForm(props) {
  const [cardSavingLoading, setCardSavingLoading] = React.useState(false);
  const [isOpenAccordion, setIsOpenAccordion] = React.useState(false);
  const [cardCreated, setCardCreated] = React.useState({
    title: "",
    rating: 0,
    url_image: "",
    category: "",
  });

  const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);
  const updateList = useListContextUpdate();

  async function handleCreateCard() {
    const docRef = doc(recordedMoviesCollectionRef);
    setCardSavingLoading(true);
    await addDB(docRef, {
      id: docRef.id,
      title: cardCreated?.title,
      category: cardCreated?.category,
      rating: cardCreated?.rating ?? null,
      url_image: cardCreated.url_image ?? null,
      name: sessionStorage.getItem(SESSION_STORAGE_ITEM.nameUser),
      email: sessionStorage.getItem(SESSION_STORAGE_ITEM.email),
      upload_date: CustomDate.dateFormatter(new Date()),
      owner: sessionStorage.getItem(SESSION_STORAGE_ITEM.userUid),
    })
      .then(() => {
        setCardSavingLoading(false);
        toasterModel(DEFAULT_MESSAGE.successSave, TOAST_TYPE.success);
        setCardCreated({
          title: "",
          rating: 0,
          url_image: "",
          category: "",
        });
        setIsOpenAccordion(!isOpenAccordion);
        updateList();
      })
      .catch(() => {
        toasterModel(DEFAULT_MESSAGE.failedSave, TOAST_TYPE.error);
      });
  }

  return (
    <Container maxWidth="xl" className="p1 text">
      <Accordion
        expanded={isOpenAccordion}
        onChange={() => {
          setIsOpenAccordion(!isOpenAccordion);
        }}
        style={{
          borderRadius: "15px",
        }}
      >
        <AccordionSummary
          expandIcon={
            <Button className="bg-accent">
              {isOpenAccordion ? (
                <Remove fontSize="large" className="color-white" />
              ) : (
                <Add fontSize="large" className="color-white" />
              )}
            </Button>
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ height: "100px" }}
        >
          <div style={{ display: "grid" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              {" "}
              CRIAR{" "}
            </span>
            <Typography color="textSubtitleColor" style={{ fontSize: "13px" }}>
              Crie um card pra se lembrar de seu filme favorito!
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <FormTitleSelector
                data={cardCreated}
                setData={setCardCreated}
              ></FormTitleSelector>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormRatingSelector
                data={cardCreated}
                setData={setCardCreated}
              ></FormRatingSelector>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormImageSelector
                selectorId={"contained-button-file-form"}
                data={cardCreated}
                setData={setCardCreated}
                sugestions={true}
              ></FormImageSelector>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormCategorySelector
                data={cardCreated}
                setData={setCardCreated}
              ></FormCategorySelector>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {cardSavingLoading ? (
                <CircularProgress size={30}></CircularProgress>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleCreateCard}
                  disabled={
                    !(
                      cardCreated.title &&
                      cardCreated.url_image &&
                      cardCreated.category &&
                      cardCreated.rating
                    )
                  }
                >
                  Salvar Card
                </Button>
              )}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
