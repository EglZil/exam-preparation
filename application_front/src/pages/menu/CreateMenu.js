import { Button, Container, Grid, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useHref } from "react-router-dom";

export function CreateMenu() {
  const [title, setTitle] = useState("");
  const listUrl = useHref("/menus")

  const handleCreate = () => {
    fetch("/api/v1/menus/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
        }),
      }).then(applyResult)
      .then(() => window.location = listUrl);
  };

  const applyResult = (result) => {
    if (result.ok) {
        clear();
      } else {
        window.alert("Nepavyko sukurti: " + result.status);
      }
  }

  const clear = () => {
    setTitle("");
  }

  return (
    <Container>
      <h3>Create new menu</h3>
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
              <Button variant="contained" onClick={handleCreate}>
                Create
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
