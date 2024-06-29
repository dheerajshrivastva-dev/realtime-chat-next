'use client'
import Button, { buttonVariants } from "@/app/components/ui/Button";
import Loader from "@/app/components/ui/LoaderIos";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { TwitterPicker } from "react-color";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [size, setSize] = useState<number | string>(200);
  const [speed, setSpeed] = useState<number | string>(10);
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [selectedBgColor, setSelectedBgColor] = useState<string>('#737373'); 
  return (
    <div className="">
      <div className="px-5">
      <div className="flex flex-row items-center gap-4 my-4">
        <label className="w-[100px]" htmlFor="size">Size</label>
        <input type="range" id="size" value={size} min={10} max={500} className="bg-black text-white rounded py-2 px-2 border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onInput={(e: ChangeEvent<HTMLInputElement>) => {
          const value = isNaN(Number(e.target.value)) || 0 ? "" : Number(e.target.value)
          setSize(value)
        }}></input>
      </div>
      <div className="flex flex-row items-center gap-4 my-4">
        <label className="w-[100px]" htmlFor="speed">Speed</label>
        <input type="range" id="speed" value={speed} min={1} max={30} className="bg-black text-white rounded py-2 px-2 border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onInput={(e: ChangeEvent<HTMLInputElement>) => {
          const value = isNaN(Number(e.target.value)) || 0 ? "" : Number(e.target.value)
          setSpeed(value)
        }}></input>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 my-4">
        <div className="flex flex-row w-50 items-center gap-4">

          <label className="w-[100px]" htmlFor="Color">Color</label>
          <TwitterPicker
            color={selectedColor}
            onChangeComplete={(color : any) => setSelectedColor(color.hex)}
          />
        </div>
        <div className="flex flex-row w-50 items-center gap-4">
          <label className="w-[100px]" htmlFor="Bg-color">Bg color</label>
          <TwitterPicker
            color={selectedBgColor}
            onChangeComplete={(color : any) => setSelectedBgColor(color.hex)}
          />
        </div>
      </div>

      
      <div className="flex flex-row items-center gap-4 my-4">
        
        <label className="w-[100px]" htmlFor="Bg-color">
          <Button size="default" onClick={() => setIsLoading(a => !a)}>{isLoading ? "Stop" : "Start"}</Button>
        </label>
        <Loader isLoading={isLoading} size={Number(size)} speed={Number(speed)} color={selectedColor} bgColor={selectedBgColor}/>
      </div>
      </div>
      <div className="absolute bottom-10 w-full px-5">
        <Link href={"/login"} className={buttonVariants({variant: "default", className: "w-full p-0 m-0"})}>
          Login/Signup
        </Link>
      </div>
    </div>
  );
}
