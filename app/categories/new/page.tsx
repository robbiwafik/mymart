import { PageTitle } from '@/app/components'
import { Flex } from '@radix-ui/themes'
import CategoryForm from '../_components/CategoryForm'

export default function NewCategoryPage() {
    return (
        <Flex direction='column' gap='5'>
            <PageTitle value={'New Category'} />
            <CategoryForm />
        </Flex>
    )
}