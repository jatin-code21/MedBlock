import React, { useState } from "react";
import "../styles/bookappointment.css";
import ABI from "../artifacts/contracts/Upload.sol/Upload.json";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { ethers } from "ethers";

const BookAppointment = ({ setModalOpen, ele, contract }) => {
  const [formDetails, setFormDetails] = useState({
    date: "",
    time: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const bookAppointment = async (e) => {
    e.preventDefault();
    if (!window.ethereum) {
      toast.error("Metamask is not installed");
    }
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    // const amountToSend = ethers.parseEther("0.01");
    // const provider = new ethers.BrowserProvider(window.ethereum);
    // const signer = provider.getSigner();
    
    try {
      // const txResponse = await signer.sendTransaction(tx);
      // await provider.waitForTransaction(txResponse.hash);
      console.log("check 1");
      // await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const tx = {
      to: contractAddress,
      value: ethers.parseEther("0.01"),
    }
    console.log(tx)
    // console.log('check 2')
    // const transactionResponse = await signer.sendTransaction(tx);
    // await provider.waitForTransaction(transactionResponse.hash);
    // console.log('check 3')
      // const contract = new ethers.Contract(contractAddress, abi, signer);
      await toast.promise(
        axios.post(
          "/appointment/bookappointment",
          {
            doctorId: ele?.userId?._id,
            date: formDetails.date,
            time: formDetails.time,
            doctorname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment booked successfully",
          error: "Unable to book appointment",
          loading: "Booking appointment...",
        }
      );
      setModalOpen(false);
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <div className="modal flex-center">
        <div className="modal__content">
          <h2 className="page-heading">Book Appointment</h2>
          <IoMdClose
            onClick={() => {
              setModalOpen(false);
            }}
            className="close-btn"
          />
          <div className="register-container flex-center book">
            <form className="register-form">
              <input
                type="date"
                name="date"
                className="form-input"
                value={formDetails.date}
                onChange={inputChange}
              />
              <input
                type="time"
                name="time"
                className="form-input"
                value={formDetails.time}
                onChange={inputChange}
              />
              <button
                type="submit"
                className="btn form-btn"
                onClick={bookAppointment}
              >
                book
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
