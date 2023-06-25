import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "@mui/material";

export function ViewMenu() {
  const [menu, setMenu] = useState({});
  const [meals, setMeals] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch("api/v1/menus/" + params.id)
      .then((response) => response.json())
      .then((data) => setMenu(data));
  }, []);

  useEffect(() => {
    fetch("api/v1/menus/meals/" + params.id)
      .then((response) => response.json())
      .then((data) => setMeals(data));
  }, []);

  return (
    <div>
      <Container>
        <Grid container rowSpacing={4}>
          <header>
            <h1>{menu.title}</h1>
          </header>
        </Grid>
        <Grid item sm={12}>
          <h4>Meals</h4>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Meal title</TableCell>
                  <TableCell>Meal description</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meals.map((meal) => (
                  <TableRow key={meal.id}>
                    <TableCell>{meal.title}</TableCell>
                    <TableCell>{meal.description}</TableCell>
                    <TableCell>{meal.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Container>
    </div>
  );
}
