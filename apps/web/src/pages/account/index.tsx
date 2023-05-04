import {
  Button,
  // Center,
  Container,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Tabs,
  // Text,
  TextInput,
  Title,
  Select,
  Input,
} from '@mantine/core'

import { useForm, yupResolver } from '@mantine/form'
import { useModals } from '@mantine/modals'
import { Tb2Fa } from 'react-icons/tb'
import * as yup from 'yup'
import showEnableMfaTotpModal from '../../components/account/showEnableMfaTotpModal'
import showEnableMfaSmsModal from '../../components/account/showEnableMfaSmsModal'
// import ThemeSwitcher from '../../components/account/ThemeSwitcher'
import Meta from '../../components/Meta'
import useUser from '../../hooks/user.hook'
import authService from '../../services/auth.service'
import userService from '../../services/user.service'
import toast from '../../utils/toast.util'
import { IMaskInput } from 'react-imask'

const Account = () => {
  const { user, refreshUser } = useUser()
  const modals = useModals()

  const accountForm = useForm({
    initialValues: {
      username: user?.username,
      email: user?.email,
    },
    validate: yupResolver(
      yup.object().shape({
        email: yup.string().email(),
        username: yup.string().min(3),
      })
    ),
  })

  const passwordForm = useForm({
    initialValues: {
      oldPassword: '',
      password: '',
    },
    validate: yupResolver(
      yup.object().shape({
        oldPassword: yup.string().min(8),
        password: yup.string().min(8),
      })
    ),
  })

  const enableMfaForm = useForm({
    initialValues: {
      mfaMethod: '',
      mfaPhone: '',
      password: '',
    },
    validate: yupResolver(
      yup.object().shape({
        mfaMethod: yup.string().oneOf(['TOTP', 'SMS', 'EMAIL']),
        // mfaPhone: yup.string().required(),
        mfaPhone: yup.string(),
        password: yup.string().min(8),
      })
    ),
  })

  const disableTotpForm = useForm({
    initialValues: {
      password: '',
      code: '',
    },
    validate: yupResolver(
      yup.object().shape({
        password: yup.string().min(8),
        code: yup
          .string()
          .min(6)
          .max(6)
          .matches(/^[0-9]+$/, { message: 'Code must be a number' }),
      })
    ),
  })

  return (
    <>
      <Meta title="My account" />

      <Container size="sm">
        <Title order={3} mb="xs">
          My account
        </Title>

        <Paper withBorder p="xl">
          <Title order={5} mb="xs">
            Account Info
          </Title>

          <form
            onSubmit={accountForm.onSubmit((values) =>
              userService
                .updateCurrentUser({
                  username: values.username,
                  email: values.email,
                })
                .then(() => toast.success('User updated successfully'))
                .catch(toast.axiosError)
            )}
          >
            <Stack>
              <TextInput label="Username" {...accountForm.getInputProps('username')} />
              <TextInput label="Email" {...accountForm.getInputProps('email')} />

              <Group position="right">
                <Button type="submit">Save</Button>
              </Group>
            </Stack>
          </form>
        </Paper>

        <Paper withBorder p="xl" mt="lg">
          <Title order={5} mb="xs">
            Password
          </Title>

          <form
            onSubmit={passwordForm.onSubmit((values) =>
              authService
                .updatePassword(values.oldPassword, values.password)
                .then(() => {
                  toast.success('Password updated successfully')

                  passwordForm.reset()
                })
                .catch(toast.axiosError)
            )}
          >
            <Stack>
              <PasswordInput
                label="Old password"
                placeholder="•••••••"
                {...passwordForm.getInputProps('oldPassword')}
              />
              <PasswordInput
                label="New password"
                placeholder="•••••••"
                {...passwordForm.getInputProps('password')}
              />

              <Group position="right">
                <Button type="submit">Save</Button>
              </Group>
            </Stack>
          </form>
        </Paper>

        <Paper withBorder p="xl" mt="lg">
          <Title order={5} mb="xs">
            Security
          </Title>

          <Tabs defaultValue="mfa">
            <Tabs.List>
              <Tabs.Tab value="mfa" icon={<Tb2Fa size={14} />}>
                MFA
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="mfa" pt="xs">
              {user!.mfaVerified ? (
                <>
                  <form
                    onSubmit={disableTotpForm.onSubmit((values) => {
                      authService
                        .disableMfa(values.code, values.password)
                        .then(() => {
                          toast.success('Successfully disabled MFA')

                          values.password = ''
                          values.code = ''

                          refreshUser()
                        })
                        .catch(toast.axiosError)
                    })}
                  >
                    <Stack>
                      <PasswordInput
                        description="Enter your current password to disable MFA."
                        label="Password"
                        placeholder="•••••••"
                        {...disableTotpForm.getInputProps('password')}
                      />

                      <TextInput
                        variant="filled"
                        label="Code"
                        placeholder="•••••••"
                        {...disableTotpForm.getInputProps('code')}
                      />

                      <Group position="right">
                        {user!.mfaMethod !== 'TOTP' && (
                          <Button
                            onClick={() =>
                              authService
                                .refreshMfaCode()
                                .then(() =>
                                  toast.success('We send a code to the phone that ends with 0000')
                                )
                                .catch(toast.axiosError)
                            }
                          >
                            Send SMS code
                          </Button>
                        )}

                        <Button color="red" type="submit">
                          Disable
                        </Button>
                      </Group>
                    </Stack>
                  </form>
                </>
              ) : (
                <>
                  <form
                    onSubmit={enableMfaForm.onSubmit((values) => {
                      authService
                        .enableMfa(values.mfaMethod, values.password, values.mfaPhone)
                        .then((result) => {
                          if (values.mfaMethod === 'TOTP') {
                            showEnableMfaTotpModal(modals, refreshUser, {
                              qrCode: result?.qrCode,
                              secret: result?.mfaSecret,
                              password: values.password,
                            })
                          }

                          if (values.mfaMethod === 'SMS') {
                            showEnableMfaSmsModal(modals, refreshUser, {
                              phoneEnding: values.mfaPhone.slice(-4),
                              password: values.password,
                            })
                          }

                          values.password = ''
                        })
                        .catch(toast.axiosError)
                    })}
                  >
                    <Stack>
                      <Select
                        label="MFA Method"
                        placeholder="Pick one"
                        data={[
                          { value: 'TOTP', label: 'Authenticator App' },
                          { value: 'SMS', label: 'SMS' },
                          // { value: 'EMAIL', label: 'Email' },
                        ]}
                        {...enableMfaForm.getInputProps('mfaMethod')}
                      />

                      {enableMfaForm.values.mfaMethod === 'SMS' && (
                        <Input.Wrapper
                          label="Phone"
                          description="You will receive a verification code via SMS."
                        >
                          <Input<any>
                            component={IMaskInput}
                            mask="+55 (00) 00000-0000"
                            {...enableMfaForm.getInputProps('mfaPhone')}
                          />
                        </Input.Wrapper>
                      )}

                      <PasswordInput
                        label="Password"
                        description="Enter your current password to start enabling MFA."
                        placeholder="•••••••"
                        {...enableMfaForm.getInputProps('password')}
                      />

                      <Group position="right">
                        <Button type="submit">Start</Button>
                      </Group>
                    </Stack>
                  </form>
                </>
              )}
            </Tabs.Panel>
          </Tabs>
        </Paper>

        {/* <Paper withBorder p="xl" mt="lg">
          <Title order={5} mb="xs">
            Color scheme
          </Title>

          <ThemeSwitcher />
        </Paper> */}

        {/* <Center mt={80} mb="lg">
          <Stack>
            <Button
              variant="light"
              color="red"
              onClick={() =>
                modals.openConfirmModal({
                  title: 'Account deletion',
                  children: (
                    <Text size="sm">
                      Do you really want to delete your account including all your active shares?
                    </Text>
                  ),
                  labels: { confirm: 'Delete', cancel: 'Cancel' },
                  confirmProps: { color: 'red' },
                  onConfirm: async () => {
                    await userService.removeCurrentUser()
                    window.location.reload()
                  },
                })
              }
            >
              Delete Account
            </Button>
          </Stack>
        </Center> */}
      </Container>
    </>
  )
}

export default Account
