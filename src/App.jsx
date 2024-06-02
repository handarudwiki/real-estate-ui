// import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout,RequireAuth } from './routes/layout/layout'
import HomePage from './routes/homepage/homepage'
import ListPage from './routes/listpage/listpage'
import SinglePage from './routes/singlepage/SinglePage'
import ProfilePage  from './routes/profilepage/profilepage'
import ProfileUpdatePage  from './routes/profile/ProfileUpdatePage'
import Register from './routes/register/Register'
import Login from './routes/login/Login'
import NewPostPage from './routes/newpostpage/NewPostPage'
import { listPageLoader, profileLoader, singlePageLoader } from './lib/loader'
export default function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element : <Layout/>,
      children:[
        {
          path : "/",
          element : <HomePage/>
        },
        {
          path :"/list",
          element : <ListPage/>,
          loader : listPageLoader
        },
        {
          path: "/:id",
          element : <SinglePage/>,
          loader : singlePageLoader
        },
        {
          path:"/register",
          element : <Register/>
        },
        {
          path:"/login",
          element : <Login/>
        },
      ]
    },{
      path:"/",
      element:<RequireAuth/>,
      children :[
        {
          path : "/profile",
          element : <ProfilePage/>,
          loader : profileLoader
        },
        {
          path:"/create",
          element : <NewPostPage/>
        },
        {
          path:"/profile/update",
          element : <ProfileUpdatePage/>
        },
      ]
    }
  ])

  return <RouterProvider router={router} />
}

