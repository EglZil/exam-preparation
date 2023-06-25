import { Container } from "@mui/system";
import {
  Button,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function MenuList() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetchMenus()
  }, []);

  const fetchMenus = () => {
    fetch("api/v1/menus")
      .then((menu) => menu.json())
      .then(setMenus);
  }

  const handleDelete = (id) => {
    fetch("api/v1/menus/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "applicatioin/json",
      },
    }).then(fetchMenus);
  }

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container rowSpacing={3}>
          <Grid item sm={10}>
            <h3>Menu List</h3>
          </Grid>
          <Grid item sm={2}>
            <Link to="/menus/create">
              <Stack direction="row" justifyContent="flex-end">
                <Button variant="contained">Add new menu</Button>
              </Stack>
            </Link>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Menu title</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menus.map((menu) => (
                <TableRow key={menu.id}>
                  <TableCell>{menu.title}</TableCell>
                  <TableCell>
                    <Link to={"/menus/view/" + menu.id}>
                      <Button variant="contained">View</Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleDelete(menu.id)}>Delete</Button>
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
