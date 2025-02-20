export const routes = {
  Overview: {
    dashboard:"/a-overview"
  },

  Invoices: {
    dashboard:"/b-invoices", //list
    create:"/b-invoices/create",
    edit: (id : string) => `/b-invoices/edit/${id}`,
    view: (id : string) => `/b-invoices/edit/${id}`,
  },

  Customers: {
    dashboard:"/c-customers",
    add:"/c-customers/add",
    details: (id : string) => `/c-customers/details/${id}`,
    inbox: "/c-customers/inbox"
  },

  Settings: {
    support: "/d-settings/support-and-helps",
    data: "/d-settings/data-controller",
    general: "/d-settings/general",
    account: "/d-settings/account-center"
  },

  Authentication: {

  },

  Profile : {
    profile: "/f-profile",
    
  },







  eCommerce: {
    dashboard: "/ecommerce",
    products: "/ecommerce/products",
    createProduct: "/ecommerce/products/create",
    productDetails: (slug: string) => `/ecommerce/products/${slug}`,
    ediProduct: (slug: string) => `/ecommerce/products/${slug}/edit`,
    categories: "/ecommerce/categories",
    createCategory: "/ecommerce/categories/create",
    editCategory: (id: string) => `/ecommerce/categories/${id}/edit`,
    orders: "/ecommerce/orders",
    createOrder: "/ecommerce/orders/create",
    orderDetails: (id: string) => `/ecommerce/orders/${id}`,
    editOrder: (id: string) => `/ecommerce/orders/${id}/edit`,
    reviews: "/ecommerce/reviews",
    shop: "/ecommerce/shop",
    cart: "/ecommerce/cart",
    checkout: "/ecommerce/checkout",
    trackingId: (id: string) => `/ecommerce/tracking/${id}`,
  },
};
