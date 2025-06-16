// import { useState } from "react";
import { Address } from "../types/Address";
// import AddEditAddressModal from "./AddEditAddressModal";

interface AddressCardProps {
    address : Address
    onEdit: () => void
    onDelete: () => void
}

const AddressCard = ({address,onEdit, onDelete}:AddressCardProps) => {
    return (
        <>
            <div className="p-4 flex flex-row border-(--md-sys-color-outline-variant) border-1 rounded-sm gap-4">
            <i className="fa-solid fa-address-book m-1 text-xl"></i>
            <div className="">
                <h4 className="font-bold">{address.fullName}</h4>
                <p>{address.addr}</p>
            </div>
            <div className="">
                <i className="fa-solid fa-pen-to-square m-1 text-lg cursor-pointer text-(--color-primary)" onClick={()=>onEdit()}></i>
                <i className="fa-solid fa-trash m-1 text-lg cursor-pointer text-(--md-sys-color-error)" onClick={()=>onDelete()}></i>
            </div>
        </div>
            {/* <AddEditAddressModal isShown={isAddingAddress} destroy={function () {
                setAddingAddress(false);
            } } addressDoc={addr.address} /> */}
        </>
    )
}

export default AddressCard;