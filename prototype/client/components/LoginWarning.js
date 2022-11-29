import { Alert, AlertIcon, AlertTitle, AlertDescription, Center, Card } from "@chakra-ui/react";

export default function LoginWarning() {
    return (
        <Center>
            <Card maxW='md' bg="gray.50" mt="10" mb={5} border="1px" borderRadius={1}>
                <Alert
                  status='info'
                  variant='subtle'
                  flexDirection='column'
                  alignItems='center'
                  justifyContent='center'
                  textAlign='center'
                  p={10}
                >
                  <AlertIcon boxSize='40px' mr={0} />
                  <AlertTitle mt={4} mb={1} fontSize='lg'>
                    Please log in first!
                  </AlertTitle>
                  <AlertDescription maxWidth='sm'>
                    You can have access to this page once you logged in.
                  </AlertDescription>
                </Alert>
            </Card>
        </Center>
    )
}