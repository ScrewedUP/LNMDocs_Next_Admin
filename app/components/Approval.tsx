"use client";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
const Approval = () => {
  const [approvalData, setApprovaldata] = useState([]);

  useEffect(() => {
    fetch("/api/approval")
      .then((data) => data.json())
      .then((data) => setApprovaldata(data.allUsers))
      .catch((err) => console.log(err));
  }, []);
  console.log(approvalData);
  const handleAccept = () => {
    axios
      .post("/api/user", approvalData)
      .then(() => {
        console.log("Admin Approval Accepted and User Added to database");
      })
      .catch((err: ErrorCallback) => {
        console.log(err);
      });
  };
  const handleReject = () => {
    axios
      .post("/api/rejectuser", approvalData)
      .then(() => {
        console.log("User Deleted");
      })
      .catch((err: ErrorCallback) => {
        console.log(err);
      });
  };
  const arrSize = approvalData.length;

  const data = approvalData.map((ele: any, index) => {
    return (
      <Card key={index} className="h-52">
        <CardHeader>
          <CardTitle>Approval : {index + 1}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">Username : {ele.username}</div>
          <div className="space-y-1">Email : {ele.email}</div>
        </CardContent>
        <CardFooter className="flex gap-x-1">
          <Button onClick={handleAccept} type="submit">
            Accept
          </Button>
          <Button onClick={handleReject} type="submit">
            Reject
          </Button>
        </CardFooter>
      </Card>
    );
  });

  return (
    <div className="flex flex-1 justify-evenly w-full">
      {arrSize && data}
      {!arrSize && <div>No Pending Approval</div>}
    </div>
  );
};

export default Approval;
