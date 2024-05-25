import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./styles/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { Protected, Public, Admin } from "./middleware/route";
import React, { lazy, Suspense } from "react";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Appointments = lazy(() => import("./pages/Appointments"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Profile = lazy(() => import("./pages/Profile"));
const Notifications = lazy(() => import("./pages/Notifications"));
const ApplyDoctor = lazy(() => import("./pages/ApplyDoctor"));
const EnterUserDetails = lazy(() => import("./pages/EnterUserDetails"));
const Error = lazy(() => import("./pages/Error"));
const RecordsUpload = lazy(() => import("./pages/RecordsUpload"));

function App() {
  const [account, setAccount] = useState(""); // address of currently connected account
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum); // use to only read the content from blockchain

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []); // as soon as page loads, metamask will be opened
        const signer = await provider.getSigner(); // use to write the content
        // console.log('before address')
        const address = await signer.getAddress();
        // console.log('after address')
        setAccount(address);
        // console.log('after setting address')
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // had to change this everytime when you restart the local blockchain

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        alert("Metamask is not installed");
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <Router>
      <Toaster />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={
              <Public>
                <Register />
              </Public>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route
            path="/appointments"
            element={
              <Protected>
                <Appointments />
              </Protected>
            }
          />
          <Route
            path="/notifications"
            element={
              <Protected>
                <Notifications />
              </Protected>
            }
          />
          <Route
            path="/records"
            element={
              <Protected>
                <RecordsUpload contract={contract} account={account} provider={provider} />
              </Protected>
            }
          />
          <Route
            path="/applyfordoctor"
            element={
              <Protected>
                <ApplyDoctor />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="/dashboard/users"
            element={
              <Admin>
                <Dashboard type={"users"} />
              </Admin>
            }
          />
          <Route
            path="/dashboard/doctors"
            element={
              <Admin>
                <Dashboard type={"doctors"} />
              </Admin>
            }
          />
          <Route
            path="/dashboard/appointments"
            element={
              <Protected>
                <Dashboard type={"appointments"} />
              </Protected>
            }
          />
          <Route
            path="/dashboard/applications"
            element={
              <Protected>
                <Dashboard type={"applications"} />
              </Protected>
            }
          />
          <Route
            path="/enterUserDetails"
            element={
              <Protected>
                {" "}
                <EnterUserDetails />{" "}
              </Protected>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
