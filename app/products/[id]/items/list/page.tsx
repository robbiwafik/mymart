import { GoBackButton, PageTitle, Pagination, SearchBox } from '@/app/components'
import paths from '@/app/paths'
import prisma from '@/prisma/client'
import { ProductItemStatus } from '@prisma/client'
import { Flex } from '@radix-ui/themes'
import _ from 'lodash'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import PopoverStatusFilter from './PopoverStatusFilter'
import { ProductItemSortingField } from './ProductItemTable'
const ProductItemTable = dynamic(() => import('./ProductItemTable'), { ssr: false })

interface Props {
	params: { id: string }
	searchParams: { 
		page: string
		search: string 
		sort: string
		status: string
	}
}

export default async function ProductItemListPage({ params, searchParams }: Props ) {
	const product = await prisma.product.findUnique({
		where: { id: params.id }
	})
	if (!product) 
		notFound()

	const validSortingFields: ProductItemSortingField[] = ['createdAt', 'updatedAt']
	const sortingField: ProductItemSortingField = validSortingFields.includes(searchParams.sort as ProductItemSortingField) 
		? searchParams.sort as ProductItemSortingField
		: 'updatedAt'

	const status = Object.values(ProductItemStatus).includes(searchParams.status as ProductItemStatus) 
		? searchParams.status as ProductItemStatus 
		: undefined

	const productItems = await prisma.productItem.findMany({
		where: {
			productId: product.id,
			id: { contains: searchParams.search },
			status
		},
		orderBy: { [sortingField]: 'desc' }
	})

	const currentPage = parseInt(searchParams.page, 10) || 1
	const pageSize = 10
	const start = (currentPage - 1) * pageSize
	const end = currentPage * pageSize
	const paginatedProductItems = _.slice(productItems, start, end)

	return (
		<Flex direction='column' gap='4'>
			<PageTitle value={product.name} />
			<Flex gap='2'>
				<PopoverStatusFilter />
				<SearchBox placeholder='Search product item...' />
			</Flex>
			<ProductItemTable 
				productItems={paginatedProductItems} 
				startNumber={start}
				sortedBy={sortingField}
			/>
			<Flex justify='between'>
				<GoBackButton href={paths.productDetails(product.id)} />
				<Pagination
					currentPage={currentPage}
					itemCount={productItems.length}
					pageSize={pageSize}
				/>
			</Flex>
		</Flex>
	)
}