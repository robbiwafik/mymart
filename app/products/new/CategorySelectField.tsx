'use client'

import { SelectField } from '@/app/components'
import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface Props {
    error?: string
    defaultValue?: number
    onChange: (value: any) => void
}

export default function CategorySelectField({ error, defaultValue, onChange }: Props) {
    const { data: categories, isLoading } = useQuery({
        queryKey: ['product-categories'],
        queryFn: () => axios.get<Category[]>('/api/categories')
                        .then(res => res.data),
        staleTime: 60 * 1000 //60s
    })
    
    const categoryOptions = categories?.map(category => ({
        value: category.id,
        label: category.name
    }))
    
    return (
        <SelectField 
            defaultValue={defaultValue}
            error={error}
            label='Category'
            loading={isLoading}
            onChange={onChange}
            options={categoryOptions || []}
            placeholder='Select category'
        />
    )
}