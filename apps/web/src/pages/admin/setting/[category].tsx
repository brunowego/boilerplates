import {
  useMantineTheme,
  AppShell,
  Box,
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AdminSettingInput from '../../../components/admin/configuration/AdminSettingInput'
import ConfigurationHeader from '../../../components/admin/configuration/ConfigurationHeader'
import ConfigurationNavBar from '../../../components/admin/configuration/ConfigurationNavBar'
import LogoConfigInput from '../../../components/admin/configuration/LogoConfigInput'
import TestEmailButton from '../../../components/admin/configuration/TestEmailButton'
import CenterLoader from '../../../components/core/CenterLoader'
import Meta from '../../../components/Meta'
import useSetting from '../../../hooks/setting.hook'
import settingService from '../../../services/setting.service'
import { AdminSetting, UpdateSetting } from '../../../types/setting.type'
import { capitalizeFirstLetter, settingVariableToFriendlyName } from '../../../utils/string.util'
import toast from '../../../utils/toast.util'

export default function AppShellDemo() {
  const theme = useMantineTheme()
  const router = useRouter()

  const [isMobileNavBarOpened, setIsMobileNavBarOpened] = useState(false)
  const isMobile = useMediaQuery('(max-width: 560px)')
  const setting = useSetting()

  const categoryId = (router.query.category as string | undefined) ?? 'general'

  const [settingVariables, setSettingVariables] = useState<AdminSetting[]>()
  const [updatedSettingVariables, setUpdatedSettingVariables] = useState<UpdateSetting[]>([])

  const [logo, setLogo] = useState<File | null>(null)

  const saveSettingVariables = async () => {
    if (logo) {
      settingService
        .changeLogo(logo)
        .then(() => {
          setLogo(null)
          toast.success(
            'Logo updated successfully. It may take a few minutes to update on the website.'
          )
        })
        .catch(toast.axiosError)
    }

    if (updatedSettingVariables.length > 0) {
      await settingService
        .updateMany(updatedSettingVariables)
        .then(() => {
          setUpdatedSettingVariables([])
          toast.success('Configurations updated successfully')
        })
        .catch(toast.axiosError)

      void setting.refresh()
    }
  }

  const updateSettingVariable = (settingVariable: UpdateSetting) => {
    const index = updatedSettingVariables.findIndex((item) => item.key === settingVariable.key)

    if (index > -1) {
      updatedSettingVariables[index] = {
        ...updatedSettingVariables[index],
        ...settingVariable,
      }
    } else {
      setUpdatedSettingVariables([...updatedSettingVariables, settingVariable])
    }
  }

  useEffect(() => {
    settingService.getByCategory(categoryId).then((settingVariables) => {
      setSettingVariables(settingVariables)
    })
  }, [categoryId])

  return (
    <>
      <Meta title="Configuration" />

      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbar={
          <ConfigurationNavBar
            categoryId={categoryId}
            isMobileNavBarOpened={isMobileNavBarOpened}
            setIsMobileNavBarOpened={setIsMobileNavBarOpened}
          />
        }
        header={
          <ConfigurationHeader
            isMobileNavBarOpened={isMobileNavBarOpened}
            setIsMobileNavBarOpened={setIsMobileNavBarOpened}
          />
        }
      >
        <Container size="lg">
          {!settingVariables ? (
            <CenterLoader />
          ) : (
            <>
              <Stack>
                <Title mb="md" order={3}>
                  {capitalizeFirstLetter(categoryId)}
                </Title>

                {settingVariables.map((settingVariable, idx) => (
                  <Group key={idx} position="apart">
                    <Stack style={{ maxWidth: isMobile ? '100%' : '40%' }} spacing={0}>
                      <Title order={6}>{settingVariableToFriendlyName(settingVariable.name)}</Title>

                      {settingVariable.description.split('\n').length == 1 ? (
                        <Text color="dimmed" size="sm" mb="xs">
                          {settingVariable.description}
                        </Text>
                      ) : (
                        settingVariable.description.split('\n').map((line, idx) => (
                          <Text
                            key={idx}
                            color="dimmed"
                            size="sm"
                            style={{
                              marginBottom: line === '' ? '1rem' : '0',
                            }}
                          >
                            {line}
                          </Text>
                        ))
                      )}
                    </Stack>

                    <Stack></Stack>

                    <Box style={{ width: isMobile ? '100%' : '50%' }}>
                      <AdminSettingInput
                        key={idx}
                        settingVariable={settingVariable}
                        updateSettingVariable={updateSettingVariable}
                      />
                    </Box>
                  </Group>
                ))}

                {categoryId == 'general' && <LogoConfigInput logo={logo} setLogo={setLogo} />}
              </Stack>

              <Group mt="lg" position="right">
                {categoryId == 'smtp' && (
                  <TestEmailButton
                    settingVariablesChanged={updatedSettingVariables.length != 0}
                    saveSettingVariables={saveSettingVariables}
                  />
                )}

                <Button onClick={saveSettingVariables}>Save</Button>
              </Group>
            </>
          )}
        </Container>
      </AppShell>
    </>
  )
}
