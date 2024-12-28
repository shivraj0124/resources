import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SendOTP from './Components/sendOtp';
import VerifyOTP from './Components/verifyOtp';
import ForgotPassword from './Components/forgotPassword';
const App = () => {
   

    return (
      <>
      <BrowserRouter>
      <Routes>
        <Route path='/sendOtp' element={<SendOTP/>}>

        </Route>
        <Route path='/verifyOtp' element={<VerifyOTP/>}>

        </Route>
        <Route path='/forgotPassword' element={<ForgotPassword/>}>

        </Route>
      </Routes>
      </BrowserRouter>
      
      </>
    );
};

export default App;
