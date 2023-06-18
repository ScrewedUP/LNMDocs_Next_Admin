"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import { useState, useRef, useEffect } from "react";

interface LoginData {
  email: string;
  password: string;
}
const Login = () => {
  const [login, setLogin] = useState<LoginData>({ email: "", password: "" });
    
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval = setInterval(() => {
      login.password = passwordRef.current?.value || "";
      login.email = emailRef.current?.value || "";
      console.log("Updated the value based on autocomplete");
      clearInterval(interval);
    }, 100);
  });

  const handleLogin = () => {
    signIn("credentials", {
      email: login.email,
      password: login.password,
      callbackUrl: "/dashboard",
    });
  };
  return (
    <Card>
        <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to LNMDocs</CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'>
            <div className='space-y-1'>
                <Label htmlFor='email'>Email</Label>
                <Input
                    id='email'
                    ref={emailRef}
                    autoComplete='off'
                    onChange={(e) => {
                        setLogin((prevState) => {
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
                    ref={passwordRef}
                    autoComplete='off'
                    type='password'
                    onChange={(e) => {
                        setLogin((prevState) => {
                            return { ...prevState, password: e.target.value };
                        });
                    }}
                    placeholder='Password'
                    />
            </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleLogin} type='submit'>
                Login
            </Button>
        </CardFooter>
    </Card>
)};

export default Login;
