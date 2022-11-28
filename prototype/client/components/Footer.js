import {
    Button,
    ButtonGroup,
    Container,
    Divider,
    IconButton,
    Input,
    Stack,
    Text,
  } from '@chakra-ui/react'
import * as React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export const Footer = () => (
  <Container as="footer" role="contentinfo" w="full" bg="gray.50" maxW="full">
    <Stack
      spacing="8"
      direction={{
        base: 'column',
        md: 'row',
      }}
      justify="space-between"
      py={{
        base: '12',
        md: '16',
      }}
    >
      <Stack
        spacing={{
          base: '6',
          md: '8',
        }}
        align="start"
      >
        <Text color="muted">Share the passion you have.</Text>
      </Stack>
      <Stack
        direction={{
          base: 'column-reverse',
          md: 'column',
          lg: 'row',
        }}
        spacing={{
          base: '12',
          md: '8',
        }}
      >
        <Stack direction="row" spacing="8">
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Product
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <Button variant="link">How it works</Button>
              <Button variant="link">Pricing</Button>
              <Button variant="link">Use Cases</Button>
            </Stack>
          </Stack>
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Legal
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <Button variant="link">Privacy</Button>
              <Button variant="link">Terms</Button>
              <Button variant="link">License</Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing="4">
          <Text fontSize="sm" fontWeight="semibold" color="subtle">
            Stay up to date
          </Text>
          <Stack
            spacing="4"
            direction={{
              base: 'column',
              sm: 'row',
            }}
            maxW={{
              lg: '360px',
            }}
          >
            <Input placeholder="Enter your email" type="email" required />
            <Button variant="primary" type="submit" flexShrink={0}>
              Subscribe
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
    <Divider />
    <Stack
      pt="8"
      pb="12"
      justify="space-between"
      direction={{
        base: 'column-reverse',
        md: 'row',
      }}
      align="center"
    >
    </Stack>
  </Container>
)