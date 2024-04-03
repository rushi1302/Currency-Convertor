import CurrencyConvertor from "./components/CurrencyConvertor";

function App() {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center gap-12">
      <h2 className="text-2xl md:text-4xl text-center ">
        INTERNATIONAL CURRENCY CONVERTOR APP
      </h2>
      <CurrencyConvertor />
    </div>
  );
}

export default App;

// 1. create currency convertor component.
