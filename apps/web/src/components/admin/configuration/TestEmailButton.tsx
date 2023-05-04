import { Button, Stack, Text, Textarea } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { useState } from 'react'
import useUser from '../../../hooks/user.hook'
import settingService from '../../../services/setting.service'
import toast from '../../../utils/toast.util'

const TestEmailButton = ({
  settingVariablesChanged,
  saveSettingVariables,
}: {
  settingVariablesChanged: boolean
  saveSettingVariables: () => Promise<void>
}) => {
  const { user } = useUser()
  const modals = useModals()

  const [isLoading, setIsLoading] = useState(false)

  const sendTestEmail = async () => {
    await settingService
      .sendTestEmail(user!.email)
      .then(() => toast.success('Email sent successfully'))
      .catch((e) =>
        modals.openModal({
          title: 'Failed to send email',
          children: (
            <Stack spacing="xs">
              <Text size="sm">While sending the test email, the following error occurred:</Text>
              <Textarea minRows={4} readOnly value={e.response.data.message} />
            </Stack>
          ),
        })
      )
  }

  return (
    <Button
      loading={isLoading}
      variant="light"
      onClick={async () => {
        if (!settingVariablesChanged) {
          setIsLoading(true)
          await sendTestEmail()
          setIsLoading(false)
        } else {
          modals.openConfirmModal({
            title: 'Save settinguration',
            children: (
              <Text size="sm">
                To continue you need to save the settinguration first. Do you want to save the
                settinguration and send the test email?
              </Text>
            ),
            labels: { confirm: 'Save and send', cancel: 'Cancel' },
            onConfirm: async () => {
              setIsLoading(true)
              await saveSettingVariables()
              await sendTestEmail()
              setIsLoading(false)
            },
          })
        }
      }}
    >
      Send test email
    </Button>
  )
}
export default TestEmailButton
