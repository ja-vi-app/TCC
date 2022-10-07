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

export default function Home() {
  const [registeredMovies, setRegisteredMovies] = useState([]);

  const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);

  useEffect(() => {
    async function fetchData() {
      setRegisteredMovies(await getDB(recordedMoviesCollectionRef));
    }
    fetchData();
  }, []);

  return (
    <>
      <List />
      {isEmptyArray(registeredMovies) ? null : (
        <Grid container spacing={3} p={3}>
          {registeredMovies.map((item) => (
            <Grid item xs={6} md={4} xl={1.6}>
              <CardMovie image={item.url_image} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
