import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  styled,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

interface FilterWrapperProps {
  handleFilterClose: () => void;
  filterOpen: boolean;
  filterComponent: () => JSX.Element;
}
const FilterDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: "20px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const FilterWrapper = (props: FilterWrapperProps) => {
  const { handleFilterClose, filterOpen, filterComponent } = props;
  return (
    <FilterDialog sx={{ p: 10 }} onClose={handleFilterClose} open={filterOpen}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography>Filter</Typography>
        <IconButton
          aria-label="close"
          onClick={handleFilterClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{filterComponent!()}</DialogContent>
      <DialogActions>
        <Button autoFocus>Save changes</Button>
      </DialogActions>
    </FilterDialog>
  );
};

export default FilterWrapper;
