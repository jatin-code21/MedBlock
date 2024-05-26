import { useState } from "react";
import axios from "axios";
import Navabar from "../components/Navbar";
import Modal from "../components/Modal";
import DataDisplay from "../components/DataDisplay";
import "../styles/recordsUpload.css";
const RecordsUpload = ({ contract, account, provider }) => {
  console.log(account);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No record selected");
  const [modalOpen, setModalOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData(); // object is being created
        formData.append("file", file); // key value pair is being added with name file

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "f813423761bed322bbb6",
            pinata_secret_api_key:
              "3c305c2951778f081997f2a5adc5260a52a1e4a1963f50e199b3cfb94756aa26",
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.add(account, ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No record selected"); // this and below are for resetting the form state
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <>
      <Navabar />
      <div className="pageName">
        <h1>Upload the Record</h1>
      </div>
      <div className="top">
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="file-upload" className="choose">
            Choose Record you want to Upload
          </label>
          <input
            disabled={!account}
            type="file"
            id="file-upload"
            name="data"
            onChange={retrieveFile}
          />
          <span className="textArea">Record: {fileName}</span>
          <button type="submit" className="upload" disabled={!file}>
            Upload The Record
          </button>
        </form>
      </div>
      <div className="shareButton">
        {!modalOpen && (
          <button className="share" onClick={() => setModalOpen(true)}>
            Share with Different Address/User
          </button>
        )}
        {modalOpen && (
          <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
        )}
      </div>
      <DataDisplay contract={contract} account={account}></DataDisplay>
    </>
  );
};
export default RecordsUpload;
