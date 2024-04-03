import React, { useEffect, useState } from "react";
import CurrencyDropdown from "./CurrencyDropdown";
import { MdSwapHorizontalCircle } from "react-icons/md";

function CurrencyConvertor() {
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setTocurrency] = useState("USD");
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [converting, setConverting] = useState(false);
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || ["INR", "USD"]
  );

  console.log(fromCurrency);
  console.log(toCurrency);
  console.log(favourites);

  // to set input value blank
  const handleFocus = () => {
    setAmount("");
  };

  const handleBlur = () => {
    setAmount(amount);
  };

  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log(error);
    }
  };

  // for converting the amount
  const currencyConverter = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      console.log(data);
      setConvertedAmount(data.rates[toCurrency]);
    } catch (error) {
      console.log(error);
    }
  };

  // for swapping

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setTocurrency(fromCurrency);
  };

  // to add favourite currencies

  const handleFavourite = (currency) => {
    let updatedFavourites = [...favourites];
    if (updatedFavourites.includes(currency)) {
      updatedFavourites.filter((fav) => fav !== currency);
    } else {
      updatedFavourites.push(currency);
    }
    localStorage.setItem("favourites", JSON.stringify(favourites));
    setFavourites(updatedFavourites);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    setConvertedAmount(0);
  }, [amount]);

  console.log(currencies);
  return (
    <div className="max-w-lg flex flex-col gap-5 rounded-md shadow-sm bg-gray-100 mx-auto p-10">
      <h2 className="text-2xl text-center tracking-wider">
        Currency Convertor
      </h2>
      <div className="flex justify-between">
        <CurrencyDropdown
          currencies={currencies}
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          title="From"
          favourites={favourites}
          handleFavourite={handleFavourite}
        />
        <button onClick={swapCurrencies} className="text-3xl md:text-5xl">
          <MdSwapHorizontalCircle />
        </button>
        <CurrencyDropdown
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setTocurrency}
          title="To"
          favourites={favourites}
          handleFavourite={handleFavourite}
        />
      </div>
      <div className="grid md:grid-cols-3 place-items-center">
        <div>
          <label
            htmlFor="Amount"
            className="block text-xl font-semibold m-1 md:text-sm">
            Amount
          </label>
          <input
            className=" w-full rounded-md shadow-sm p-2 border-2  focus:outline-none focus:ring-2 focus:ring-black my-2"
            type="number"
            value={amount}
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className="flex justify-center sm:m-2 hover:text-gray-500  ">
          <button
            className="flex items-center justify-center border-2 border-black p-2 md:mt-6  rounded-md shadow-md focus:border-none focus:ring-2 focus:ring-indigo-500 uppercase text-xl hover:bg-black hover:text-white"
            onClick={currencyConverter}>
            Convert
          </button>
        </div>
        <div>
          <label
            htmlFor="Amount"
            className="block font-semibold m-1 text-xl md:text-sm">
            Converted Amount
          </label>
          <input
            value={convertedAmount}
            className=" w-full rounded-md shadow-sm p-2 border-2  focus:outline-none focus:ring-2 focus:ring-black my-2
            "
            type="number"
            placeholder="Amount"
            readOnly
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  );
}

export default CurrencyConvertor;

// 1. heading
// 2. dropdown
