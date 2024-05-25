'use client'

import PopoverFilter from '@/app/components/PopoverFilter'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import _ from 'lodash'

export default function PopoverCategoryFilter() {
    const { data: categories } = useQuery({
        queryKey: ['product-categories'],
        queryFn: () => axios.get('/api/categories').then(res => res.data),
        staleTime: 60 * 1000 // 60s
    })
    const categoryNames = _.map(categories, 'name')
    
    return (
        <PopoverFilter data={categoryNames} placeholder='Filter by category' />
    )
}