import { getCookie } from 'cookies-next'
import * as jose from 'jose'
import api from './api.service'

const signIn = async (emailOrUsername: string, password: string) => {
  const emailOrUsernameBody = emailOrUsername.includes('@')
    ? { email: emailOrUsername }
    : { username: emailOrUsername }

  const response = await api.post('auth/signin', {
    ...emailOrUsernameBody,
    password,
  })

  return response
}

const signInMfa = async (
  emailOrUsername: string,
  password: string,
  code: string,
  loginToken: string
) => {
  const emailOrUsernameBody = emailOrUsername.includes('@')
    ? { email: emailOrUsername }
    : { username: emailOrUsername }

  const response = await api.post('auth/signin/mfa', {
    ...emailOrUsernameBody,
    password,
    code,
    loginToken,
  })

  return response
}

const signUp = async (email: string, username: string, password: string) => {
  const response = await api.post('auth/signup', { email, username, password })

  return response
}

const signOut = async () => {
  await api.post('/auth/signout')

  window.location.reload()
}

const refreshAccessToken = async () => {
  try {
    const accessToken = getCookie('access_token') as string

    if (
      !accessToken ||
      (jose.decodeJwt(accessToken).exp ?? 0) * 1000 < Date.now() + 2 * 60 * 1000
    ) {
      await api.post('/auth/token')
    }
  } catch (e) {
    console.info('Refresh token invalid or expired')
  }
}

const requestResetPassword = async (email: string) => {
  await api.post(`/auth/reset-password/${email}`)
}

const resetPassword = async (token: string, password: string) => {
  await api.post('/auth/reset-password', { token, password })
}

const updatePassword = async (oldPassword: string, password: string) => {
  await api.patch('/auth/password', { oldPassword, password })
}

const refreshMfaCode = async () => {
  await api.post('/auth/mfa/refresh-code', {})
}

const enableMfa = async (mfaMethod: string, password: string, mfaPhone: string) => {
  const { data } = await api.post('/auth/mfa/enable', {
    mfaMethod,
    password,
    mfaPhone: mfaPhone.replace(/\D/g, ''),
  })

  if (mfaMethod === 'TOTP') {
    return {
      totpUri: data.totpUri,
      mfaSecret: data.mfaSecret,
      qrCode: data.qrCode,
    }
  }
}

const verifyMfa = async (code: string, password: string) => {
  await api.post('/auth/mfa/verify', {
    code,
    password,
  })
}

const disableMfa = async (code: string, password: string) => {
  await api.post('/auth/mfa/disable', {
    code,
    password,
  })
}

const authService = {
  signIn,
  signInMfa,
  signUp,
  signOut,
  refreshAccessToken,
  updatePassword,
  requestResetPassword,
  resetPassword,
  enableMfa,
  verifyMfa,
  disableMfa,
  refreshMfaCode,
}

export default authService
