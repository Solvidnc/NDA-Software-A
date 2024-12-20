"use client";
import React, { useState } from "react";
import { useEffect } from 'react';
import { countries } from "./countries"; // A list of countries
import { isValidPhoneNumber, formatPhoneNumber } from "./phone"; // Phone validation utility
import newpasswordValidation from "./validatePass"; // Password validation
import { isValidEmail } from "./validateEmail"; // Email validation utility
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const [formattedPhone, setFormattedPhone] = useState<string | null>(null);
  
  const [fullName, setFullName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [signin, setSignin]=useState(false);
  const [home, setHome]=useState(false);

  const [noerror, setNoerror]=useState(null);
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  useEffect(() => {
    // Safe to update router after render
    if (noerror) {
      router.push('/nda');
    }
  }, [noerror]);
  
  useEffect(()=>{
    if(signin===true){
      router.push('/signup')
    }
  },[signin])
  useEffect(()=>{
    if(home===true){
      router.push('/')
    }
  },[home])

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setPhone(input);

    if (isValidPhoneNumber(input)) {
      setFormattedPhone(formatPhoneNumber(input));
    } else {
      setFormattedPhone(null); // Reset if invalid
    }
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: { [key: string]: string } = {};
    setErrors({});  // Reset errors on new submission
    setPasswordErrors([]); // Reset password errors
    var data=localStorage.getItem("userdata");
    if(data===null){
      data=[];
    }else{
          data=JSON.parse(data);
      }
    localStorage.setItem("userdata",JSON.stringify([...data,{fullName:fullName,birthday:birthday,email:email,phone:phone,password:password,country:selectedCountry}]));
    
    // Validate Form Fields
    if (fullName.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters long.';
    }
    if (!birthday) {
      newErrors.birthday = 'Birthday is required.';
    }
    if (!selectedCountry) {
      newErrors.selectedCountry = 'Country is required.';
    }
    if (!isValidEmail(email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!isValidPhoneNumber(phone)) {
      newErrors.phone = 'Invalid phone number format.';
    }
    
    const passErrors = newpasswordValidation(password);
    if (passErrors.length > 0) {
      setPasswordErrors(passErrors);
    }

    setErrors(newErrors); // Set errors to state

    // Check if there were no errors
    if (Object.keys(newErrors).length === 0 && passErrors.length === 0) {
      
      
        localStorage.setItem("userdata",JSON.stringify([...data,{fullName:fullName,birthday:birthday,email:email,phone:phone,password:password,country:selectedCountry}]));
        const d = new Date();
        localStorage.setItem("session",d.getTime());
      setNoerror(true);
    }
  }
    const handlehome=()=>{
      setHome(true);
    }
    const handlesignin=()=>{
      setSignin(true);
    };

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Create your account</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="name">
              Full name
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              id="name"
              className="form-input w-full py-2"
              type="text"
              placeholder="Corey Barker"
              
            />
            {errors.fullName && <p className="text-red-600">{errors.fullName}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="birthday">
              Birthday
            </label>
            <input
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              id="birthday"
              className="form-input w-full py-2"
              type="date"
              
            />
            {errors.birthday && <p className="text-red-600">{errors.birthday}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="form-input w-full py-2"
              type="email"
              placeholder="corybarker@email.com"
              
            />
            {errors.email && <p className="text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="phone">
              Phone number:
            </label>
            <input
              className="form-input w-full py-2"
              id="phone"
              type="text" // Use text to accommodate formatted numbers
              value={phone}
              onChange={handleChangePhone}
              placeholder="e.g. (123) 456-7890"
              
            />
            {formattedPhone && <p>Formatted Number: {formattedPhone}</p>}
            {errors.phone && <p className="text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="form-input w-full py-2"
              type="password"
              autoComplete="on"
              placeholder="••••••••"
              
            />
            {passwordErrors.length > 0 && passwordErrors.map((item, index) => (
              <p key={index} className="text-red-600">{index + 1}. {item}</p>
            ))}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="country">
              Select a country:
            </label>
            <select
              className="form-input w-full py-2"
              id="country"
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <option value="">Please choose your country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.selectedCountry && <p className="text-red-600">{errors.selectedCountry}</p>}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button 
            type="submit" // Changed to type="submit" for form submission
            className="btn w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]"
          >
            Register
          </button>
        </div>
        <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-around'}}>

            {/* <button onClick={handlesignin} className="btn w-40% bg-gradient-to-t from-green-600 to-green-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]">
              Sign up
            </button>

            <button onClick={handlehome} className="btn w-40% bg-gradient-to-t from-slate-600 to-slate-400 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]">
              Home
            </button> */}
            </div>
      </form>

      {/* Bottom link */}
      {/* <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          By signing up, you agree to the{" "}
          <a
            className="whitespace-nowrap font-medium text-gray-700 underline hover:no-underline"
            href="#0"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            className="whitespace-nowrap font-medium text-gray-700 underline hover:no-underline"
            href="#0"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div> */}
    </>
  );
}