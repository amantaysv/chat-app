import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './hoc/PrivateRoute'
import { Home } from './views/Home'
import { LoginPage } from './views/LoginPage'

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  )
}

export default App
