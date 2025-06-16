import { ChangeEvent, useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import type * as MapboxGL from "mapbox-gl";
import { Address } from "../types/Address";

interface AddEditAddressModalProps {
    isShown: Boolean,
    addressDoc: Address | null,
    destroy: () => void
}

mapboxgl.accessToken = "pk.eyJ1IjoiYW5rczEyNDUiLCJhIjoiY20zZnNkMTc0MHBpazJscXhwdTdna3EzeSJ9.6lX3bkKQJw2oCRdN74Ip3A"

const DEFAULT_LOCATION: [number, number] = [-74.006, 40.7128];
const DEFAULT_ZOOM = 14; //

const AddEditAddressModal = ({isShown, addressDoc = null, destroy}: AddEditAddressModalProps) => {
  
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [zoomLevel, setZoomLevel] = useState<number>(DEFAULT_ZOOM);
    const prevZoomRef = useRef<number>(DEFAULT_ZOOM);
    const [isMobileView, setIsMobileView] = useState(false)
    const [isLocationConfirmed, setIsLocationConfirmed] = useState(false);

    const addrDocCopy = addressDoc == null ? {
        id: null,
        coords: null,
        orderFor: "myself"  as "myself" | "others",
        addr: "Fetching location...",
        buildingNo: "",
        floorNo: "",
        locality: "",
        city: "",
        state: "",
        pincode: "",
        fullName: "",
        mobile: ""
    }:{
        id: addressDoc.id,
        coords: addressDoc.coords,
        orderFor: addressDoc.orderFor  as "myself" | "others",
        addr: addressDoc.addr,
        buildingNo: addressDoc.buildingNo,
        floorNo: addressDoc.floorNo,
        locality: addressDoc.locality,
        city: addressDoc.city,
        state: addressDoc.state,
        pincode: addressDoc.pincode,
        fullName: addressDoc.fullName,
        mobile: addressDoc.mobile
      }

    const [saveAddress, setSaveAddress] = useState<Address>(addrDocCopy)

     // ✅ Function to get address from coordinates (Reverse Geocoding)
    const fetchAddress = async (lng: number, lat: number) => {
    setSaveAddress({...saveAddress, addr:"Fetching Location"});
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      if (data?.features?.length) {
        console.log(data);
        setSaveAddress({...saveAddress, addr: data.features[0].place_name})
      } else {
        console.log("Address not found");
        setSaveAddress({...saveAddress,addr:"Address not found"});
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      setSaveAddress({...saveAddress,addr:"Failed to fetch address"});
    }
  };

  useEffect(() => {
    const logScreenSize = () => {
      console.log(`Width: ${window.innerWidth}, Height: ${window.innerHeight}`);
      if (window.innerWidth<640) {
        setIsMobileView(true)
      }else{
        setIsMobileView(false)
      }
    };

    logScreenSize();

    window.addEventListener("resize", logScreenSize);

    return () => {
      window.removeEventListener("resize", logScreenSize);
    };
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    console.log(addrDocCopy);
    
    // if (addressDoc != null){
    //   setSaveAddress({
    //     id: addressDoc.id,
    //     coords: addressDoc.coords,
    //     orderFor: addressDoc.orderFor,
    //     addr: addressDoc.addr,
    //     buildingNo: addressDoc.buildingNo,
    //     floorNo: addressDoc.floorNo,
    //     locality: addressDoc.locality,
    //     city: addressDoc.city,
    //     state: addressDoc.state,
    //     pincode: addressDoc.pincode,
    //     fullName: addressDoc.fullName,
    //     mobile: addressDoc.mobile
    //   })
    // }
    

    const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: saveAddress.coords ?? DEFAULT_LOCATION,
        zoom: zoomLevel,
      });
    
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken!,
        mapboxgl: mapboxgl as unknown as typeof MapboxGL,
        marker: false,
        placeholder: "Search for a place",
      });
    
      map.addControl(geocoder, "top");
    
      geocoder.on("result", (e) => {
        const { center } = e.result;
        map.flyTo({ center, zoom: zoomLevel });
      });
  
      mapRef.current = map;

      const geolocate = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true, // ✅ Forces GPS-based location
            timeout: 15000,           // ✅ Waits for up to 15 sec
            maximumAge: 0,            // ✅ Prevents cached location
          },
          trackUserLocation: false, // ✅ Continuously update location
          showUserHeading: true,   // ✅ Display direction of movement
      });
      
    mapRef.current.addControl(geolocate);

    geolocate.on("geolocate", (position) => {
      const { longitude, latitude } = position.coords;
      // setUserLocation([longitude, latitude]);
      // map.flyTo({ center: [longitude, latitude], zoom: zoomLevel });
      fetchAddress(longitude, latitude);
  }); 

    // ✅ Listen for zoom changes
    mapRef.current.on("zoomend", () => {
      if (mapRef.current) {
        const newZoom = mapRef.current.getZoom();
        if (prevZoomRef.current !== newZoom) {
          setZoomLevel(newZoom);
          prevZoomRef.current = newZoom;
        }
      }
    });


    const updateLocation = () => {
        if (!mapRef.current) return;
        const center = mapRef.current.getCenter();
        fetchAddress(center.lng, center.lat);
    };
  
    map.on("moveend", updateLocation);

    // ✅ Start geolocation once map loads
    mapRef.current.on("load", () => {
      if(addressDoc == null)
        geolocate.trigger();;
    });

    return () => {
        map.off("moveend", updateLocation);
        map.remove();
    } // Cleanup
  }, []);

  const validateNumber = (e: ChangeEvent<HTMLInputElement>):string => {
    // console.log(e.);
    return e.target.value.replace(/[^0-9]/g, ""); 
    // setMobileNo(value);
  }
    return (
        <>
            <div className={`relative ${isShown?'z-10':'-z-99'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={destroy}>
                <div className={`fixed inset-0 bg-gray-500/75 transition-all transition-opacity ${isShown?"ease-in duration-200 opacity-100":"ease-out duration-100 opacity-0"}`} aria-hidden="true"></div>
                <div className={`fixed inset-0 z-10 w-screen overflow-y-auto ${isShown?"ease-out duration-300 opacity-100 translate-y-0 sm:scale-100":"ease-in duration-50 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"}`}>
                    <div className="flex min-h-full items-end md:items-center justify-center p-4 text-center sm:p-0">
                        <div className="relative w-full sm:w-auto transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all" onClick={(e) => e.stopPropagation()}>
                            <button type="button" className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={destroy}>
                                <span className="sr-only">Close</span>
                                &times;
                            </button>
                            <div className="bg-white">
                                <div className="grid grid-cols-1 sm:grid-cols-2">
                                    {isMobileView == true ? (
                                      !isLocationConfirmed &&
                                        <div className="max-w-200 w-100 h-[90vh] sm:max-h-140 w-full">
                                          <div className="relative max-w-200 h-[90vh] sm:max-h-140 overflow-hidden">
                                            <div id="map" ref={mapContainerRef} className="max-w-200 h-[90vh] sm:max-h-140 sm:h-140 w-full" />
                                            <div
                                                style={{
                                                  position: "absolute",
                                                  top: "45.5%",
                                                  left: "47.5%",
                                                  transform: "translate(-50%, -50%)",
                                                  fontSize: "30px",
                                                  pointerEvents: "none",
                                                }}
                                            >
                                                📍
                                            </div>
                                            <div className="flex flex-col gap-2 absolute bottom-6 left-2 right-2">
                                              <p className="text-xs p-2 border-1 border-gray-400 rounded-sm bg-white text-gray-600 leading-4 w-full/2">The location shown is approximate. Please drag the map to adjust to your exact location.</p>
                                              <div className="block sm:hidden bg-white rounded-md p-2">
                                                <h6 className="text-xs font-semibold">Delivering to</h6>
                                                <p className="text-sm my-2">{saveAddress.addr}</p>
                                                <button type="button" className="btn-grad w-full text-white" onClick={()=>setIsLocationConfirmed(true)}>Confirm and proceed</button>
                                              </div>
                                            </div>
                                          </div>
                                      </div>  
                                    ) : (
                                      <div className="max-w-200 w-100 h-[90vh] sm:max-h-140 w-full">
                                          <div className="relative max-w-200 h-[90vh] sm:max-h-140 overflow-hidden">
                                            <div id="map" ref={mapContainerRef} className="max-w-200 h-[90vh] sm:max-h-140 sm:h-140 w-full" />
                                            <div
                                                style={{
                                                  position: "absolute",
                                                  top: "45.5%",
                                                  left: "47.5%",
                                                  transform: "translate(-50%, -50%)",
                                                  fontSize: "30px",
                                                  pointerEvents: "none",
                                                }}
                                            >
                                                📍
                                            </div>
                                            <div className="flex flex-col gap-2 absolute bottom-6 left-2 right-2">
                                              <p className="text-xs p-2 border-1 border-gray-400 rounded-sm bg-white text-gray-600 leading-4 w-full/2">The location shown is approximate. Please drag the map to adjust to your exact location.</p>
                                              <div className="block sm:hidden bg-white rounded-md p-2">
                                                <h6 className="text-xs font-semibold">Delivering to</h6>
                                                <p className="text-sm my-2">{saveAddress.addr}</p>
                                                <button type="button" className="btn-grad w-full text-white">Confirm and proceed</button>
                                              </div>
                                            </div>
                                          </div>
                                      </div>  
                                    )}
                                    {
                                      isMobileView == true ? (
                                        isLocationConfirmed &&
                                        <div className="max-w-200 min-w-30 max-w-full max-h-140 overflow-y-scroll px-4 py-3 ">
                                          <h3 className="font-bold mb-3 text-md">Enter your full address</h3>
                                          <form className="my-4">
                                              <ul className="flex flex-wrap w-full gap-2 md:grid-cols-2">
                                                  <li onClick={()=>setSaveAddress({...saveAddress, orderFor:"myself"})}>
                                                      <input type="radio" id="__mob_myself" name="location" value="myself" className="hidden peer" checked={saveAddress.orderFor == "myself"} />
                                                      <label htmlFor="__mob_myself" className="inline-flex text-sm items-center justify-between w-full px-2 py-1 text-gray-500 bg-white border border-gray-500 rounded-lg cursor-pointer peer-checked:border-amber-600 peer-checked:bg-amber-500/20 peer-checked:text-amber-600 hover:text-amber-600 hover:border-amber-600 hover:bg-amber-500/20">                           
                                                          Order for myself
                                                      </label>
                                                  </li>
                                                  <li onClick={()=>setSaveAddress({...saveAddress, orderFor:"others"})}>
                                                      <input type="radio" id="__mob_others" name="location" value="others" className="hidden peer" checked={saveAddress.orderFor == "others"}/>
                                                      <label htmlFor="__mob_others" className="inline-flex text-sm items-center justify-between w-full px-2 py-1 text-gray-500 bg-white border border-gray-500 rounded-lg cursor-pointer peer-checked:border-amber-600 peer-checked:bg-amber-500/20 peer-checked:text-amber-600 hover:text-amber-600 hover:border-amber-600 hover:bg-amber-500/20">
                                                          Order for others
                                                      </label>
                                                  </li>
                                              </ul>
                                              <div className="relative my-3">
                                                  <input type="text" id="__mob_building_no" onChange={(e)=>{
                                                    setSaveAddress({...saveAddress, buildingNo: e.target.value})
                                                  }} value={saveAddress.buildingNo} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer" placeholder=" " required/>
                                                  <label htmlFor="__mob_building_no" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">House No./ Plot No./ Building No.</label>
                                              </div>
                                              <div className="relative my-3">
                                                  <input type="text" id="__mob_floor_no" onChange={(e)=>{
                                                    setSaveAddress({...saveAddress, floorNo: e.target.value})
                                                  }} value={saveAddress.floorNo} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer" placeholder=" " />
                                                  <label htmlFor="__mob_floor_no" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Floor No.(Optional)</label>
                                              </div>
                                              <div className="sm:col-span-4 my-2">
                                                  <label htmlFor="__mob_address" className="block text-sm/6 font-medium text-gray-900">Address</label>
                                                  <div className="mt-1">
                                                      <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-amber-400">
                                                      {/* <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">+91 </div> */}
                                                      <textarea name="__mob_address" id="address"  onChange={(e)=>{
                                                          setSaveAddress({...saveAddress, floorNo: e.target.value})
                                                      }} value={saveAddress.addr} className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="Enter address" required/>
                                                      </div>
                                                  </div>
                                              </div>
                                                  
                                              <p className="text-xs my-4">Enter your details for seamless delivery experience</p>
                                              <div className="relative z-0 my-4">
                                                <input type="text" id="__mob_fullname" onChange={(e)=>{
                                                  setSaveAddress({...saveAddress, fullName: e.target.value})
                                                }} value={saveAddress.fullName} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer" placeholder=" " />
                                                <label htmlFor="__mob_fullname" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Full Name</label>
                                              </div>
                                              <div className="relative z-0 my-4">
                                                <input type="text" id="__mob_mobile" onChange={(e)=>{
                                                  let num = validateNumber(e)
                                                  setSaveAddress({...saveAddress, mobile: num})
                                                }} value={saveAddress.mobile} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer" placeholder=" " />
                                                <label htmlFor="__mob_mobile" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Mobile No.</label>
                                              </div>
                                              <button type="submit" className="btn-grad w-full text-white mt-4">Save Address</button>
                                          </form>
                                        </div>
                                      ) : (
                                        <div className="max-w-200 min-w-30 sm:min-w-100  max-w-full max-h-140 overflow-y-scroll px-4 py-3 ">
                                          <h3 className="font-bold mb-3 text-md">Enter your full address</h3>
                                          <form className="my-4">
                                              <ul className="flex flex-wrap w-full gap-2 md:grid-cols-2">
                                                  <li onClick={()=>setSaveAddress({...saveAddress, orderFor:"myself"})}>
                                                      <input type="radio" id="myself" name="location" value="myself" className="hidden peer" checked={saveAddress.orderFor == "myself"}/>
                                                      <label htmlFor="myself" className="inline-flex text-sm items-center justify-between w-full px-2 py-1 text-gray-500 bg-white border border-gray-500 rounded-lg cursor-pointer peer-checked:border-amber-600 peer-checked:bg-amber-500/20 peer-checked:text-amber-600 hover:text-amber-600 hover:border-amber-600 hover:bg-amber-500/20">                           
                                                          Order for myself
                                                      </label>
                                                  </li>
                                                  <li onClick={()=>setSaveAddress({...saveAddress, orderFor:"others"})}>
                                                      <input type="radio" id="others" name="location" value="others" className="hidden peer" checked={saveAddress.orderFor == "others"}/>
                                                      <label htmlFor="others" className="inline-flex text-sm items-center justify-between w-full px-2 py-1 text-gray-500 bg-white border border-gray-500 rounded-lg cursor-pointer peer-checked:border-amber-600 peer-checked:bg-amber-500/20 peer-checked:text-amber-600 hover:text-amber-600 hover:border-amber-600 hover:bg-amber-500/20">
                                                          Order for others
                                                      </label>
                                                  </li>
                                              </ul>
                                              <div className="relative my-3">
                                                  <input type="text" id="building_no" onChange={(e)=>{
                                                    setSaveAddress({...saveAddress, buildingNo: e.target.value})
                                                  }} value={saveAddress.buildingNo} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer" placeholder=" " required/>
                                                  <label htmlFor="building_no" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">House No./ Plot No./ Building No.</label>
                                              </div>
                                              <div className="relative my-3">
                                                  <input type="text" id="floor_no" onChange={(e)=>{
                                                    setSaveAddress({...saveAddress, floorNo: e.target.value})
                                                  }} value={saveAddress.floorNo} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer" placeholder=" " />
                                                  <label htmlFor="floor_no" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Floor No.(Optional)</label>
                                              </div>
                                              <div className="sm:col-span-4 my-2">
                                                  <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">Address</label>
                                                  <div className="mt-1">
                                                      <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-amber-400">
                                                      {/* <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">+91 </div> */}
                                                      <textarea name="address" id="address"  onChange={(e)=>{
                                                          setSaveAddress({...saveAddress, addr: e.target.value})
                                                      }} value={saveAddress.addr} className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="Enter address" required/>
                                                      </div>
                                                  </div>
                                              </div>
                                                      
                                              <p className="text-xs my-4">Enter your details for seamless delivery experience</p>
                                              <div className="relative z-0 my-4">
                                                <input type="text" id="fullname" onChange={(e)=>{
                                                  setSaveAddress({...saveAddress, fullName: e.target.value})
                                                }} value={saveAddress.fullName} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer" placeholder=" " />
                                                <label htmlFor="fullname" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Full Name</label>
                                              </div>
                                              <div className="relative z-0 my-4">
                                                <input type="text" id="addr_mobile" onChange={(e)=>{
                                                  let num = validateNumber(e)
                                                  setSaveAddress({...saveAddress, mobile: num})
                                                }} value={saveAddress.mobile} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-400 peer" placeholder=" " />
                                                <label htmlFor="addr_mobile" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Mobile No.</label>
                                              </div>
                                              <button type="submit" className="btn-grad w-full text-white mt-4">Save Address</button>
                                          </form>
                                        </div>
                                      )
                                    }                               
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddEditAddressModal;