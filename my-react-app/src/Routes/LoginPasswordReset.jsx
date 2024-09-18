import React, { useEffect, useState } from 'react'
import Button from '../Components/Button'
import Input from '../Components/Input'
import useForm from '../Utils/useForm'
//import { PASSWORD_RESET } from '../Api/api'
import { useNavigate } from 'react-router-dom'
import ErrorMsg from '../Components/ErrorMsg'
import Head from '../Components/Head'
import Title from '../Components/Title'
import useFetch from '../Utils/useFetch'

function LoginPasswordReset() {
  const [login, setLogin] = useState('')
  const [key, setKey] = useState('')
  const password = useForm('password')
  const {error, loading, request} = useFetch()
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const key = params.get('key')
    const login = params.get('login')
    if (key) setKey(key)
    if (login) setLogin(login)
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    if(password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      })
      const {response} = await request(url, options)
      if(response.ok) navigate('/login')
    }
  }

  return (
    <section className='animeLeft'>
      <Head title="Resete sua senha" />
      <Title type='h1'>Resete a senha</Title>
      <form onSubmit={handleSubmit}>
        <Input label="Nova senha" type="password" name="password" {...password}/>
        {loading ? <Button content="Resetando..." disabled/> : <Button content="Resetar" />}
      </form>
      <ErrorMsg error={error} />
    </section>
  )
}

export default LoginPasswordReset
