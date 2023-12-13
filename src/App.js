import dollarIcon from "./images/icon-dollar.svg";
import personIcon from "./images/icon-person.svg";
import appLogo from "./images/logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(0);
  const [people, setPeople] = useState(0);
  const [tipPerPerson, setTipPerPerson] = useState(0);
  const [totalPerPerson, setTotalPerPerson] = useState(0);

  const [billError, setBillError] = useState("");
  const [tipError, setTipError] = useState("");
  const [peopleError, setPeopleError] = useState("");

  const handleInput = (e, setValue, setError) => {
    e.preventDefault();
    const value = e.target.value;

    if (e.nativeEvent.inputType === "deleteContentBackward" && value === "") {
      // Handle backspace and set the value to 0
      setValue(0);
      setError("");
    } else if (!/^[0-9]*(\.[0-9]*)?$/.test(value)) {
      setError("Enter a valid number");
    } else if (parseFloat(value) === 0) {
      setError("Can't be Zero");
    } else {
      setError("");

      // Special case for input tip container
      if (e.target.closest(".percentages-container")) {
        let percentage = value / 100;
        setValue(parseFloat(percentage));
        var current = document.querySelector(
          ".percentages-container button.selected"
        );
        if (current) {
          current.classList.remove("selected");
        }
      } else {
        setValue(parseFloat(value));
      }
    }
  };

  const handleTipButton = (value, e) => {
    setTip(value / 100);
    var current = document.getElementsByClassName("selected");
    setTipError("");

    var current = document.querySelector(
      ".percentages-container button.selected"
    );
    if (current) {
      current.classList.remove("selected");
    }
    e.target.classList.add("selected");
  };

  const handleBtnReset = () => {
    setBill(0);
    setTip(0);
    setPeople(0);
    setTipPerPerson(0);
    setTotalPerPerson(0);
    setBillError("");
    setTipError("");
    setPeopleError("");
    const resetBtn = document.getElementsByClassName("reset-btn");
    resetBtn[0].classList.remove("active");
  };

  useEffect(() => {
    const calculateTip = () => {
      //tip amount
      const calculateTipAmount = bill * tip;
      const calculatedTipPerPerson = calculateTipAmount / people;
      setTipPerPerson(calculatedTipPerPerson.toFixed(2));

      const calculatedTotalPerPerson = (bill + calculateTipAmount) / people;
      const test = bill + calculateTipAmount;

      console.log(bill, tip, people, "test");
      setTotalPerPerson(calculatedTotalPerPerson.toFixed(2));
    };

    if (bill !== 0 && tip !== 0 && people !== 0) {
      calculateTip();
    }

    if (bill !== 0 || tip !== 0 || people !== 0) {
      const resetBtn = document.getElementsByClassName("reset-btn");
      resetBtn[0].classList.add("active");
    }
  }, [bill, tip, people, tipPerPerson, totalPerPerson]);

  return (
    <body>
      <img class="main-logo" src={appLogo} alt="application logo" />

      <section className="card">
        <section className="input-section">
          <div>
            <div className="eMessageContainer">
              <p>Bill</p>
              <p>{billError}</p>
            </div>
            <input
              style={{
              borderColor: bill == 0
                  ? 'orange'
                  : 'black',
              borderWidth: 1,
          }}
              type="number"
              min={0}
              step="0.01"
              onChange={(e) => {
                handleInput(e, setBill, setBillError);
              }}
              placeholder={bill == 0 ? "0" : ""}
              value={bill !== 0 ? bill : ""}
            />
            {/* <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => handleInput(e, setBill, setBillError)}
              placeholder={bill == 0 ? "0" : ""}
              value={bill !== 0 ? bill : ""}
            /> */}
            <img className="svg-dollar" src={dollarIcon} />
          </div>

          <div>
            <div className="eMessageContainer">
              <p>Select Tip %</p>
              <p>{tipError}</p>
            </div>
            <section className="percentages-container">
              <button onClick={(e) => handleTipButton(5, e)}>5%</button>
              <button onClick={(e) => handleTipButton(10, e)}>10%</button>
              <button onClick={(e) => handleTipButton(15, e)}>15%</button>
              <button onClick={(e) => handleTipButton(25, e)}>25%</button>
              <button onClick={(e) => handleTipButton(50, e)}>50%</button>
              <input
              type="number"
              min={0}
              onChange={(e) => handleInput(e, setTip, setTipError)}
              placeholder={tip == 0 ? "Custom" : ""}
              value={tip !== 0 ? tip * 100 : ""}
            />
              {/* <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                onChange={(e) => handleInput(e, setTip, setTipError)}
                placeholder={tip == 0 ? "Custom" : ""}
                value={tip !== 0 ? tip : ""}
              /> */}
            </section>
          </div>

          <div>
            <div className="eMessageContainer">
              <p>Number of People</p>
              <p>{peopleError}</p>
            </div>
            <input
              type="number"
              min={0}
              step="0.01"
              onChange={(e) => handleInput(e, setPeople, setPeopleError)}
              placeholder={people == 0 ? "0" : ""}
              value={people !== 0 ? people : ""}
            />
            {/* <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => handleInput(e, setPeople, setPeopleError)}
              placeholder={people == 0 ? "0" : ""}
              value={people !== 0 ? people : ""}
            /> */}
            <img className="svg-person" src={personIcon} />
          </div>
        </section>

        <section class="display-amount-section">
          <div class="tip-amount-top-section">
            <div>
              <div class="wording-container">
                <p>Tip Amount</p>
                <p>/ person</p>
              </div>
              <h3 class="tip-amount-number">${tipPerPerson}</h3>
            </div>

            <div>
              <div class="wording-container">
                <p>Total</p>
                <p>/ person</p>
              </div>
              <h3 class="total-amount-number">${totalPerPerson}</h3>
            </div>
          </div>

          <button
            class="reset-btn"
            onClick={() => {
              handleBtnReset();
            }}
          >
            Reset
          </button>
        </section>
      </section>

      <div class="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Anthony Sanchez</a>.
      </div>
    </body>
  );
}

export default App;
