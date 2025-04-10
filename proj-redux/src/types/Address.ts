
export interface Address {
    id: number | null,
    coords: [number, number] | null,
    orderFor: "myself"|"others",
    addr: string,
    buildingNo: string,
    floorNo: string,
    locality: string,
    city: string,
    state: string,
    pincode: string,
    fullName: string,
    mobile: string

}