import * as React from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useCardDetail } from "Context/CardDetailContext";
import Star from "Components/CardMovie/star";
import { Emoji } from "emoji-picker-react";
import FavoriteIconDetail from "./FavoriteIconDetail";
import EditCardDetail from "./EditCardDetail";
import DeleteDialog from "./ConfirmDeleteDialog";

export default function CardDetailSummary() {
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const CardDetail = useCardDetail();

  function handleEditDialog() {
    setEditDialogOpen(!editDialogOpen);
  }

  function handleDeleteDialog() {
    setDeleteDialog(true);
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <img
            style={{ width: "150px", height: "201px" }}
            src={CardDetail?.url_image}
            alt="logo-img"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{
                textTransform: "uppercase",
                maxWidth: "300px",
                textAlign: "center",
              }}
            >
              {CardDetail?.title}
            </Typography>
            <Box>
              <IconButton
                aria-label="edit"
                size="small"
                onClick={handleEditDialog}
              >
                <Edit />
              </IconButton>
              <IconButton onClick={handleDeleteDialog}>
                <Delete />
              </IconButton>
              <DeleteDialog
                id={CardDetail?.id}
                setDeleteDialog={setDeleteDialog}
                deleteDialog={deleteDialog}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Box className="flex-collum-center-05">
              <Typography>CATEGORIA</Typography>
              <Emoji unified={CardDetail?.category}></Emoji>
            </Box>
            <Box className="flex-collum-center-05">
              <Typography>NOTA</Typography>
              <Star
                isSmall={false}
                data={CardDetail?.rating}
                sx={{ transform: "scale(2)" }}
              />
            </Box>
            <Box className="flex-collum-center-05">
              <Typography>FAVORITO</Typography>
              <FavoriteIconDetail></FavoriteIconDetail>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <EditCardDetail
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        CardDetail={CardDetail}
      />
    </>
  );
}
