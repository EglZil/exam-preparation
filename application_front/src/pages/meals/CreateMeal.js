import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useHref } from "react-router-dom";

export function CreateMeal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [menus, setMenus] = useState([]);
  const [menu, setMenu] = useState("");
  const listUrl = useHref("/meals");

  useEffect(() => {
    fetch("api/v1/menus")
      .then((menu) => menu.json())
      .then(setMenus);
  }, [])

  const handleCreate = () => {
    fetch(`api/v1/meals/create`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title, 
            description, 
            quantity, 
            menu
        })
    }).then(() => window.location = listUrl)
  };

  return (
    <Container>
      <h3>Create new meal</h3>
      <form>
        <Grid container rowSpacing={2}>
          <Grid item sm={8}>
            <TextField
              fullWidth
              variant="outlined"
              label="Meal title"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item sm={8}>
            <TextField
              fullWidth
              variant="outlined"
              label="Meal description"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item sm={8}>
            <TextField
              fullWidth
              variant="outlined"
              label="Meal quantity"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item sm={8}>
            <FormControl fullWidth required>
              <InputLabel id="meniu-label">Meniu</InputLabel>
              <Select
                label="Meniu"
                labelId="meniu-label"
                id="meniu"
                value={menu}
                onChange={(e) => {
                  setMenu(e.target.value);
                }}
              >
                {menus.map((menu) => (
                    <MenuItem key={menu.id} value={menu}>{menu.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={8} marginTop={2}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleCreate}>
                Create
              </Button>
              <Link to="/meals">
                <Button variant="contained">Back</Button>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
