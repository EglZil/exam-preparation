import { Button, Container, Grid, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function EditMenu() {
  const [menu, setMenu] = useState({
    title: "",
  });
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const params = useParams();

  useEffect(() => {
    fetch("api/v1/menus/" + params.id)
      .then((response) => response.json())
      .then((data) => {
        setMenu(data);
        setTitle(data.title);
      });
  }, []);

  const handleEdit = () => {
    fetch("api/v1/menus/update/" + params.id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title
        })
    }).then((result) => {
        if(!result.ok) {
            setError("Error occured");
        } else {
            setError("");
            setMessage("Updated successfuly");
        }
    })
  }

  return (
    <Container>
      <h3>Edit menu: {menu.title}</h3>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
      <form>
        <Grid container rowSpacing={2}>
          <Grid item sm={8}>
            <TextField
              fullWidth
              variant="outlined"
              label="Menu title"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item sm={8} marginTop={2}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleEdit}>
                Edit
              </Button>
              <Link to="/menus">
                <Button variant="contained">Back</Button>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
