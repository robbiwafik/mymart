import { PageTitle } from '@/app/components'
import { Flex } from '@radix-ui/themes'
import ProductForm from '../_components/ProductForm'

export default function NewProductPage() {
    return (
        <Flex direction='column' gap='5'>
            <PageTitle value='New Product' />
            <ProductForm />
        </Flex>
    )
}