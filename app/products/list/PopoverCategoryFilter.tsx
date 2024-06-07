'use client'

import PopoverFilter, { Item } from '@/app/components/PopoverFilter'
import { Category } from '@prisma/client'
import { Skeleton } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import _ from 'lodash'

export default function PopoverCategoryFilter() {
    const { data: categories, isLoading } = useQuery<Category[]>({
        queryKey: ['product-categories'],
        queryFn: () => axios.get('/api/categories').then(res => res.data),
        staleTime: 180 * 1000 // 180s
    })

    const filterItems = categories?.map(category => ({ value: category.id.toString(), label: category.name }))
    
    return (
        <PopoverFilter 
            data={filterItems || []} 
            loading={isLoading} 
            placeholder='Filter by category' 
        />
    )
}