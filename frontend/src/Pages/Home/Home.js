/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { collection } from "firebase/firestore";
import EmojiPicker, { Emoji, EmojiStyle } from "emoji-picker-react";

import { Box } from "@mui/system";
import { Grid, Card, Container, Typography, IconButton, Popover, Button } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import "./Home.scss";
import CardMovie from "../../Components/CardMovie/CardMovie";
import CardDetail from "../../Components/CardDetail/CardDetail";

import { useCardDetail } from "../../Context/CardDetailContext";

import { getDB } from "../../Service/Utils/Functions";
import { db } from "../../Service/dbConection";
import { RECORDED_MOVIES } from "../../Service/Utils/Tables";

import { isEmptyArray } from "../../Utils/Functions";

import List from "../List/List";

export default function Home() {
  const [cleanRegisteredMovies, setCleanRegisteredMovies] = useState([]);
  const [registeredMovies, setRegisteredMovies] = useState([]);

  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);

  useEffect(() => {
    async function fetchData() {
      const data = await getDB(recordedMoviesCollectionRef);
      setCleanRegisteredMovies(data);
      setRegisteredMovies(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    function setFilter() {
      if (!selectedEmoji) setRegisteredMovies(cleanRegisteredMovies);
      else {
        const dataFiltered = cleanRegisteredMovies.filter(
          (filter) => filter?.category === selectedEmoji
        );
        setRegisteredMovies(dataFiltered);
      }
    }

    setFilter();
  }, [selectedEmoji]);

  function onClickSaveEmoji(emojiData, event) {
    setSelectedEmoji(emojiData.unifiedWithoutSkinTone);
  }

  const cardDetail = useCardDetail();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="wrapper">
      <List />
      <Container maxWidth={false} style={{ paddingTop: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={cardDetail ? 12 : 12} lg={cardDetail ? 6 : 12}>
            <Card>
              {isEmptyArray(cleanRegisteredMovies) ? null : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1rem 1rem 0 1rem ",
                    }}
                  >
                    <Typography>Filtro de categoria: </Typography>
                    {selectedEmoji ? (
                      <Box sx={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
                        <Button onClick={handleClick} sx={{ cursor: "pointer" }}>
                          <Emoji unified={selectedEmoji} emojiStyle={EmojiStyle.APPLE} size={20} />
                        </Button>
                        <IconButton onClick={() => setSelectedEmoji(null)}>
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      </Box>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "gray",
                          borderRadius: "50%",
                          width: "25px",
                          height: "25px",
                          cursor: "pointer",
                        }}
                        onClick={handleClick}
                      />
                    )}
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <EmojiPicker onEmojiClick={onClickSaveEmoji} />
                    </Popover>
                  </Box>
                  <Grid container p={3} spacing={3} className="bg-foreground sm-center">
                    {registeredMovies.map((item, index) => (
                      <Grid item key={index}>
                        <CardMovie image={item.url_image} data={item} />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            {cardDetail ? <CardDetail /> : null}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
