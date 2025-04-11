import { useState } from 'react'
import FormLogin from './FormLogin'
import FormRegister from './FormRegister'

function App() {
  const [isLoginForm, setIsLoginForm] = useState(true)

  const toggleForm = () => setIsLoginForm((prev) => !prev)

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: 600 }}>
        {isLoginForm ? <FormLogin /> : <FormRegister />}
        <hr />
        <div className="text-center">
          <button onClick={toggleForm} className="btn btn-link">
            {isLoginForm ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
