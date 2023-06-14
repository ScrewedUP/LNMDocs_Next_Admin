"use client";
import { signIn } from 'next-auth/react'
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { useRef } from 'react';
import { Heading } from 'lucide-react';

const Login = () => {
  const emailLogin = useRef<HTMLInputElement>(null);
  const passwordLogin = useRef<HTMLInputElement>(null);
  const emailRegister = useRef<HTMLInputElement>(null);
  const passwordRegister = useRef<HTMLInputElement>(null);
  const userNameRegister = useRef<HTMLInputElement>(null);
  console.log(emailLogin.current?.value)
  return(
  <Tabs defaultValue="login" className="w-[400px]">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="login">Login</TabsTrigger>
      <TabsTrigger value="requestAdmin">Request Admin</TabsTrigger>
    </TabsList>
    <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Login to LNMDocs
            </CardDescription> 
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" ref={emailLogin} placeholder="Email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="passward" ref={passwordLogin} placeholder="Password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => signIn('credentials',{email : emailLogin.current?.value , password : passwordLogin.current?.value})}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="requestAdmin">
        <Card>
          <CardHeader>
            <CardTitle>Request Admin</CardTitle>
            <CardDescription>
              Request ADMIN Access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className="space-y-1">
              <Label htmlFor="username">User Name</Label>
              <Input id="username" ref={userNameRegister} placeholder="Username" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">College Email</Label>
              <Input id="email" ref={emailRegister} placeholder="Email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="passward" ref={passwordRegister} placeholder="Password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Register</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <div className='text-4xl font-white'>{emailLogin.current?.value}</div>
  </Tabs>
)};

export default Login;
