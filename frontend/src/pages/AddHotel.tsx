import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import { useMutation } from "react-query";
import { useAppContext } from "../../context/AppContext";
import * as apiClient from "../api-client";

 
const AddHotel = () => {
    const { showToast } = useAppContext();

    const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
      onSuccess: () => {
        showToast({ message: "Hotel Saved!", type: "SUCCESS" });
      },
      onError: (error) => {
        console.log(error)
        showToast({ message: "Error Saving Hotel", type: "ERROR" });
      },
    });
  
    const handleSave = (hotelFormData: FormData) => {
        
      mutate(hotelFormData);
    };
  return (
    <div className="p-10">
        
        <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
        </div>
  )
}

export default AddHotel