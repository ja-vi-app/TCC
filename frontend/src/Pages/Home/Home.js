/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import EmojiPicker, { Emoji, EmojiStyle } from "emoji-picker-react";
import { Box } from "@mui/system";
import {
  Grid,
  Card,
  Container,
  Typography,
  IconButton,
  useTheme,
  ClickAwayListener,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Favorite } from "@mui/icons-material";

import CardMovie from "Components/CardMovie/CardMovie";
import CardDetail from "Components/CardDetail/CardDetail";
import CardCreatorForm from "Components/CardCreatorForm/CardCreatorForm";

import { useCardDetail } from "Context/CardDetailContext";
import { useListContext, useListContextUpdate } from "Context/ListContext";
import { isEmptyArray } from "Utils/Functions";
import "./Home.scss";

export default function Home() {
  const [registeredMovies, setRegisteredMovies] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isFavoriteFilterEnable, setIsFavoriteFilterEnable] =
    React.useState(false);

  const useList = useListContext();
  const updateList = useListContextUpdate();
  const cardDetail = useCardDetail();
  const theme = useTheme();

  useEffect(() => {
    updateList();
  }, []);

  useEffect(() => {
    setRegisteredMovies(useList);
  }, [useList]);

  function setFilter(emojiValue, favoriteValue) {
    if (!emojiValue && !favoriteValue) return setRegisteredMovies(useList);

    let dataFiltered = useList;
    if (emojiValue)
      dataFiltered = dataFiltered.filter(
        (filter) => filter?.category === emojiValue
      );
    if (favoriteValue)
      dataFiltered = dataFiltered.filter((filter) => filter?.isFavorite);

    setRegisteredMovies(dataFiltered);
  }

  function onClickSaveEmoji(emojiData) {
    setSelectedEmoji(emojiData.unifiedWithoutSkinTone);
    setFilter(emojiData.unifiedWithoutSkinTone, isFavoriteFilterEnable);
    handleClose();
  }

  const handleClick = () => {
    setShowEmoji(!showEmoji);
  };

  const handleClose = () => {
    setShowEmoji(false);
  };

  const clearFilters = () => {
    setSelectedEmoji(null);
    setFilter(null, isFavoriteFilterEnable);
  };

  const updateFavoriteFilter = () => {
    setIsFavoriteFilterEnable(!isFavoriteFilterEnable);
    setFilter(selectedEmoji, !isFavoriteFilterEnable);
  };

  return (
    <>
      <CardCreatorForm />
      <Container maxWidth={false} style={{ paddingTop: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={cardDetail ? 6 : 12}>
            <Card>
              {isEmptyArray(useList) ? null : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1rem 1rem 0 1rem ",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <Typography variant="">Filtro de categoria: </Typography>
                      {selectedEmoji ? (
                        <Box
                          sx={{
                            display: "flex",
                            gap: "0.25rem",
                            alignItems: "center",
                          }}
                        >
                          <IconButton
                            onClick={handleClick}
                            sx={{ cursor: "pointer" }}
                          >
                            <Emoji
                              unified={selectedEmoji}
                              emojiStyle={EmojiStyle.APPLE}
                              size={20}
                            />
                          </IconButton>
                          <IconButton onClick={clearFilters}>
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        </Box>
                      ) : (
                        <IconButton
                          onClick={handleClick}
                          sx={{
                            border: `1px solid ${theme.palette.textSubtitleColor}`,
                            transform: "scale(0.7)",
                          }}
                        >
                          <FilterAltIcon />
                        </IconButton>
                      )}

                      {showEmoji ? (
                        <ClickAwayListener
                          onClickAway={() => setShowEmoji(false)}
                        >
                          <div className="div-emoji">
                            <EmojiPicker
                              skinTonesDisabled
                              onEmojiClick={onClickSaveEmoji}
                              lazyLoadEmojis
                            />
                          </div>
                        </ClickAwayListener>
                      ) : null}
                    </Box>
                    <IconButton onClick={updateFavoriteFilter}>
                      <Favorite
                        sx={{
                          color: isFavoriteFilterEnable
                            ? "#D0000B"
                            : theme.palette.textSubtitleColor,
                        }}
                      />
                    </IconButton>
                  </Box>
                  <Grid
                    container
                    p={3}
                    spacing={3}
                    className="bg-foreground sm-center"
                  >
                    {registeredMovies?.map((item, index) => (
                      <Grid item key={index}>
                        <CardMovie image={item.url_image} data={item} />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            {cardDetail ? <CardDetail /> : null}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
