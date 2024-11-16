import React, { useContext, useState } from 'react'
import Toast from '../component/Toast';
import { useQuery } from 'react-query';
import * as apiClient from "../api-client"
import { loadStripe,Stripe } from '@stripe/stripe-js';

const SRIPE_PUB_KEY= import.meta.env.VITE_STRIPE_PUB_KEY||''

const stripePromise=loadStripe(SRIPE_PUB_KEY)

type ToastMessage={
    message:string;
    type:"SUCCESS"|"ERROR"
}

type AppContext={
    showToast:(toastMessage:ToastMessage)=>void
    isLoggedIn:Boolean
    stripePromise:Promise<Stripe | null>
    refetch :()=>void
}

const AppContext=React.createContext<AppContext |  undefined > (undefined)

export const AppContextProvider=({children}:{children:React.ReactNode})=>{
    const [toast,setToast]=useState<ToastMessage | undefined>(undefined);

    const {isError,refetch }=useQuery("validateToken",apiClient.validateToken,{
        retry:false,
        refetchOnWindowFocus: false,
    })

return (
    <AppContext.Provider
    value={{
        showToast:(toastMessage)=>{
            setToast(toastMessage);
        },
        isLoggedIn:!isError,
        stripePromise,
        refetch 
    }}
    >
        {
            toast && (
                <Toast message={toast.message} type={toast.type} onClose={()=>setToast(undefined)} />
            )
        }
        {children}
    </AppContext.Provider>
)
}

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }

    return context;
};
