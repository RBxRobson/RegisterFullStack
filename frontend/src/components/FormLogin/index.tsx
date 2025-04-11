import { useState } from 'react'
import { useLoginUserMutation } from '../../services/api'

const FormLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [loginUser, { isLoading }] = useLoginUserMutation()
  const [loginError, setLoginError] = useState('')
  const [loginSuccess, setLoginSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoginSuccess(false)

    try {
      const response = await loginUser(formData).unwrap()

      if (response?.access_token) {
        console.log('Login bem-sucedido:', response)
        setLoginSuccess(true)
      } else {
        setLoginError('Token não recebido.')
      }
    } catch (error: any) {
      console.error('Erro no login:', error)
      setLoginError(error?.data?.detail || 'Erro ao fazer login. Tente novamente.')
    }
  }

  return (
    <div className="container mt-5" style={{ width: '100%', maxWidth: 700 }}>
      <h2 className="mb-4">Entrar</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nome de usuário
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Senha
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>

        {loginSuccess && (
          <div className="alert alert-success mt-3">Login realizado com sucesso!</div>
        )}

        {loginError && <div className="alert alert-danger mt-3">{loginError}</div>}
      </form>
    </div>
  )
}

export default FormLogin
