import { Container } from "@mui/system";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function MealList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = () => {
    fetch("api/v1/meals")
      .then((meal) => meal.json())
      .then(setMeals);
  };

  const handleDelete = (id) => {
    fetch("api/v1/meals/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "applicatioin/json",
      },
    }).then(fetchMeals);
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container rowSpacing={3}>
          <Grid item sm={10}>
            <h3>Meals List</h3>
          </Grid>
          <Grid item sm={2}>
            <Link to="/meals/create">
              <Stack direction="row" justifyContent="flex-end">
                <Button id="create-new-subject" variant="contained">
                  Add new meal
                </Button>
              </Stack>
            </Link>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Meal title</TableCell>
                <TableCell>Meal description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Menu name</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {meals.map((meal) => (
                <TableRow key={meal.id}>
                  <TableCell>{meal.title}</TableCell>
                  <TableCell>{meal.description}</TableCell>
                  <TableCell>{meal.quantity}</TableCell>
                  <TableCell>{meal.menu.title}</TableCell>
                  <TableCell>
                    <Link to={"/meals/view/" + meal.id}>
                      <Button variant="contained">View</Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={"/meals/edit/" + meal.id}>
                      <Button variant="contained">Edit</Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(meal.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
