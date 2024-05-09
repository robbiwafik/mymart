import { Box, Button, Card, Flex, Skeleton, Text, TextField } from '@radix-ui/themes'
import _ from 'lodash'

export default function LoadingCategoryDetails() {
    const data = _.range(1, 5)

    return (
        <Box maxWidth='800px'>
            <Skeleton width='300px'>
                <Text as='p' mb='5' size='6'>
                    Category Details Page
                </Text>
            </Skeleton>
            <Card className='!px-8 !py-5'>
                {data.map(number => (
                    <Flex key={number} direction='column' gap='2'mb='4'>
                        <Skeleton width='100px' />
                        <Skeleton width='500px'>
                            <TextField.Root />
                        </Skeleton>
                    </Flex>
                ))}
                <Flex justify={'between'}>
                    <Skeleton>
                        <Button>Delete</Button>
                    </Skeleton>
                    <Flex gap='4' justify='end'>
                        <Skeleton>
                            <Button >
                                Go Back
                            </Button>
                        </Skeleton>
                        <Skeleton>
                            <Button>
                                Submit
                            </Button>
                        </Skeleton>
                    </Flex>
                </Flex>
            </Card>
        </Box>
    )
}