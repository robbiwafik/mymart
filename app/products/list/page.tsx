import SearchBox from '@/app/components/SearchBox'
import prisma from '@/prisma/client'
import { Flex } from '@radix-ui/themes'
import PopoverCategoryFilter from './PopoverCategoryFilter'
import ProductTable from './ProductTable'

interface Props {
    searchParams: {
        search: string,
        page: string,
        filter: string
    }
}

export default async function ProductListPage({ searchParams }: Props) {
    const pageSize = 10
    const currentPage = parseInt(searchParams.page) || 1
    
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchParams.search
            },
            category: {
                name: searchParams.filter
            }
        },
        include: {
            category: true
        }
    })

    return (
        <Flex direction='column' gap='4'>
            <Flex gap='4'>
                <PopoverCategoryFilter />
                <SearchBox placeholder='Search product...' />
            </Flex>
            <ProductTable 
                products={products} 
                currentPage={currentPage}
                pageSize={pageSize}
            />  
        </Flex>
    )
}