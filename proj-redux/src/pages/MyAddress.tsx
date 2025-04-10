import { useEffect, useState } from "react";
import AddEditAddressModal from "../component/AddEditAddressModal";
import AddressCard from "../component/AddressCard";
import { Address } from "../types/Address";

const addresses: Address[] = [
    {
        id: 1,
        coords: [85.81198418556596, 20.338962600300675],
        orderFor: 'myself',
        buildingNo: "Ananta One (AR One),",
        addr:"1st to 6th Floor, Ananta One (AR One), Ananta One (AR One), Pride Hotel Lane Narveer Tanaji Wadi, City Survey No. 1579, Bhamburda, Shivajinagar, Pune, Maharashtra 411005, Narveer Tanaji Wadi, Shivajinagar, Pune",
        floorNo: "1st to 6th Floor,",
        locality: "Pride Hotel Lane Narveer Tanaji Wadi",
        city: "pune",
        state: "Maharastra",
        pincode: "411005",
        fullName: "Ankit Ram Nag",
        mobile: "8328896877"
    }
]

const MyAddress = () => {
    const [isAddingAddress, setAddingAddress] = useState(false);
    const [editAddr, setEditAddr] = useState<Address|null>(null);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(()=>{
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css";
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        }
    },[])
    return( 
        <>
            <div className="flex justify-center items-center">
                <div className="container min-h-100 my-10 max-w-300">
                    <div className="bg-white min-h-100 rounded-lg shadow-xl p-5">
                        <div className="flex flex-row gap-4 justify-between sm:justify-start items-center"><h2 className="text-md sm:text-2xl font-semibold">My Addresses</h2> <button className="btn-grad text-white text-sm" onClick={()=>{
                            setEditAddr(null)
                            setShouldRender(true);
                            setTimeout(()=>{
                                setAddingAddress(true)
                            },0);
                        }}><i className="fa-solid fa-plus"></i> Add Address</button></div>
                        <div className="mt-4">
                            {
                                addresses.map(addr=> {
                                    return <AddressCard address={addr} onEdit={()=>{
                                        setEditAddr(addr);
                                        setShouldRender(true);
                                        setTimeout(()=>{
                                            setAddingAddress(true)
                                        },0);
                                    }} onDelete={()=>{
                                        console.log("delete",addr.id);
                                    }}/>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            {shouldRender && <AddEditAddressModal isShown={isAddingAddress} destroy={function () {
                setAddingAddress(false);
                setTimeout(() => {
                    setShouldRender(false); 
                }, 300);
            } } addressDoc={editAddr} />}
        </>
        
    )
}

export default MyAddress;