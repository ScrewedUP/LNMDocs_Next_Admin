"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import { useState, useRef, useEffect } from "react";
import { ErrorCallback } from "typescript";

interface RegisterData {
  email: string;
  password: string;
  username: string;
}
const Register = () => {
  const [register, setRegister] = useState<RegisterData>({
    email: "",
    username: "",
    password: "",
  });
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval = setInterval(() => {
      register.password = passwordRef.current?.value || "";
      register.email = emailRef.current?.value || "";
      register.username = userNameRef.current?.value || "";
      console.log("Updated the value based on autocomplete");
      clearInterval(interval);
    }, 100);
  });

  const handleRegister = async () => {
    axios
      .post("/api/register", register)
      .then(() => {
        console.log("Admin Approval Added");
      })
      .catch((err: ErrorCallback) => {
        console.log(err);
      });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Admin</CardTitle>
        <CardDescription>Request ADMIN Access</CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Label htmlFor='username'>User Name</Label>
          <Input
            id='username'
            ref={userNameRef}
            autoComplete='off'
            onChange={(e) => {
              setRegister((prevState) => {
                return { ...prevState, username: e.target.value };
              });
            }}
            placeholder='Username'
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='email'>College Email</Label>
          <Input
            id='email'
            ref={emailRef}
            autoComplete='off'
            onChange={(e) => {
              setRegister((prevState) => {
                return { ...prevState, email: e.target.value };
              });
            }}
            placeholder='Email'
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            type='password'
            ref={passwordRef}
            autoComplete='off'
            onChange={(e) => {
              setRegister((prevState) => {
                return { ...prevState, password: e.target.value };
              });
            }}
            placeholder='Password'
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleRegister} type='submit'>
          Register
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Register;
