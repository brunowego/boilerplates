import { NumberInput, PasswordInput, Stack, Switch, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { AdminSetting, UpdateSetting } from '../../../types/setting.type'

const AdminSettingInput = ({
  settingVariable,
  updateSettingVariable,
}: {
  settingVariable: AdminSetting
  updateSettingVariable: (variable: UpdateSetting) => void
}) => {
  const form = useForm({
    initialValues: {
      stringValue: settingVariable.value ?? settingVariable.defaultValue,
      textValue: settingVariable.value ?? settingVariable.defaultValue,
      numberValue: parseInt(settingVariable.value ?? settingVariable.defaultValue),
      booleanValue: (settingVariable.value ?? settingVariable.defaultValue) == 'true',
    },
  })

  const onValueChange = (settingVariable: AdminSetting, value: any) => {
    form.setFieldValue(`${settingVariable.type}Value`, value)
    updateSettingVariable({ key: settingVariable.key, value: value })
  }

  return (
    <Stack align="end">
      {settingVariable.type == 'string' &&
        (settingVariable.obscured ? (
          <PasswordInput
            style={{
              width: '100%',
            }}
            {...form.getInputProps('stringValue')}
            onChange={(e) => onValueChange(settingVariable, e.target.value)}
          />
        ) : (
          <TextInput
            style={{
              width: '100%',
            }}
            {...form.getInputProps('stringValue')}
            placeholder={settingVariable.defaultValue}
            onChange={(e) => onValueChange(settingVariable, e.target.value)}
          />
        ))}

      {settingVariable.type == 'text' && (
        <Textarea
          style={{
            width: '100%',
          }}
          autosize
          {...form.getInputProps('textValue')}
          placeholder={settingVariable.defaultValue}
          onChange={(e) => onValueChange(settingVariable, e.target.value)}
        />
      )}
      {settingVariable.type == 'number' && (
        <NumberInput
          {...form.getInputProps('numberValue')}
          placeholder={settingVariable.defaultValue}
          onChange={(number) => onValueChange(settingVariable, number)}
        />
      )}
      {settingVariable.type == 'boolean' && (
        <>
          <Switch
            {...form.getInputProps('booleanValue', { type: 'checkbox' })}
            onChange={(e) => onValueChange(settingVariable, e.target.checked)}
          />
        </>
      )}
    </Stack>
  )
}

export default AdminSettingInput
