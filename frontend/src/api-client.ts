import { RegisterForm } from "./pages/Register";
import { SignInForm } from "./pages/SignIn";
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

