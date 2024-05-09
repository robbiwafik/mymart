import { Box, Button, Card, Flex, Skeleton, Text, TextField } from '@radix-ui/themes'

export default function LoadingNewCategoryPage() {
    return (
        <Box maxWidth='800px'>
            <Skeleton width='300px'>
                <Text as='p'mb='5'size='6'weight='medium'>
                    Add New Category
                </Text>
            </Skeleton>
            <Card className='!px-8 !py-5'>
                <Flex
                    direction='column' 
                    gap='2' 
                    maxWidth={'100%'} 
                    mb='4'
                >
                    <Skeleton width='100px'>
                        <Text size='2'></Text>
                    </Skeleton>
                    <Skeleton width='500px'>
                        <TextField.Root />
                    </Skeleton>
                </Flex>
                <Flex gap='4' justify='end'>
                    <Skeleton>
                        <Button>Go back</Button>
                    </Skeleton>
                    <Skeleton>
                        <Button>Submit</Button>
                    </Skeleton>
                </Flex>
            </Card>
        </Box>
    )
}