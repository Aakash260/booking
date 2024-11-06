import {Link} from 'react-router-dom'
import { useAppContext } from '../../context/AppContext';
import SignOut from '../pages/SignOut';
const Header = () => {
  const {isLoggedIn}=useAppContext();
  return (
    <div className="bg-blue-800 p-6 ">
      <div className="container mx-auto gap-4  md:flex justify-between">
        <span className="text-2xl md:text-3xl text-white font-bold tracking-tight">
            <Link to='/'>MernHolday.com</Link>
        </span>
        <span className='flex space-x-2'>
          {
            isLoggedIn ?<>
        <Link to='/my-booking' className='  mt-4 md:mt-0 flex items-center text-blue-600 px-3 font-bold bg-gray-100'>My Booking</Link>
        <Link to='/my-hotels' className='  mt-4 md:mt-0 flex items-center text-blue-600 px-3 font-bold bg-gray-100'>My Hotels</Link>
<SignOut/>        
            </>:

        <Link to='/sign-in' className='  mt-4 md:mt-0 flex items-center text-blue-600 px-3 font-bold bg-gray-100'>Sign-in</Link>
          }
        </span>
      
      </div>
    </div>
  );
};

export default Header;
