import * as React from "react";
import { Box, ClickAwayListener, IconButton, Typography } from "@mui/material";
import EmojiPicker, { Emoji, EmojiStyle } from "emoji-picker-react";
import { EmojiEmotions } from "@mui/icons-material";

export default function FormCategorySelector(props) {
  const [isOpenPopover, setIsOpenPopover] = React.useState(false);

  function changeForm(category) {
    props.setData({ ...props.data, category });
  }

  const handleClick = async (event) => {
    setIsOpenPopover(true);
  };

  const handleClose = () => {
    setIsOpenPopover(false);
  };

  function onClickSaveEmoji(emojiData, event) {
    changeForm(emojiData.unifiedWithoutSkinTone);
    handleClose();
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Typography color="textSubtitleColor">Categoria</Typography>
      <IconButton aria-describedby="simple-popover" onClick={handleClick}>
        {props.data.category ? (
          <Emoji
            unified={props.data.category}
            emojiStyle={EmojiStyle.APPLE}
            size={24}
          />
        ) : (
          <EmojiEmotions />
        )}
      </IconButton>
      {isOpenPopover ? (
        <ClickAwayListener onClickAway={() => setIsOpenPopover(false)}>
          <div className="div-emoji">
            <EmojiPicker
              id="simple-popover"
              skinTonesDisabled
              onEmojiClick={onClickSaveEmoji}
              lazyLoadEmojis
            />
          </div>
        </ClickAwayListener>
      ) : null}
    </Box>
  );
}
