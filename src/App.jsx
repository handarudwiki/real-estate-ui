// import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './routes/layout/layout'
import HomePage from './routes/homepage/homepage'
import ListPage from './routes/listpage/listpage'
import SinglePage from './routes/singlepage/SinglePage'

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
          element : <ListPage/>
        },
        {
          path: "/:id",
          element : <SinglePage/>
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

