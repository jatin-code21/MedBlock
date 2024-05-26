import { useState } from "react";
import "../styles/datadisplay.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log(str);
      console.log(str_array);
    //   return (
    //     <div>
    //         <h2>Data Stored: </h2>
    //     </div>
    //   )
      const images = str_array.map((item, i) => {
        // console.log(`https:/gateway.pinata.cloud/ipfs/${item.substring(6)}`);
        // console.log(`https://aqua-separate-anaconda-869.mypinata.cloud/ipfs${item.substring(6)}`)
        // console.log('check')
        // console.log(`${item.substring(33)}`);
        return (
          <>
            <div className="image-container">
              <a href={item} key={i} target="_blank">
                <img
                  key={i}
                  src={`https://aqua-separate-anaconda-869.mypinata.cloud/ipfs${item.substring(
                    33
                  )}`}
                  alt="new"
                  className="image-list"
                ></img>
              </a>
            </div>
          </>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };
  return (
    <>
      <div className="dataDisplay">
        <input
          type="text"
          placeholder="Enter Wallet Address"
          className="address"
        ></input>
        <button className="center button" onClick={getdata}>
          Get Data
        </button>
        <div className="image-list">{data}</div>
      </div>
    </>
  );
};
export default Display;
