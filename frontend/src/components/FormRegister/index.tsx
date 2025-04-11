import { useState } from 'react'
import { useRegisterUserMutation } from '../../services/api'

const FormRegister = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
  })

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})
  const [generalError, setGeneralError] = useState('')
  const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev }
        delete updated[e.target.name]
        return updated
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFieldErrors({})
    setGeneralError('')

    try {
      await registerUser(formData).unwrap()
    } catch (error: any) {
      const detail = error?.data?.detail || 'Erro desconhecido'

      if (typeof detail === 'string') {
        if (detail.includes('usuário')) {
          setFieldErrors({ username: detail })
        } else if (detail.includes('E-mail') || detail.includes('email')) {
          setFieldErrors({ email: detail })
        } else {
          setGeneralError(detail)
        }
      } else {
        setGeneralError('Erro ao registrar. Tente novamente.')
      }

      console.error('Erro no registro:', error)
    }
  }

  const isFormValid =
    Object.values(formData).every((value) => value.trim() !== '') && isValidEmail(formData.email)

  const fields = [
    { name: 'full_name', label: 'Nome completo', type: 'text' },
    { name: 'username', label: 'Nome de usuário', type: 'text' },
    { name: 'email', label: 'E-mail', type: 'email' },
    { name: 'password', label: 'Senha', type: 'password' },
  ]

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Criar conta</h2>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        {fields.map(({ name, label, type }) => (
          <div className="mb-3" key={name}>
            <label htmlFor={name} className="form-label">
              {label}
            </label>
            <input
              type={type}
              className={`form-control ${fieldErrors[name] ? 'is-invalid' : ''}`}
              id={name}
              name={name}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              required
            />
            {fieldErrors[name] && <div className="invalid-feedback">{fieldErrors[name]}</div>}
          </div>
        ))}

        <button type="submit" className="btn btn-primary" disabled={isLoading || !isFormValid}>
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        {isSuccess && (
          <div className="alert alert-success mt-3">Usuário registrado com sucesso!</div>
        )}
        {generalError && <div className="alert alert-danger mt-3">{generalError}</div>}
      </form>
    </div>
  )
}

export default FormRegister
