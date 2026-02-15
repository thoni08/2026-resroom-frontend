import { RouterProvider } from 'react-router'
import { router } from './routes'
import { Toaster } from 'react-hot-toast'
// import './App.css'

function App() {
  return (
    <>
      <Toaster position='bottom-right' />
      <RouterProvider router={router} />
    </>
  )
}

export default App
