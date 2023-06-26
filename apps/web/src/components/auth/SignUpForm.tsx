import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import useSetting from '../../hooks/setting.hook'
import useUser from '../../hooks/user.hook'
import authService from '../../services/auth.service'
import toast from '../../utils/toast.util'
import { Trans } from '@lingui/macro'

const SignUpForm = () => {
  const setting = useSetting()
  const router = useRouter()
  const { refreshUser } = useUser()

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().min(3).required(),
    password: yup.string().min(8).required(),
  })

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validate: yupResolver(validationSchema),
  })

  const signUp = async (email: string, username: string, password: string) => {
    await authService
      .signUp(email, username, password)
      .then(async () => {
        const user = await refreshUser()

        if (user?.isAdmin) {
          router.replace('/admin/intro')
        } else {
          router.replace('/upload')
        }
      })
      .catch(toast.axiosError)
  }

  return (
    <Container size={420} my={40}>
      <Title order={2} align="center" weight={900}>
        <Trans>Sign up</Trans>
      </Title>

      {setting.get('share.allowRegistration') && (
        <Text color="dimmed" size="sm" align="center" mt={5}>
          <Trans>You have an account already?</Trans>{' '}
          <Anchor component={Link} href={'signin'} size="sm">
            <Trans>Sign in</Trans>
          </Anchor>
        </Text>
      )}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit((values) =>
            signUp(values.email, values.username, values.password)
          )}
        >
          <TextInput
            label="Username"
            placeholder="Your username"
            {...form.getInputProps('username')}
          />

          <TextInput
            label="Email"
            placeholder="Your email"
            mt="md"
            {...form.getInputProps('email')}
          />

          <PasswordInput
            label="Password"
            placeholder="•••••••"
            mt="md"
            {...form.getInputProps('password')}
          />

          <Button fullWidth mt="xl" type="submit">
            Let's get started
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default SignUpForm
