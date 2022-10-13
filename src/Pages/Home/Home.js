/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { collection } from "firebase/firestore";
import "./Home.scss";

import { Grid, Card, Container } from "@mui/material";

import CardMovie from "../../Components/CardMovie/CardMovie";
import List from "../List/List";

import { getDB } from "../../Service/Utils/Functions";
import { db } from "../../Service/dbConection";
import { RECORDED_MOVIES } from "../../Service/Utils/Tables";
import { isEmptyArray } from "../../Utils/Functions";
import { useCardDetail } from "../../Context/CardDetailContext";

export default function Home() {
  const [registeredMovies, setRegisteredMovies] = useState([]);

  const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);

  useEffect(() => {
    async function fetchData() {
      setRegisteredMovies(await getDB(recordedMoviesCollectionRef));
    }
    fetchData();
  }, []);

  const cardDetail = useCardDetail();

  return (
    <div className="wrapper">
      <List />
      <Container maxWidth={false} style={{ paddingTop: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={cardDetail ? 12 : 12} lg={cardDetail ? 6 : 12}>
            <Card>
              {isEmptyArray(registeredMovies) ? null : (
                <Grid container p={3} spacing={3} className="bg-foreground sm-center">
                  {registeredMovies.map((item, index) => (
                    <Grid item key={index}>
                      <CardMovie image={item.url_image} data={item} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card className="bg-foreground">
              {cardDetail ? (
                <>
                  <div>
                    <span>testando {JSON.stringify(cardDetail)}</span>
                  </div>
                </>
              ) : null}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
