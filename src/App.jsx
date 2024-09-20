import { useRef } from "react";
import { useCallback, useEffect, useState } from "react";
import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [noAllowed, setnoAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setpassword] = useState();


  const passwrdRef=useRef(null);

  const passGen = useCallback(() => {
    let pass=""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (noAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_-+={[}]/<>";

    for (let index = 1; index<length; index++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);}
      
      setpassword(pass)
    }, [noAllowed, length, charAllowed, setpassword]);

    const copy=useCallback(()=>{
        window.navigator.clipboard.writeText(password)
    },[ password])


    useEffect(()=>{
      passGen()
    }, [length, noAllowed, charAllowed, passGen])


  return (
    <>
      <h1 className=" head text-4xl  text-center text-fuchsia-300  font-bold font-mono mt-12 mb-12 pb-4 ">
        Password Generator
      </h1>

      <div className="max-w-lg container mt-20 my-auto rounded-lg shadow-2xl mx-auto px-11 shadow-slate-600 bg-gray-900  align-middle  ">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full rounded-l-2xl py-1 px-3 border-indigo-900 border-4 my-6 h-20 shadow-inner  bg-indigo-200 shadow-indigo-900"
            placeholder="password"
            readOnly
          />
          <button 
          className=" btn bg-indigo-500 rounded-r-2xl text-white shrink-0 py-0.5 my-6 border-indigo-800 border-4 px-6 "
          onClick={copy}>
            Copy
          </button>
        </div>
        <div className="flex flex-wrap text-sm gap-x-2">
          <div className="flex flex-nowrap items-center gap-x-1">
            <input
              type="range"
              className="mb-3 ml-3 cursor-pointer w-16"
              min={5}
              max={100}
              value={length}
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label className="text-violet-300 font-serif mb-3">
              Length:({length})
            </label>
          </div>
          <div className="flex flex-nowrap items-center gap-x-1">
            <input
              type="checkbox"
              className="mb-3 ml-3"
              defaultChecked={noAllowed}
              id="numberinput"
              onChange={() => {
                setnoAllowed((prev) => !prev);
              }}
            />
            <label className="text-violet-300 font-serif mb-3 "> Number</label>
          </div>

          <div className="flex flex-nowrap items-center gap-x-1">
            <input
              type="checkbox"
              className="mb-3 ml-3"
              defaultChecked={charAllowed}
              id="charinput"
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />
            <label className="text-violet-300 font-serif mb-3 ">
              Special_Character
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
