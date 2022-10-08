/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { collection } from "firebase/firestore";

import { Grid } from "@mui/material";

import CardMovie from "../../Components/CardMovie/CardMovie";
import List from "../List";

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
    <>
      <List />
      {isEmptyArray(registeredMovies) ? null : (
        <Grid container spacing={3} p={3}>
          {registeredMovies.map((item, index) => (
            <Grid item xs={6} md={4} xl={1.6} key={index}>
              <CardMovie image={item.url_image} data={item} />
            </Grid>
          ))}
        </Grid>
      )}
      {cardDetail ? (
        <>
          <div>
            <span>testando {JSON.stringify(cardDetail)}</span>
          </div>
        </>
      ) : null}
    </>
  );
}
