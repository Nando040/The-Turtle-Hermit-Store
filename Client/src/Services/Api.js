const BASE_URL = 'http://localhost:5000/api'


// PRODUCTS


export const getProducts = async () => {
    const response = await fetch(`${BASE_URL}/products`)
    return response.json()
}

export const getProductById = async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`)
    return response.json()
}

export const getProductsByCategory = async (category) => {
    const response = await fetch(`${BASE_URL}/products/category/${category}`)
    return response.json()
}


// USERS

export const registerUser = async (userData) => {
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
    return response.json()
}

export const loginUser = async (userData) => {
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
    return response.json()
}

export const getCurrentUser = async (token) => {
    const response = await fetch(`${BASE_URL}/users/current`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.json()
}

export const logoutUser = async (token) => {
    const response = await fetch(`${BASE_URL}/users/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.json()
}

// ORDERS


export const createOrder = async (orderData, token) => {
    const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
    })
    return response.json()
}

export const getUserOrders = async (token) => {
    const response = await fetch(`${BASE_URL}/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.json()
}

export const getOrderById = async (id, token) => {
    const response = await fetch(`${BASE_URL}/orders/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.json()
}