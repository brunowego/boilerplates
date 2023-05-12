import {
  Box,
  Button,
  createStyles,
  Group,
  MediaQuery,
  Navbar,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { TbAt, TbMail, TbShare, TbSquare } from 'react-icons/tb'

const categories = [
  { name: 'General', icon: <TbSquare /> },
  { name: 'Email', icon: <TbMail /> },
  { name: 'Share', icon: <TbShare /> },
  { name: 'SMTP', icon: <TbAt /> },
]

const useStyles = createStyles((theme) => ({
  activeLink: {
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,

    borderRadius: theme.radius.sm,
    fontWeight: 600,
  },
}))

const ConfigurationNavBar = ({
  categoryId,
  isMobileNavBarOpened,
  setIsMobileNavBarOpened,
}: {
  categoryId: string
  isMobileNavBarOpened: boolean
  setIsMobileNavBarOpened: Dispatch<SetStateAction<boolean>>
}) => {
  const { classes } = useStyles()
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!isMobileNavBarOpened}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section>
        <Text size="xs" color="dimmed" mb="sm">
          Configuration
        </Text>
        <Stack spacing="xs">
          {categories.map((category) => (
            <Box
              p="xs"
              component={Link}
              onClick={() => setIsMobileNavBarOpened(false)}
              className={categoryId == category.name.toLowerCase() ? classes.activeLink : undefined}
              key={category.name}
              href={`/admin/setting/${category.name.toLowerCase()}`}
            >
              <Group>
                <ThemeIcon variant={categoryId == category.name.toLowerCase() ? 'filled' : 'light'}>
                  {category.icon}
                </ThemeIcon>
                <Text size="sm">{category.name}</Text>
              </Group>
            </Box>
          ))}
        </Stack>
      </Navbar.Section>
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Button mt="xl" variant="light" component={Link} href="/admin">
          Go back
        </Button>
      </MediaQuery>
    </Navbar>
  )
}

export default ConfigurationNavBar
