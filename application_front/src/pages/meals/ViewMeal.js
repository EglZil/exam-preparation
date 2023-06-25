import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Grid,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

export function ViewMeal() {
  const [meal, setMeal] = useState({});
  const params = useParams();

  useEffect(() => {
    fetch("api/v1/meals/" + params.id)
      .then((response) => response.json())
      .then((data) => setMeal(data));
  }, []);

  return (
    <div>
      <Container>
        <Grid container rowSpacing={4}>
          <header>
            <h1>{meal.title}</h1>
          </header>
        </Grid>
        <Grid item sm={12}>
          <p>Description: {meal.description}</p>
        </Grid>
        <Grid item sm={12}>
          <p>Quantity: {meal.quantity}</p>
        </Grid>
        <Grid item sm={12}>
          <p>Belongs to menu: {meal.menu && meal.menu.title}</p>
        </Grid>
        <Grid marginTop={2}>
          <Link to="/meals">
            <Button variant="contained">Back</Button>
          </Link>
        </Grid>
      </Container>
    </div>
  );
}
