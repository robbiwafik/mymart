import SearchBox from '@/app/components/SearchBox'
import paths from '@/app/paths'
import prisma from '@/prisma/client'
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import PopoverCategoryFilter from './PopoverCategoryFilter'
import nextDynamic from 'next/dynamic' // nextDynamic -> dynamic (conflict names)
const ProductTable = nextDynamic(() => import('./ProductTable'), { ssr: false })

interface Props {
    searchParams: {
        search: string,
        page: string,
        filter: string
    }
}

export default async function ProductListPage({ searchParams }: Props) {
    const pageSize = 10
    let currentPage = parseInt(searchParams.page) || 1

    let filterQueryParams
    if (searchParams.filter && !isNaN(parseInt(searchParams.filter))) {
        filterQueryParams = parseInt(searchParams.filter)
        currentPage = 1
    }
    
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchParams.search
            },
            category: {
                id: filterQueryParams
            }
        },
        include: {
            category: true
        },
        orderBy: {
            updatedAt: 'desc'
        }
    })

    return (
        <Flex direction='column' gap='4'>
            <Flex gap='4'>
                <PopoverCategoryFilter />
                <SearchBox placeholder='Search product...' />
                <Button>
                    <Link href={paths.NEW_PRODUCT}>New product</Link>
                </Button>
            </Flex>
            <ProductTable 
                products={products} 
                currentPage={currentPage}
                pageSize={pageSize}
            />  
        </Flex>
    )
}

export const dynamic = 'force-dynamic'