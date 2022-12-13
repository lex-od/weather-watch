import { useState, FC, useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogActions } from "@mui/material";
import { Button } from "@mui/material";
import { ListItem } from "@mui/material";

import css from "./AddCityDialog.module.scss";
import { ICityItem } from "redux/cities/citiesTypes";

interface IAddCityDialog {
  cities: ICityItem[];
  onSubmit: (newCity: ICityItem) => void;
  open: boolean;
  onClose: () => void;
}

export const AddCityDialog: FC<IAddCityDialog> = ({
  cities,
  onSubmit,
  open,
  onClose,
}) => {
  const [selected, setSelected] = useState<ICityItem | null>(null);

  useEffect(() => {
    setSelected(null);
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add new city</DialogTitle>

      <DialogContent sx={{ width: 400 }}>
        <List sx={{ height: 350, overflowY: "auto" }} className={css.cityList}>
          {cities.map((city) => (
            <ListItemButton
              key={city.id}
              selected={selected?.id === city.id}
              onClick={() => setSelected(city)}
            >
              <ListItemIcon>
                {selected?.id === city.id && <CheckIcon />}
              </ListItemIcon>

              <ListItemText primary={city.name} secondary={city.country} />
            </ListItemButton>
          ))}

          {!cities.length && <ListItem>No cities available</ListItem>}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} size="large">
          Cancel
        </Button>

        <Button
          disabled={!selected}
          onClick={() => onSubmit(selected as ICityItem)}
          size="large"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
