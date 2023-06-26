import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'

import { useForm, yupResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { TbInfoCircle } from 'react-icons/tb'
import * as yup from 'yup'
import useSetting from '../../hooks/setting.hook'
import useUser from '../../hooks/user.hook'
import authService from '../../services/auth.service'
import toast from '../../utils/toast.util'
import { t, Trans } from '@lingui/macro'

const SignInForm = ({ redirectPath }: { redirectPath: string }) => {
  const setting = useSetting()
  const router = useRouter()
  const { refreshUser } = useUser()

  const [showMfa, setShowMfa] = React.useState(false)
  const [loginToken, setLoginToken] = React.useState('')

  const validationSchema = yup.object().shape({
    emailOrUsername: yup.string().required(),
    password: yup.string().min(8).required(),
  })

  const form = useForm({
    initialValues: {
      emailOrUsername: '',
      password: '',
      code: '',
    },
    validate: yupResolver(validationSchema),
  })

  const signIn = async (email: string, password: string) => {
    await authService
      .signIn(email, password)
      .then(async (response) => {
        if (response.data['loginToken']) {
          setShowMfa(true)

          showNotification({
            icon: <TbInfoCircle />,
            color: 'blue',
            radius: 'md',
            title: 'Two-factor authentication required',
            message: 'Please enter your two-factor authentication code.',
          })

          setLoginToken(response.data['loginToken'])
        } else {
          await refreshUser()

          router.replace(redirectPath)
        }
      })
      .catch(toast.axiosError)
  }

  const signInMfa = (email: string, password: string, code: string) => {
    authService
      .signInMfa(email, password, code, loginToken)
      .then(async () => {
        await refreshUser()

        router.replace(redirectPath)
      })
      .catch((error) => {
        if (error?.response?.data?.error == 'share_password_required') {
          toast.axiosError(error)

          window.location.reload()
        }

        toast.axiosError(error)

        form.setValues({ code: '' })
      })
  }

  return (
    <Container size={420} my={40}>
      <Title order={2} align="center" weight={900}>
        <Trans>Welcome back</Trans>
      </Title>

      {setting.get('share.allowRegistration') && (
        <Text color="dimmed" size="sm" align="center" mt={5}>
          <Trans>You don't have an account yet?</Trans>{' '}
          <Anchor component={Link} href={'signup'} size="sm">
            {t`Sign up`}
          </Anchor>
        </Text>
      )}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit((values) => {
            if (showMfa) signInMfa(values.emailOrUsername, values.password, values.code)
            else signIn(values.emailOrUsername, values.password)
          })}
        >
          <TextInput
            label="Email or username"
            placeholder="Your email or username"
            {...form.getInputProps('emailOrUsername')}
          />

          <PasswordInput
            label="Password"
            placeholder="•••••••"
            mt="md"
            {...form.getInputProps('password')}
          />

          {showMfa && (
            <TextInput
              variant="filled"
              label="Two-factor code"
              mt="md"
              {...form.getInputProps('code')}
            />
          )}

          {setting.get('smtp.enabled') && (
            <Group position="right" mt="xs">
              <Anchor component={Link} href="/auth/reset-password" size="xs">
                Forgot password?
              </Anchor>
            </Group>
          )}

          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default SignInForm
