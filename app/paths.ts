const CATEGORY_LIST = '/categories/list'
const categoryDetails = (id: number) => `/categories/${id}` 
const NEW_CATEGORY = '/categories/new'

const PRODUCT_LIST = '/products/list'
const NEW_PRODUCT = '/products/new'

const LOGIN_PAGE = '/auth/signin'
const REGISTER_PAGE = '/register'

// ESlint rule prefers named exports over anonymous default exports
const routes = {
    CATEGORY_LIST,
    categoryDetails,
    NEW_CATEGORY,
    PRODUCT_LIST,
    NEW_PRODUCT,
    LOGIN_PAGE,
    REGISTER_PAGE
}
export default routes