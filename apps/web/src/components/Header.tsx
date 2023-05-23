import {
  createStyles,
  Box,
  Header as MantineHeader,
  Container,
  Group,
  Burger,
  Transition,
  Text,
  Paper,
  Stack,
} from '@mantine/core'

import { ReactNode, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDisclosure } from '@mantine/hooks'
import Logo from './Logo'
import Link from 'next/link'

const HEADER_HEIGHT = 60

type NavLink = {
  link?: string
  label?: string
  component?: ReactNode
  action?: () => Promise<void>
}

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}))

const Header = () => {
  const router = useRouter()
  const [opened, toggleOpened] = useDisclosure(false)
  const [currentRoute, setCurrentRoute] = useState('')

  useEffect(() => {
    setCurrentRoute(router.pathname)
  }, [router.pathname])

  let links: NavLink[] = [
    {
      link: '/',
      label: 'Home',
    },
  ]

  const { classes, cx } = useStyles()

  const items = (
    <>
      {links.map((link, i) => {
        if (link.component) {
          return (
            <Box pl={5} py={15} key={i}>
              {link.component}
            </Box>
          )
        }

        return (
          <Link
            key={link.label}
            href={link.link ?? ''}
            onClick={() => toggleOpened.toggle()}
            className={cx(classes.link, {
              [classes.linkActive]: currentRoute == link.link,
            })}
          >
            {link.label}
          </Link>
        )
      })}
    </>
  )

  return (
    <MantineHeader height={HEADER_HEIGHT} mb={40} className={classes.root}>
      <Container className={classes.header}>
        <Link href="/" passHref>
          <Group>
            <Logo height={40} width={40} />
            <Text weight={600}>ACME</Text>
          </Group>
        </Link>

        <Group spacing={5} className={classes.links}>
          <Group>{items}</Group>
        </Group>

        <Burger
          opened={opened}
          onClick={() => toggleOpened.toggle()}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              <Stack spacing={0}> {items}</Stack>
            </Paper>
          )}
        </Transition>
      </Container>
    </MantineHeader>
  )
}

export default Header
