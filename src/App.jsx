// import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './routes/layout/layout'
import HomePage from './routes/homepage/homepage'

export default function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element : <Layout/>,
      children:[
        {
          path : "/",
          element : <HomePage/>
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

