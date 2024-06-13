const CATEGORY_LIST = '/categories/list'
const categoryDetails = (id: number) => `/categories/${id}` 
const NEW_CATEGORY = '/categories/new'

const PRODUCT_LIST = '/products/list'
const NEW_PRODUCT = '/products/new'
const productDetails = (id: string) => `/products/${id}`

const productItemListPage = (productId: string) => `/products/${productId}/items/list`
const newProductItemPage = (productId: string) => `/products/${productId}/items/new`

const LOGIN_PAGE = '/auth/signin'
const REGISTER_PAGE = '/register'

// ESlint rule prefers named exports over anonymous default exports
const paths = {
    CATEGORY_LIST,
    categoryDetails,
    NEW_CATEGORY,
    PRODUCT_LIST,
    NEW_PRODUCT,
    productDetails,
    productItemListPage,
    newProductItemPage,
    LOGIN_PAGE,
    REGISTER_PAGE
}
export default paths