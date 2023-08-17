import {Routes,Route} from 'react-router-dom'
import HomePage from './components/pages/HomePage';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import './App.css';
import Policy from './components/pages/Policy';
import Pagenotfound from './components/pages/Pagenotfound';
import Register from './components/pages/Auth/Register';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/pages/Auth/Login';
import Dashboard from './components/pages/user/Dashboard';
import { PrivateRoute } from './components/Layout/Routes/Private';
import ForgotPassword from './components/pages/Auth/ForgotPassword';
import { AdminRoute } from './components/Layout/Routes/AdminRoute';
import AdminDashboard from './components/pages/admin/AdminDashboard';
import CreateCategory from './components/pages/admin/CreateCategory';
import CreateProduct from './components/pages/admin/CreateProduct';
import Users from './components/pages/admin/Users';
import Orders from './components/pages/user/Orders';
import Profile from './components/pages/user/Profile';
import Products from './components/pages/admin/Products';
import UpdateProduct from './components/pages/admin/UpdateProduct';
import CartPage from './components/pages/CartPage'
import AdminOrders from './components/pages/admin/AdminOrders';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/cart' element={<CartPage/>}/>

        <Route path='/dashboard' element={<PrivateRoute/>}>
        <Route path='user' element={<Dashboard/>}/>
        <Route path='user/orders' element={<Orders/>}/>
        <Route path='user/profile' element={<Profile/>}/>
        </Route>

        <Route path='/dashboard' element={<AdminRoute/>}>
          <Route path='admin' element={<AdminDashboard/>} />
          <Route path='admin/create-category' element={<CreateCategory/>} />
          <Route path='admin/create-product' element={<CreateProduct/>} />
          <Route path='admin/product/:slug' element={<UpdateProduct/>} />
          <Route path='admin/products' element={<Products/>} />
          <Route path='admin/users' element={<Users/>} />
          <Route path='admin/orders' element={<AdminOrders/>} />
        </Route>
      <Route path='/menu'/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/*' element={<Pagenotfound/>}/>
    </Routes>
  );
}

export default App;
