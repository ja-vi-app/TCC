import * as React from "react";
import Button from "@mui/material/Button";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export default function CardDetailSummary() {
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  function handleDialog() {
    setEditDialogOpen(!editDialogOpen);
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={4} spacing={2}>
          <img
            style={{ width: "150px", height: "201px" }}
            alt="logo-img"
            src="https://tcc-unip-images.s3.sa-east-1.amazonaws.com/8ea46455-4098-4ca1-a1de-a0d0ebd8d52f.jpg"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>titulo</span>
            <Box>
              <IconButton aria-label="edit" size="small">
                <Edit onClick={handleDialog} />
              </IconButton>
              <IconButton>
                <Delete></Delete>
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography>CATEGORIA</Typography>
              {/* <Emoji unified={CardDetail?.category}></Emoji> */}
            </Box>
            <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography>NOTA</Typography>
              {/* <Star isSmall={false} data={CardDetail?.rating} sx={{ transform: "scale(2)" }} /> */}
            </Box>
            <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography>FAVORITO</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={editDialogOpen} onClose={handleDialog}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog}>Cancel</Button>
          <Button onClick={handleDialog}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
