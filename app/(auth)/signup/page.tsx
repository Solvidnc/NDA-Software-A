"use client";
import React, { useState, useEffect } from "react";
import { countries } from "./countries"; // A list of countries
import { isValidPhoneNumber, formatPhoneNumber } from "./phone"; // Phone validation utility
import newpasswordValidation from "./validatePass"; // Password validation
import { isValidEmail } from "./validateEmail"; // Email validation utility
import { useRouter } from "next/navigation";
import { ref, set } from "firebase/database";
import { db } from "@/app/libs/firebase";

export default function SignUp() {
  const router = useRouter();

  const [formattedPhone, setFormattedPhone] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [signin, setSignin] = useState<boolean>(false);
  const [home, setHome] = useState<boolean>(false);

  const addUser = (payload: object) => {
    const d: any = new Date();
    const dataRef = ref(db, `users/user_${d.getTime()}`);
    set(dataRef, payload);
  };

  const [noError, setNoError] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  useEffect(() => {
    if (noError) {
      router.push("/nda");
    }
  }, [noError, router]);

  useEffect(() => {
    if (signin) {
      router.push("/signin");
    }
  }, [signin, router]);

  useEffect(() => {
    if (home) {
      router.push("/");
    }
  }, [home, router]);

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setPhone(input);

    if (isValidPhoneNumber(input)) {
      setFormattedPhone(formatPhoneNumber(input));
    } else {
      setFormattedPhone(null);
    }
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: { [key: string]: string } = {};
    setErrors({});
    setPasswordErrors([]);

    var data: any = localStorage.getItem("userdata");
    if (data === null) {
      data = [];
    } else {
      data = JSON.parse(data);
    }
    const tempdata: { [key: string]: string } = {
      fullName,
      birthday,
      email,
      phone,
      password,
      country: selectedCountry,
    };
    localStorage.setItem("userdata", JSON.stringify([...data, tempdata]));
    addUser(tempdata);

    if (fullName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters long.";
    }
    if (!birthday) {
      newErrors.birthday = "Birthday is required.";
    }
    if (!selectedCountry) {
      newErrors.selectedCountry = "Country is required.";
    }
    if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!isValidPhoneNumber(phone)) {
      newErrors.phone = "Invalid phone number format.";
    }

    const passErrors = newpasswordValidation(password);
    if (passErrors.length > 0) {
      setPasswordErrors(passErrors);
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && passErrors.length === 0) {
      localStorage.setItem(
        "userdata",
        JSON.stringify([
          ...data,
          {
            fullName,
            birthday,
            email,
            phone,
            password,
            country: selectedCountry,
          },
        ])
      );
      const d: any = new Date();
      localStorage.setItem("session", d.getTime());
      setNoError(true);
    }
  };

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Create your account</h1>
      </div>

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
              type="text"
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
            {passwordErrors.length > 0 &&
              passwordErrors.map((item, index) => (
                <p key={index} className="text-red-600">
                  {index + 1}. {item}
                </p>
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
            type="submit"
            className="btn w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]"
          >
            Register
          </button>
          <div className="flex justify-around mt-4">
            <button
              type="button"
              onClick={() => setHome(true)}
              className="btn bg-gradient-to-t from-slate-600 to-slate-400 text-white shadow px-6 py-2"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => setSignin(true)}
              className="btn bg-gradient-to-t from-green-600 to-green-500 text-white shadow px-6 py-2"
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
