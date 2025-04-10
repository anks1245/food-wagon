export type Product = {
    foodId: number,
    foodImage: string|null,
    restaurantId: number,
    foodName:string,
    restaurantName: string,
    price: number,
    offeredPrice: number|null,
    currency: string,
    discount: number|null,
    quatity: number
}