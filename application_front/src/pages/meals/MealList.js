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

export function MealList() {
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
      </Container>
    </div>
  );
}
