import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Homepage from './components/Homepage';
import Mainpage from './components/mainpage';
const router=createBrowserRouter([
  {
    path:'/',
    element:<Homepage/>
  },
  {
    path:"/Login",
    element:<Login/>
  },
  {
    path:'/Register',
    element:<Register/>
  },
  {
    path:'/main',
    element:<Mainpage/>
  }
])

function App() {
  return (
    <div className="App">
     <RouterProvider router={router}/>
    
    </div>
  );
}

export default App;