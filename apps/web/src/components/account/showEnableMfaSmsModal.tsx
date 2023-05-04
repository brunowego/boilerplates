import { Button, Center, Col, Grid, Image, Stack, Text, TextInput, Tooltip } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { useModals } from '@mantine/modals'
import { ModalsContextProps } from '@mantine/modals/lib/context'
import * as yup from 'yup'
import authService from '../../services/auth.service'
import toast from '../../utils/toast.util'

const showEnableMfaSmsModal = (
  modals: ModalsContextProps,
  refreshUser: () => {},
  options: {
    password: string
    phoneEnding: string
  }
) => {
  return modals.openModal({
    title: 'Enable MFA',
    children: <CreateEnableMfaSmsModal options={options} refreshUser={refreshUser} />,
  })
}

const CreateEnableMfaSmsModal = ({
  options,
  refreshUser,
}: {
  options: {
    password: string
    phoneEnding: string
  }

  refreshUser: () => {}
}) => {
  const modals = useModals()

  const validationSchema = yup.object().shape({
    code: yup
      .string()
      .min(6)
      .max(6)
      .required()
      .matches(/^[0-9]+$/, { message: 'Code must be a number' }),
  })

  const form = useForm({
    initialValues: {
      code: '',
    },
    validate: yupResolver(validationSchema),
  })

  return (
    <div>
      <Center>
        <Stack>
          <Text>
            We send a code to the phone that ends with <strong>{options.phoneEnding}</strong>.
          </Text>

          <form
            onSubmit={form.onSubmit((values) => {
              authService
                .verifyMfa(values.code, options.password)
                .then(() => {
                  toast.success('Successfully enabled MFA')
                  modals.closeAll()
                  refreshUser()
                })
                .catch(toast.axiosError)
            })}
          >
            <Grid align="flex-end">
              <Col xs={9}>
                <TextInput
                  variant="filled"
                  label="SMS code"
                  placeholder="•••••••"
                  {...form.getInputProps('code')}
                />
              </Col>

              <Col xs={3}>
                <Button variant="outline" type="submit">
                  Verify
                </Button>
              </Col>
            </Grid>
          </form>
        </Stack>
      </Center>
    </div>
  )
}

export default showEnableMfaSmsModal
