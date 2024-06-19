import './App.css';
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout";
import HomePage from "./components/home";
import CategoriesListPage from "./components/categories/list";
import CategoriesCreatePage from "./components/categories/create";

function App() {

  return (
      <>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage/>} />
                  <Route path={"categories"}  >
                    <Route index element={<CategoriesListPage/>} />
                    <Route path={"create-edit/:id"} element={<CategoriesCreatePage/>} />
                  </Route>

                  {/*<Route path="category-table" element={<CategoryTable/>} />*/}
                  {/*<Route path="create-edit/:id" element={<CreateEditCategory/>} />*/}
              </Route>
          </Routes>
      </>
  )
}

export default App
