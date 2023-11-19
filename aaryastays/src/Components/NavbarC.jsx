import React, { useEffect } from 'react'
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { Button, Modal } from 'flowbite-react';
import logo from '../Resources/logo.png'
import user1 from '../Resources/user1.png'
import { useState } from 'react';
import { authentication } from '../firebase/config';
import { GoogleAuthProvider, RecaptchaVerifier,signInWithPhoneNumber, signInWithPopup, OAuthProvider,signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
export default function NavbarC() {

  const [openModal, setOpenModal] = useState(false);
  const [otpsent, setOtpSent] = useState(false);
  
  const [selectedCountry, setSelectedCountry] = useState('India(+91)');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const [phoneNumber,setPhoneNumber] = useState();
  
  const [OTP,setOTP] = useState();
  const [user,setUser] = useState();

  const [showEmail,setShowEmail] = useState(false)
  const [emailAddress,setEmailAddress] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [isRegestering,setIsRegestering] = useState(false)

  useEffect(()=>{
    console.log(phoneNumber)
  },[phoneNumber])

  const generateRecaptcha = () =>{
    window.recaptchaVerifier = new RecaptchaVerifier(authentication, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
      }
    });
  }

  const handleOtpsent = () =>{
    if(phoneNumber.length == 10 ){ 
      setOtpSent(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, selectedCountryCode+phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      }).catch((error) => {
        console.log("error")
      });
    }else{
      alert("Enter valid phone number")
    }
  }

  

  const change = (selectedcountry,countrycode)=>{
    // console.log(countrycode)
    setSelectedCountry(selectedcountry);
    setSelectedCountryCode(countrycode);
    // SetisChooseCountry(true);

}

    const handleVerifyOtp = () =>{
      let confirmationResult = window.confirmationResult
      confirmationResult.confirm(OTP).then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user.providerData)
        setUser(user);
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
    }
  
    const handleGoogleSignIn = () =>{
      const provider = new GoogleAuthProvider()
      signInWithPopup(authentication,provider).then((result)=>{
    const user = result.user;
    console.log(user)
      }).catch((error) => {
        // Handle Errors here.
        console.log(error)
      });
    }

    const handleAppleSignIn = () =>{
      const provider = new OAuthProvider('apple.com');
      signInWithPopup(authentication,provider).then((result)=>{
        const user = result.user;
        console.log(user)
      }).catch((error) => {
        // Handle Errors here.
        console.log(error)
      });
    }

    const handleRegister = () =>{
      if(password == confirmPassword){
        createUserWithEmailAndPassword(authentication,emailAddress,password).then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user.providerData[0].providerId);
        localStorage.setItem('provider',user.providerData[0].providerId)
          alert("Successfully Registered")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
      }else{
        alert("Password and confirm password should be same")
      }
    }

    const handleLogin = () =>{
      signInWithEmailAndPassword(authentication,emailAddress,password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.providerData[0].providerId);
        localStorage.setItem('provider',user.providerData[0].providerId)
        alert("Successfully Logged in")
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }


  // const [isChooseCountry,SetisChooseCountry] =useState(false);

  return (
    <>
    <Navbar fluid rounded className='md:mx-20 mx-8'>
      <Navbar.Brand href="#">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Aarya Stays Logo" />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          dismissOnClick={false}
          label={
            <Avatar alt="User settings" img={user1} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => setOpenModal(true)}>Login</Dropdown.Item>
          
          <Dropdown.Item>Sign Up</Dropdown.Item>
          <Link to='/profile'><Dropdown.Item>Settings</Dropdown.Item></Link>
          <Dropdown.Item>Contact</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link href="#" className='text-md '>Find Near By</Navbar.Link>
        <Navbar.Link href="#" className='text-md'>View On Map</Navbar.Link>
        <Navbar.Link href="#" className='text-md'>Blogs</Navbar.Link>
        <Navbar.Link href="#">Web Check-in</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} popup>
    <Modal.Header></Modal.Header>
    <Modal.Body>
      <div className=" w-full">
        <h1 className='font-medium text-center text-lg underline decoration-[#F79489] underline-offset-8 decoration-4'>Log in or sign up</h1>
        <h1 className='text-center md:text-3xl text-2xl text-[#81D8F1] font-medium md:mt-5 mt-2 mb-4'>Welcome to Aarya Stays</h1>
         {  !showEmail && <div className='border-slate-100 border-2 rounded-lg'>
          <div className='dropdown px-3 py-2 '>
            <Dropdown inline label={<div className='w-full dropdown text-start'><h1 className='text-lg font-light text-slate-400'>Country/Region</h1><p> {selectedCountry} </p></div> }>
              <Dropdown.Item onClick={()=>{change('India(+91)','+91')}}>India(+91)</Dropdown.Item>
              <Dropdown.Item onClick={()=>{change('US(+1)','+1')}}>US(+1)</Dropdown.Item>
              {/* list of country code */}
            </Dropdown>
          </div>
          <input type='number' className='w-full  focus:border-none py-2 border-t-2 border-x-0 border-b-0 border-slate-100 md:text-xl rounded' placeholder='Phone number' value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)}></input>
        
          {otpsent && <input type='text' className='w-full border-t-2 border-x-0 border-b-0 border-slate-100 rounded md:text-xl'  placeholder="OTP" value={OTP} onChange={(e) =>{setOTP(e.target.value)}}></input>}
          {otpsent ? <Button className='text-white w-full bg-[#F79489] mt-3  enabled:hover:bg-[#F79489] ' onClick={handleVerifyOtp}>Verify</Button>:<Button className='text-white w-full bg-[#F79489] mt-3  enabled:hover:bg-[#F79489] ' onClick={handleOtpsent}>Continue</Button>}
        </div>}

        {
          showEmail && <>
          <div className='border-slate-100 border-2 rounded-lg'>
            <div className='  mb-2'>
            <input type='email' className='w-full  focus:border-none py-2  border-x-0 border-b-0 border-slate-100 md:text-xl rounded' placeholder='Email address' value={emailAddress} onChange={(e)=> setEmailAddress(e.target.value)}></input>
            </div>
            <input type='password' className='w-full  focus:border-none py-2 border-t-2 border-x-0 border-b-0 border-slate-100 md:text-xl rounded' placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}></input>
        
            {isRegestering && <input type='password' className='w-full border-t-2 border-x-0 border-b-0 border-slate-100 rounded md:text-xl'  placeholder="confirm password" value={confirmPassword} onChange={(e) =>{setConfirmPassword(e.target.value)}}></input>}
            {isRegestering ? <Button className='text-white w-full bg-[#F79489] mt-3  enabled:hover:bg-[#F79489] ' onClick={handleRegister}>Register</Button>:<Button className='text-white w-full bg-[#F79489] mt-3  enabled:hover:bg-[#F79489] ' onClick={handleLogin}>Login</Button>}
            
          </div>
          <div>
            {!isRegestering ? <div className='text-red-400 underline-2 cursor-pointer' onClick={()=>{setIsRegestering(true)}}>New Here? Register</div>:<div className='text-red-400 underline-2 cursor-pointer' onClick={()=>{setIsRegestering(false)}}>Already Have an Account? Login</div>}
          </div></>
        }
        
        
        
        
        <hr  className='my-5 '/>
        <Button className='w-full border-2 border-slate-100 bg-white enabled:hover:bg-white' onClick={handleGoogleSignIn}><i className='fa fa-google text-slate-400 text-start mr-5'></i><span className='text-black'>Continue with Google</span></Button>
        <Button className='w-full border-2 border-slate-100 bg-white enabled:hover:bg-white mt-2' onClick={handleAppleSignIn}><i className='fa fa-apple text-slate-400 text-start mr-5'></i><span className='text-black'>Continue with Apple</span></Button>
        {!showEmail ?<Button className='w-full border-2 border-slate-100 bg-white enabled:hover:bg-white mt-2' onClick={()=>{setShowEmail(true)}}><i className='fa fa-envelope-o text-slate-400 text-start mr-5'></i><span className='text-black'>Continue with email</span></Button>:<Button className='w-full border-2 border-slate-100 bg-white enabled:hover:bg-white mt-2' onClick={()=>{setShowEmail(false)}}><i className='fa fa-envelope-o text-slate-400 text-start mr-5'></i><span className='text-black'>Continue with Phone</span></Button>}
      </div>
    </Modal.Body>
    {/* <Modal.Footer>
      <Button onClick={() => setOpenModal(false) }>I accept</Button>
      <Button color="gray" onClick={() => setOpenModal(false)}>
        Decline
      </Button>
    </Modal.Footer> */}
    <div id="recaptcha-container"></div>
  </Modal>
  </>
  )
}
