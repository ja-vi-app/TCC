/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

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

import "./Home.scss";
import CardMovie from "../../Components/CardMovie/CardMovie";
import CardDetail from "../../Components/CardDetail/CardDetail";

import { useCardDetail } from "../../Context/CardDetailContext";

import { isEmptyArray } from "../../Utils/Functions";

import { useListContext, useListContextUpdate } from "../../Context/ListContext";
import EmojiPicker, { Emoji, EmojiStyle } from "emoji-picker-react";
import CardCreatorForm from "../../Components/CardCreatorForm/CardCreatorForm";

export default function Home() {
  const [registeredMovies, setRegisteredMovies] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

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

  function setFilter(valueFilter) {
    if (!valueFilter) {
      setRegisteredMovies(useList);
    } else {
      const dataFiltered = useList.filter((filter) => filter?.category === valueFilter);
      setRegisteredMovies(dataFiltered);
    }
  }

  function onClickSaveEmoji(emojiData) {
    setSelectedEmoji(emojiData.unifiedWithoutSkinTone);
    setFilter(emojiData.unifiedWithoutSkinTone);
    handleClose();
  }

  const handleClick = () => {
    setShowEmoji(!showEmoji);
  };

  const handleClose = () => {
    setShowEmoji(false);
  };

  const clearFilters = () => {
    setRegisteredMovies(useList);
    setSelectedEmoji(null);
  };

  return (
    <>
      <CardCreatorForm></CardCreatorForm>
      <Container maxWidth={false} style={{ paddingTop: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={cardDetail ? 6 : 12}>
            <Card>
              {isEmptyArray(useList) ? null : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1rem 1rem 0 1rem ",
                    }}
                  >
                    <Typography variant="">Filtro de categoria: </Typography>
                    {selectedEmoji ? (
                      <Box sx={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
                        <IconButton onClick={handleClick} sx={{ cursor: "pointer" }}>
                          <Emoji unified={selectedEmoji} emojiStyle={EmojiStyle.APPLE} size={20} />
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
                      <ClickAwayListener onClickAway={() => setShowEmoji(false)}>
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
                  <Grid container p={3} spacing={3} className="bg-foreground sm-center">
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
