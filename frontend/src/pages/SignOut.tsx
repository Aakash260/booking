 
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from "../api-client"
import { useAppContext } from '../context/AppContext'

const SignOut = () => {
const {showToast}=useAppContext()
const queryClient=useQueryClient()
const navigate=useNavigate()
    const mutation=useMutation(apiClient.signOut,{
        onSuccess:async()=>{
            showToast({message:"Sign Out Successfully",type:"SUCCESS"})
            await queryClient.invalidateQueries('validateToken')
            navigate('/');
         },
         onError:(err:Error)=>{
     showToast({message:err.message,type:"ERROR"})
         }
    })

const handleClick=()=>{
    mutation.mutate()
}

  return (
    <div onClick={handleClick}>
        <Link  to='/sign-out' className=' py-2 mt-4 md:mt-0 flex items-center text-blue-600 px-3 font-bold bg-gray-100'>Sign Out</Link>

    </div>
  )
}

export default SignOut