import React, { useState } from "react";
import { ethers } from "ethers";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function EnterUserDetails() {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confpassword: "",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };


  const onUpload = async (element) => {
    setLoading(true);
    if (element.type === "image/jpeg" || element.type === "image/png") {
      const data = new FormData();
      data.append("file", element);
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
      fetch(process.env.REACT_APP_CLOUDINARY_BASE_URL, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => setFile(data.url.toString()));
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Please select an image in jpeg or png format");
    }
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log('sign up button is clicked');
      console.log('file:', file);
      console.log(loading)
      if (loading) return;
      // if (file === "") return;
      const { firstname, lastname, email, password, confpassword } =
        formDetails;
      if (!firstname || !lastname || !email || !password || !confpassword) {
        return toast.error("Input field should not be empty");
      } else if (firstname.length < 3) {
        return toast.error("First name mus`t be at least 3 characters long");
      } else if (lastname.length < 3) {
        return toast.error("Last name must be at least 3 characters long");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      } else if (password !== confpassword) {
        return toast.error("Passwords do not match");
      }
      // console.log("before metamask")
      // await window.ethereum.request({ method: "eth_requestAccounts" })
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // const signer = await provider.getSigner();
      // let walletAddress = await signer.getAddress();
      // walletAddress = walletAddress.toString()
      // console.log("After metamask")
      await toast.promise(
        axios.post("/user/register", {
          firstname,
          lastname,
          email,
          password,
          pic: file,
        }),
        {
          pending: "Registering user...",
          success: "User registered successfully",
          error: "Unable to register user",
          loading: "Registering user...",
        }
      );
      return navigate("/login");
    } catch (error) {}
  };

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <h2 className="form-heading">Enter the Patient Details</h2>
        <form onSubmit={formSubmit} className="register-form">
          <input          
            type="text"
            name="firstname"
            className="form-input"
            placeholder="Enter patient's first name"
            value={formDetails.firstname}
            onChange={inputChange}
          />
          <input
            type="text"
            name="lastname"
            className="form-input"
            placeholder="Enter patient's last name"
            value={formDetails.lastname}
            onChange={inputChange}
          />
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter patient's email"
            value={formDetails.email}
            onChange={inputChange}
          />
          <input
            type="file"
            onChange={(e) => onUpload(e.target.files[0])}
            name="profile-pic"
            id="profile-pic"
            className="form-input"
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter patient's password"
            value={formDetails.password}
            onChange={inputChange}
          />
          <input
            type="password"
            name="confpassword"
            className="form-input"
            placeholder="Retype the above password"
            value={formDetails.confpassword}
            onChange={inputChange}
          />
          <button
            type="submit"
            className="btn form-btn"
            disabled={loading ? true : false}
            // disabled={true}
          >
            Register Patient
          </button>
        </form>
        <p>
          Already a user?{" "}
          <NavLink className="login-link" to={"/login"}>
            Log in
          </NavLink>
        </p>
      </div>
    </section>
  );
}

export default EnterUserDetails;
