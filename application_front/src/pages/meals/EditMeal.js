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
import { Link, useParams } from "react-router-dom";

export function EditMeal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [menus, setMenus] = useState([]);
  const [menu, setMenu] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const params = useParams();

  useEffect(() => {
    fetch("api/v1/meals/" + params.id)
      .then((response) => response.json())
      .then((data) => {
        setMenu(data.menu);
        setTitle(data.title);
        setDescription(data.description);
        setQuantity(data.quantity);
      });
  }, []);

  useEffect(() => {
    fetch("api/v1/menus")
      .then((menu) => menu.json())
      .then(setMenus);
  }, []);

  const handleEdit = () => {
    fetch("api/v1/meals/update/" + params.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        quantity,
        menu,
      }),
    }).then((result) => {
      if (!result.ok) {
        setError("Error occured");
      } else {
        setError("");
        setMessage("Updated successfuly");
      }
    });
  };

  return (
    <Container>
      <h3>Create new meal</h3>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
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
                  <MenuItem key={menu.id} value={menu}>
                    {menu.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={8} marginTop={2}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleEdit}>
                Edit
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
