import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./components/ui/button";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
} from "./components/ui/command";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "./components/ui/popover";

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "./components/ui/card";
import { Label } from "./components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "./components/ui/select";
import { Textarea } from "./components/ui/textarea";
import { subjectData } from "@/lib/data";
import { data } from "autoprefixer";

type FormData = {
   subject: string;
   semester: number;
   type: string;
   year?: string;
   link: string;
   noteName?: string;
};

export default function UploadForm() {
   const [open, setOpen] = React.useState(false);
   const [value, setValue] = React.useState("");

   const [formData, setFormData] = React.useState<FormData>({
      subject: "",
      semester: -1,
      type: "",
      link: "",
      noteName: "",
   });
   console.log(formData);

   const submitEnableWithNotes: boolean =
      formData.subject !== "" &&
      formData.semester !== -1 &&
      formData.type === "notes" &&
      formData.link !== "" &&
      formData.noteName !== "";

   const submitEnableWithoutNotes: boolean =
      formData.subject !== "" &&
      formData.semester !== -1 &&
      formData.type !== "" &&
      formData.link !== "" &&
      formData.year !== "";

   const resetHandler = () => {
      setFormData({
         subject: "",
         semester: -1,
         type: "",
         link: "",
         noteName: "",
      });
   };

   const submitHandler = (event: React.FormEvent) => {
      event.preventDefault();
      fetch("https://lnmdocsserver.onrender.com/admin/add-data", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(formData),
      })
         .then((res) => {
            if (!res) {
               throw new Error("NO RESPONSE");
            }
            console.log(res);
         })
         .catch((err) => {
            console.log(err);
         });
      resetHandler();
   };
   return (
      <Card>
         <CardHeader>
            <CardTitle>Upload a file to LNMDocs</CardTitle>
            <CardDescription>Fill in the details of the file</CardDescription>
         </CardHeader>
         <CardContent className='grid gap-6'>
            <div className='grid gap-2'>
               <Label htmlFor='type'>Type</Label>
               <Select
                  onValueChange={(value) => {
                     setFormData((prevState): FormData => {
                        if (value === "notes") {
                           const { year, ...rest } = prevState;
                           return {
                              ...rest,
                              type: value,
                           };
                        } else {
                           return {
                              ...prevState,
                              type: value,
                           };
                        }
                     });
                  }}
               >
                  <SelectTrigger id='type'>
                     <SelectValue placeholder='Select Type' />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value='notes'>Notes</SelectItem>
                     <SelectItem value='etpaper'>End Term Paper</SelectItem>
                     <SelectItem value='mtpaper'>Mid Term Paper</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div
               className={`${
                  formData.type != "notes" ? "hidden" : "block"
               } grid gap-2`}
            >
               <Label htmlFor='link'>Title of Notes</Label>
               <Textarea
                  onChange={(event) => {
                     setFormData((prevState) => {
                        return {
                           ...prevState,
                           noteName: event.target.value,
                        };
                     });
                  }}
                  id='link'
                  placeholder='Please enter the Title of the Notes'
               />
            </div>
            <div className='grid grid-cols-2 gap-4'>
               <div className='grid gap-2'>
                  <Label htmlFor='semester'>Semester</Label>
                  <Select
                     onValueChange={(value) => {
                        setFormData((prevState): FormData => {
                           return {
                              ...prevState,
                              semester: parseInt(value),
                           };
                        });
                     }}
                  >
                     <SelectTrigger id='semester'>
                        <SelectValue placeholder='Select Semester' />
                     </SelectTrigger>
                     <SelectContent>
                        {[...Array(8)].map((x, i) => (
                           <SelectItem
                              value={(i + 1).toString()}
                              key={Math.random()}
                           >
                              {i + 1}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>
               <div className='grid gap-2'>
                  <Label htmlFor='year'>Year</Label>
                  <Select
                     disabled={formData.type === "notes"}
                     onValueChange={(value) => {
                        setFormData((prevState): FormData => {
                           return {
                              ...prevState,
                              year: value,
                           };
                        });
                     }}
                  >
                     <SelectTrigger id='year'>
                        <SelectValue placeholder='Select Year' />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value='2018'>2018</SelectItem>
                        <SelectItem value='2019'>2019</SelectItem>
                        <SelectItem value='2020'>2020</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
            </div>
            <Popover open={open} onOpenChange={setOpen}>
               <PopoverTrigger asChild>
                  <Button
                     variant='outline'
                     role='combobox'
                     aria-expanded={open}
                     className='justify-between'
                  >
                     {value
                        ? subjectData.find(
                             (subject) => subject.toLowerCase() === value
                          )
                        : "Select Subject"}
                     <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
               </PopoverTrigger>
               <PopoverContent className='p-0 h-56'>
                  <Command>
                     <CommandInput placeholder='Search Subject' />
                     <CommandEmpty>No framework found.</CommandEmpty>
                     <CommandGroup className={`overflow-y-auto`}>
                        {subjectData.map((subject) => (
                           <CommandItem
                              key={subject}
                              onSelect={(currentValue) => {
                                 const sub = subjectData.find(
                                    (subject) =>
                                       subject.toLowerCase() === currentValue
                                 );
                                 if (sub) {
                                    setFormData((prevState): FormData => {
                                       return {
                                          ...prevState,
                                          subject: sub,
                                       };
                                    });
                                 }
                                 setValue(
                                    currentValue === value ? "" : currentValue
                                 );
                                 setOpen(false);
                              }}
                           >
                              <Check
                                 className={cn(
                                    "mr-2 h-4 w-4",
                                    value === subject
                                       ? "opacity-100"
                                       : "opacity-0"
                                 )}
                              />
                              {subject}
                           </CommandItem>
                        ))}
                     </CommandGroup>
                  </Command>
               </PopoverContent>
            </Popover>

            <div className='grid gap-2'>
               <Label htmlFor='link'>Google Drive Link</Label>
               <Textarea
                  onChange={(event) => {
                     setFormData((prevState) => {
                        return {
                           ...prevState,
                           link: event.target.value,
                        };
                     });
                  }}
                  id='link'
                  placeholder='Please enter the link of the official lnmdocs drive'
               />
            </div>
         </CardContent>
         <CardFooter className='justify-between space-x-2'>
            <Button variant='ghost' onClick={resetHandler}>
               Reset
            </Button>
            <Button
               onClick={submitHandler}
               disabled={
                  formData.type === "notes"
                     ? !submitEnableWithNotes
                     : !submitEnableWithoutNotes
               }
            >
               Submit
            </Button>
         </CardFooter>
      </Card>
   );
}
