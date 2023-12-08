import { LoadingButton } from '@mui/lab'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  console.log('LoginPage ~ error:', error)

  const handleChangeInput = () => {
    if (error) setError(null)
  }

  const checkSession = async (username: string, password: string) => {
    setLoading(true)
    try {
      const { data } = await axios.get('https://api.chatengine.io/users/me/session/', {
        headers: {
          'Public-key': import.meta.env.VITE_PUBLIC_KEY,
          'User-Name': username,
          'User-Secret': password,
        },
      })
      if (data.token) {
        localStorage.setItem('token', data.token)
        navigate('/')
      }
    } catch (error: any) {
      setError(error.response.data.detail)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const username = data.get('username')?.toString() || ''
    console.log('handleSubmit ~ username:', username)
    const password = data.get('password')?.toString() || ''
    console.log('handleSubmit ~ password:', password)
    const remember = Boolean(data.get('remember'))
    console.log('handleSubmit ~ remember:', remember)

    if (remember) {
      localStorage.setItem('username', username)
      localStorage.setItem('password', password)
    } else {
      sessionStorage.setItem('username', username)
      sessionStorage.setItem('password', password)
    }

    checkSession(username, password)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Typography
          component='p'
          variant='body1'
          mt={1}
          color={(theme) => theme.palette.error.dark}
        >
          {error}
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
            error={!!error}
            onChange={handleChangeInput}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            error={!!error}
            onChange={handleChangeInput}
          />
          <FormControlLabel
            control={<Checkbox name='remember' id='remember' value='remember' color='primary' />}
            label='Remember me'
          />
          <LoadingButton
            loading={loading}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
