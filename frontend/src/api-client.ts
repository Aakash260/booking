import { RegisterForm } from "./pages/Register";
import { SignInForm } from "./pages/SignIn";
import {HotelType} from "../../backened/src/shared/types"

const API_BASE_URL =import.meta.env.VITE_API_BASE_URL||""

export const register= async(FormData:RegisterForm) => {

    const response=await fetch(`${API_BASE_URL}/api/users/register`,{
        method: 'POST',
        credentials:"include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(FormData),
    })
    const responseBody = await response.json();
    
    if(!response.ok){
        throw new Error(responseBody.message)
    }
}


export const signIn=async (formData:SignInForm)=>{

const response=await fetch(`${API_BASE_URL}/api/auth/login`,{
    method:"POST",
    credentials:"include",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(formData)
})
const responseBody=await response.json();
if(!response.ok){
    throw new Error(responseBody.message)
}
}

export const signOut=async ()=>{
    const response= await fetch(`${API_BASE_URL}/api/auth/logout`,{
        credentials:"include",
        method:"POST",
    })
  
    if(!response.ok){
        throw new Error("Error on Sign out")
    }
}

export const validateToken=async()=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        credentials:"include",
    })
    if(!response.ok){
        throw new Error("Invalid token")
    }
    return response.json()
}

export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
      method: "POST",
      credentials: "include",
      body: hotelFormData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to add hotel");
    }
  
    return response.json();
  };
  
  export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
      credentials: "include",
    });
   
    if (!response.ok) {
      throw new Error("Error fetching hotels");
    }
  
    return response.json();
  };
