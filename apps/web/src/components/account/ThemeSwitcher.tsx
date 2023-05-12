import {
  Box,
  Center,
  ColorScheme,
  SegmentedControl,
  Stack,
  useMantineColorScheme,
} from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { useState } from 'react'
import { TbDeviceLaptop, TbMoon, TbSun } from 'react-icons/tb'
import usePreferences from '../../hooks/usePreferences'

const ThemeSwitcher = () => {
  const preferences = usePreferences()
  const [colorScheme, setColorScheme] = useState(preferences.get('colorScheme'))
  const { toggleColorScheme } = useMantineColorScheme()
  const systemColorScheme = useColorScheme()
  return (
    <Stack>
      <SegmentedControl
        value={colorScheme}
        onChange={(value) => {
          preferences.set('colorScheme', value)
          setColorScheme(value)
          toggleColorScheme(value == 'system' ? systemColorScheme : (value as ColorScheme))
        }}
        data={[
          {
            label: (
              <Center>
                <TbMoon size={16} />
                <Box ml={10}>Dark</Box>
              </Center>
            ),
            value: 'dark',
          },
          {
            label: (
              <Center>
                <TbSun size={16} />
                <Box ml={10}>Light</Box>
              </Center>
            ),
            value: 'light',
          },
          {
            label: (
              <Center>
                <TbDeviceLaptop size={16} />
                <Box ml={10}>System</Box>
              </Center>
            ),
            value: 'system',
          },
        ]}
      />
    </Stack>
  )
}

export default ThemeSwitcher
