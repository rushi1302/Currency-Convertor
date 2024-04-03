import React from "react";
import { HiOutlineStar } from "react-icons/hi";
import { HiStar } from "react-icons/hi";

function CurrencyDropdown({
  currencies,
  currency,
  title,
  setCurrency,
  favourites,
  handleFavourite,
}) {
  const isFav = (curr) => {
    console.log("clicked");
    favourites.includes(curr);
  };

  return (
    <div>
      <label htmlFor={title} className="text-xl tracking-wider ml-2">
        {title}
      </label>
      <div
        className="relative flex justify-center items-center mt-2
      ">
        <select
          className="min-w-20 focus:outline-none rounded-md shadow-sm focus:ring-2 focus:ring-black p-3 overflow-y-scroll "
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}>
          {favourites.map((fav) => {
            return <option key={fav}>{fav}</option>;
          })}
          <hr />
          {currencies
            .filter((curr) => !favourites.includes(curr))
            .map((currency) => {
              return (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              );
            })}
        </select>
        <button
          onClick={() => handleFavourite(currency)}
          className="absolute right-4 bottom-[3.5]">
          {isFav(currency) ? <HiStar /> : <HiOutlineStar />}
          {/* <HiStar /> */}
        </button>
      </div>
    </div>
  );
}

export default CurrencyDropdown;
