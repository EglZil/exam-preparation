import { Menu } from './components/Menu';
import './App.css';
import { HashRouter, Route, Routes } from "react-router-dom";
import { MenuList } from './pages/menu/MenuList';
import { CreateMenu } from './pages/menu/CreateMenu';
import { ViewMenu } from './pages/menu/ViewMenu';
import { MealList } from './pages/meals/MealList';
import { OrderList } from './pages/orders/OrderList';
import { EditMenu } from './pages/menu/EditMenu';
import { CreateMeal } from './pages/meals/CreateMeal';
import { ViewMeal } from './pages/meals/ViewMeal';
import { EditMeal } from './pages/meals/EditMeal';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Menu/>
          <Routes>
            <Route path='/menus' element={<MenuList/>}></Route>
            <Route path='/menus/create' element={<CreateMenu />}></Route>
            <Route path='/menus/view/:id' element={<ViewMenu />}></Route>
            <Route path='/menus/edit/:id' element={<EditMenu />}></Route>

            <Route path='/meals' element={<MealList/>}></Route>
            <Route path='/meals/create' element={<CreateMeal />}></Route>
            <Route path='/meals/view/:id' element={<ViewMeal />}></Route>
            <Route path='/meals/edit/:id' element={<EditMeal />}></Route>

            <Route path='/orders' element={<OrderList/>}></Route>
          </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
