"use client"
import React, { useEffect, useState } from "react";

export default function Review({ title }) {
  const [active, setActive] = useState(true);
  const [viewmore,setViewMore] = useState(false);
  const [display,setDisplay] = useState(false);
  const[showView,setShowView] = useState(true);

  function handleActive() {
    setActive(!active);
  }  
  function handleViewMore(){
    setViewMore(!viewmore);
  }

  const data=[
    {
        img:'',
        rating:5,
        review:"Loremsxdcfvgbhnikolp[;pojoihc gvhbjnkl;lvfcfcvgbjkl;lgghbnm,.kjhgnkml,",
        title:'sdfghjklghjkldfghjksdfgh',
        username:'qwertyuio',
        like:3,
        dislike:0,
    },
    {
        img:'',
        rating:5,
        review:"Loremsxdcfvgbhnikolp[;pojoihc gvhbjnkl;lvfcfcvgbjkl;lgghbnm,.kjhgnkml,",
        title:'sdfghjklghjkldfghjksdfgh',
        username:'qwertyuio',
        like:3,
        dislike:0,
    },
    {
        img:'',
        rating:4,
        review:"Loremsxdcfvgbhnikolp[;pojoihc gvhbjnkl;lvfcfcvgbjkl;lgghbnm,.kjhgnkml,",
        title:'sdfghjklghjkldfghjksdfgh',
        username:'qwertyuio',
        like:3,
        dislike:0,
    },
    {
        img:'',
        rating:4,
        review:"Loremsxdcfvgbhnikolp[;pojoihc gvhbjnkl;lvfcfcvgbjkl;lgghbnm,.kjhgnkml,",
        title:'sdfghjklghjkldfghjksdfgh',
        username:'qwertyuio',
        like:3,
        dislike:0,
    },{
        img:'',
        rating:4,
        review:"Loremsxdcfvgbhnikolp[;pojoihc gvhbjnkl;lvfcfcvgbjkl;lgghbnm,.kjhgnkml,",
        title:'sdfghjklghjkldfghjksdfgh',
        username:'qwertyuio',
        like:3,
        dislike:0,
    },{
        img:'',
        rating:4,
        review:"Loremsxdcfvgbhnikolp[;pojoihc gvhbjnkl;lvfcfcvgbjkl;lgghbnm,.kjhgnkml,",
        title:'sdfghjklghjkldfghjksdfgh',
        username:'qwertyuio',
        like:3,
        dislike:0,
    },
  ]


 useEffect(()=>{
    if(data.length>3)
        {
            setDisplay(true);
            if(data.length<7)
            setShowView(false);

        }
        
        else {
            setDisplay(false);
            setShowView(false);
        }
 },[])
  
  return (
    <div className="xl:h-[1320px] w-full bg-[#F7FEFD] ">
      <div className="md:h-[450px] h-[160px] flex flex-col gap-4 w-full  md:py-4 md:px-20 px-6">
        <p className=" text-[42px] font-semibold md:block hidden">Review For {title}</p>
        <p className="md:hidden text-[42px] font-semibold">Customer Review</p>
        <div className="flex  lg:flex-row md:flex-col md:gap-10 xl:h-[350px]   w-full ">
          <div className="h-full w-[400px] ">
            <p className="md:block hidden text-[17px] font-medium">Customer Reviews</p>
            <div className="h-[30px]  w-[220px] flex ">
              <svg
                className="text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
                />
              </svg>
              <svg
                className="text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
                />
              </svg>
              <svg
                className="text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
                />
              </svg>
              <svg
                className="text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 15.39l-3.76 2.27l.99-4.28l-3.32-2.88l4.38-.37L12 6.09l1.71 4.04l4.38.37l-3.32 2.88l.99 4.28M22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.45 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03z"
                />
              </svg>
              <svg
                className="text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 15.39l-3.76 2.27l.99-4.28l-3.32-2.88l4.38-.37L12 6.09l1.71 4.04l4.38.37l-3.32 2.88l.99 4.28M22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.45 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03z"
                />
              </svg>
              <p className="ml-2 text-[18px] ">3 out of 5</p>
            </div>
            <p className="text-[#5c5c5c] text-sm">1,689 global rating</p>
            <div className="md:block hidden">
            <div className="w-[300px] h-[40px] flex items-center gap-3 text-sm ">
              <p>5 Star</p>
              <div className="w-[200px] h-[20px] rounded-md bg-white  border">
                <div className="w-[80px] rounded-l-md h-[18px] bg-[#C9184A]"></div>
              </div>
              <p>45%</p>
            </div>
            <div className="w-[300px] h-[40px] flex items-center gap-3 text-sm ">
              <p>4 Star</p>
              <div className="w-[200px] h-[20px] rounded-md  bg-white border">
                <div className="w-[32px] rounded-l-md h-[18px] bg-[#C9184A]"></div>
              </div>
              <p>18%</p>
            </div>
            <div className="w-[300px] h-[40px] flex items-center gap-3 text-sm ">
              <p>3 Star</p>
              <div className="w-[200px] h-[20px] rounded-md bg-white  border">
                <div className="w-[16px] rounded-l-md h-[18px] bg-[#C9184A]"></div>
              </div>
              <p>9%</p>
            </div>
            <div className="w-[300px] h-[40px] flex items-center gap-3 text-sm ">
              <p>2 Star</p>
              <div className="w-[200px] h-[20px] rounded-md bg-white border">
                <div className="w-[10px] rounded-l-md h-[18px] bg-[#C9184A]"></div>
              </div>
              <p>6%</p>
            </div>
            <div className="w-[300px] h-[40px] flex items-center gap-3 text-sm ">
              <p>1 Star</p>
              <div className="w-[200px] h-[20px] rounded-md bg-white border">
                <div className="w-[30px] rounded-l-md h-[18px] bg-[#C9184A]"></div>
              </div>
              <p>22%</p>
            </div></div>
          </div>
          <div className=" md:flex  hidden xl:justify-center h-[320px] xl:w-[780px]  md:w-[610px]">
            <div className=" flex flex-col gap-2 h-[320px] xl:w-[700px] md:w-[530px]">
              <p className="text-[17px] font-semibold">Review{title}</p>
              <p className="text-sm font-medium">
                Share your thoughts with other customers
              </p>
              <textarea
                className="border border-[#D7D7D7] rounded-md xl:w-[620px] md:[500px]  px-2 py-2 text-sm"
                rows={8}
                name=""
                id=""
              ></textarea>
              <div className=" h-[70px] flex justify-end items-center gap-4 xl:w-[620px] md:[530px]">
                <button className="border border-[#C9184A] text-[15px] font-medium text-pink-800 h-[37px] w-[126px] rounded-3xl">
                  Add Photos
                </button>
                <button className="bg-gradient-to-r from-[#FFB5A7] to-[#C9184A] text-[15px] font-medium text-white bg-pink-600 h-[37px] w-[126px] rounded-3xl">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-[820px] lg:mt-0 md:mt-80 w-full md:py-4 md:px-20 px-6">
        <div className="md:h-[110px] h-[80px] w-full">
          <div className="md:block hidden h-[40px]  w-[full] border-b-2 z-20 border-[#cacaca]">
            <div
              onClick={() => handleActive()}
              className=" h-[30px] w-[110px] md:flex gap-2 items-center hidden"
            >
              <p className="underline">Sort&Filter</p>
              {active ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="m2.931 10.843l4.685-4.611a.546.546 0 0 1 .768 0l4.685 4.61a.55.55 0 0 0 .771 0a.53.53 0 0 0 0-.759l-4.684-4.61a1.65 1.65 0 0 0-2.312 0l-4.684 4.61a.53.53 0 0 0 0 .76a.55.55 0 0 0 .771 0"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="currentColor"
                    d="M831.872 340.864L512 652.672L192.128 340.864a30.59 30.59 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.59 30.59 0 0 0-42.752 0z"
                  />
                </svg>
              )}
            </div>
          </div>
          <div
            className={` duration-300 h-[70px] flex md:gap-4 gap-3 items-center pb-10 md:p-0 ${
              active? `opacity-100 translate-y-0`: ` z-0 fixed -translate-y-10`
            }  w-[full] bg-slate-5`}
          >
            <div className=" h-[64px] md:h-[46px] w-[150px] border rounded-md bg-slate-200 border-[#cacaca]  px-2 ">
              <p className="md:text-sm text-[12px]">Sortby </p>
              <select className="bg-slate-200 text-[12px]" name="" id="">
                <option className="md:text-sm " value="">Most Recent</option>
                <option value=""></option>
                <option value=""></option>
              </select>

            </div>
            <div className=" h-[64px] md:h-[46px] w-[150px] border rounded-md bg-slate-200 border-[#cacaca]  px-2 ">
              <p className="md:text-sm text-[12px]">Hotel Experience</p>
              <select className="bg-slate-200 text-[12px]" name="" id="">
                <option  value="">All</option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
            <div className=" h-[64px] md:h-[46px] w-[150px] border rounded-md bg-slate-200  border-[#cacaca] px-2 ">
              <p className="text-sm">Rating</p>
              <select className="bg-slate-200 text-[12px]" name="" id="">
                <option value="">All</option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
            <div className=" flex items-center justify-center gap-2 h-[64px] md:h-[46px] w-[150px]  rounded-md bg-slate-200  px-2 ">
              <input className="text-[12px]" type="checkbox" name="" id="" />
              <p>With Media</p>
            </div>
          </div>
        </div>

        <div className={` flex flex-wrap justify-center gap-4 ${display ? 'h-[620px]' : 'h-[320px]'} w-full ${viewmore ? 'overflow-y-scroll' : 'overflow-hidden'}`}>
         { data.map((items)=>{
            return(
                <div className="bg-white h-[300px] w-[372px] rounded-md px-2 py-2" key={items.title}>
            <div className="flex h-[65px] gap-2 w-[full] px-1 border-b-2 border-[#d1d0d0]  items-center justify-between">
              <img className="rounded-[50%] h-[40px] w-[40px]" src={items.img} alt="" />
              <div className="">
                <p>{items.username}</p>
                <p className="text-[10px] flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15"><path fill="#C9184A" fill-rule="evenodd" d="M0 7.5a7.5 7.5 0 1 1 15 0a7.5 7.5 0 0 1-15 0m7.072 3.21l4.318-5.398l-.78-.624l-3.682 4.601L4.32 7.116l-.64.768z" clip-rule="evenodd"/></svg>{items.title}</p>
                
              </div>
              <div className={`h-[30px] [&>svg:nth-child(-n+${items.rating})]:text-[#C9184A] w-[120px] flex `}>
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="#C9184A" fill-opacity="0.25" stroke="currentColor" d="M10.144 6.628c.786-1.961 1.18-2.942 1.856-2.942c.676 0 1.07.98 1.856 2.942l.037.09c.444 1.109.666 1.663 1.12 2c.452.336 1.047.39 2.236.496l.214.019c1.946.174 2.92.261 3.127.88c.209.62-.514 1.277-1.96 2.591l-.481.44c-.732.665-1.098.998-1.268 1.434a2.002 2.002 0 0 0-.08.25c-.111.454-.004.937.21 1.902l.067.3c.393 1.775.59 2.662.247 3.045a1 1 0 0 1-.481.296c-.496.136-1.2-.438-2.61-1.586c-.925-.754-1.388-1.131-1.919-1.216a1.997 1.997 0 0 0-.63 0c-.532.085-.994.462-1.92 1.216c-1.408 1.148-2.113 1.722-2.609 1.586a1 1 0 0 1-.48-.296c-.344-.383-.147-1.27.246-3.044l.067-.301c.214-.966.321-1.448.21-1.903a2.002 2.002 0 0 0-.08-.25c-.17-.435-.536-.768-1.268-1.434l-.482-.439c-1.445-1.314-2.168-1.972-1.96-2.59c.209-.62 1.182-.707 3.128-.881l.214-.02c1.19-.106 1.784-.159 2.237-.496c.453-.336.675-.89 1.12-1.998z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" fill-opacity="0.25" stroke="currentColor" d="M10.144 6.628c.786-1.961 1.18-2.942 1.856-2.942c.676 0 1.07.98 1.856 2.942l.037.09c.444 1.109.666 1.663 1.12 2c.452.336 1.047.39 2.236.496l.214.019c1.946.174 2.92.261 3.127.88c.209.62-.514 1.277-1.96 2.591l-.481.44c-.732.665-1.098.998-1.268 1.434a2.002 2.002 0 0 0-.08.25c-.111.454-.004.937.21 1.902l.067.3c.393 1.775.59 2.662.247 3.045a1 1 0 0 1-.481.296c-.496.136-1.2-.438-2.61-1.586c-.925-.754-1.388-1.131-1.919-1.216a1.997 1.997 0 0 0-.63 0c-.532.085-.994.462-1.92 1.216c-1.408 1.148-2.113 1.722-2.609 1.586a1 1 0 0 1-.48-.296c-.344-.383-.147-1.27.246-3.044l.067-.301c.214-.966.321-1.448.21-1.903a2.002 2.002 0 0 0-.08-.25c-.17-.435-.536-.768-1.268-1.434l-.482-.439c-1.445-1.314-2.168-1.972-1.96-2.59c.209-.62 1.182-.707 3.128-.881l.214-.02c1.19-.106 1.784-.159 2.237-.496c.453-.336.675-.89 1.12-1.998z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" fill-opacity="0.25" stroke="currentColor" d="M10.144 6.628c.786-1.961 1.18-2.942 1.856-2.942c.676 0 1.07.98 1.856 2.942l.037.09c.444 1.109.666 1.663 1.12 2c.452.336 1.047.39 2.236.496l.214.019c1.946.174 2.92.261 3.127.88c.209.62-.514 1.277-1.96 2.591l-.481.44c-.732.665-1.098.998-1.268 1.434a2.002 2.002 0 0 0-.08.25c-.111.454-.004.937.21 1.902l.067.3c.393 1.775.59 2.662.247 3.045a1 1 0 0 1-.481.296c-.496.136-1.2-.438-2.61-1.586c-.925-.754-1.388-1.131-1.919-1.216a1.997 1.997 0 0 0-.63 0c-.532.085-.994.462-1.92 1.216c-1.408 1.148-2.113 1.722-2.609 1.586a1 1 0 0 1-.48-.296c-.344-.383-.147-1.27.246-3.044l.067-.301c.214-.966.321-1.448.21-1.903a2.002 2.002 0 0 0-.08-.25c-.17-.435-.536-.768-1.268-1.434l-.482-.439c-1.445-1.314-2.168-1.972-1.96-2.59c.209-.62 1.182-.707 3.128-.881l.214-.02c1.19-.106 1.784-.159 2.237-.496c.453-.336.675-.89 1.12-1.998z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" fill-opacity="0.25" stroke="currentColor" d="M10.144 6.628c.786-1.961 1.18-2.942 1.856-2.942c.676 0 1.07.98 1.856 2.942l.037.09c.444 1.109.666 1.663 1.12 2c.452.336 1.047.39 2.236.496l.214.019c1.946.174 2.92.261 3.127.88c.209.62-.514 1.277-1.96 2.591l-.481.44c-.732.665-1.098.998-1.268 1.434a2.002 2.002 0 0 0-.08.25c-.111.454-.004.937.21 1.902l.067.3c.393 1.775.59 2.662.247 3.045a1 1 0 0 1-.481.296c-.496.136-1.2-.438-2.61-1.586c-.925-.754-1.388-1.131-1.919-1.216a1.997 1.997 0 0 0-.63 0c-.532.085-.994.462-1.92 1.216c-1.408 1.148-2.113 1.722-2.609 1.586a1 1 0 0 1-.48-.296c-.344-.383-.147-1.27.246-3.044l.067-.301c.214-.966.321-1.448.21-1.903a2.002 2.002 0 0 0-.08-.25c-.17-.435-.536-.768-1.268-1.434l-.482-.439c-1.445-1.314-2.168-1.972-1.96-2.59c.209-.62 1.182-.707 3.128-.881l.214-.02c1.19-.106 1.784-.159 2.237-.496c.453-.336.675-.89 1.12-1.998z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" fill-opacity="0.25" stroke="currentColor" d="M10.144 6.628c.786-1.961 1.18-2.942 1.856-2.942c.676 0 1.07.98 1.856 2.942l.037.09c.444 1.109.666 1.663 1.12 2c.452.336 1.047.39 2.236.496l.214.019c1.946.174 2.92.261 3.127.88c.209.62-.514 1.277-1.96 2.591l-.481.44c-.732.665-1.098.998-1.268 1.434a2.002 2.002 0 0 0-.08.25c-.111.454-.004.937.21 1.902l.067.3c.393 1.775.59 2.662.247 3.045a1 1 0 0 1-.481.296c-.496.136-1.2-.438-2.61-1.586c-.925-.754-1.388-1.131-1.919-1.216a1.997 1.997 0 0 0-.63 0c-.532.085-.994.462-1.92 1.216c-1.408 1.148-2.113 1.722-2.609 1.586a1 1 0 0 1-.48-.296c-.344-.383-.147-1.27.246-3.044l.067-.301c.214-.966.321-1.448.21-1.903a2.002 2.002 0 0 0-.08-.25c-.17-.435-.536-.768-1.268-1.434l-.482-.439c-1.445-1.314-2.168-1.972-1.96-2.59c.209-.62 1.182-.707 3.128-.881l.214-.02c1.19-.106 1.784-.159 2.237-.496c.453-.336.675-.89 1.12-1.998z"/></svg>
            </div>
            </div>
            <div className="h-[220px] w-full overflow-y-scroll ">
                <div className=" h-[30px] w-full flex justify-between px-1 ">
                    <div className="flex  gap-1 h-[30px] items-center w-[100px] bg-blue-300">
                        <div className="flex items-center justify-center"><svg className="text-pink-700" xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24"><path fill="#C9184A" d="M7.24 11v9H5.63c-.9 0-1.62-.72-1.62-1.61v-5.77c0-.89.73-1.62 1.62-1.62zM18.5 9.5h-4.78V6c0-1.1-.9-2-1.99-2h-.09c-.4 0-.76.24-.92.61L7.99 11v9h9.2c.73 0 1.35-.52 1.48-1.24l1.32-7.5c.16-.92-.54-1.76-1.48-1.76Z"/></svg><p className="text-[#acaaaa]">{items.like}</p></div>
                        <div className="flex items-center justify-center"><svg className="text-pink-700" xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24"><path fill="#C9184A" d="M20 5.61v5.77c0 .89-.73 1.62-1.62 1.62h-1.61V4h1.61c.9 0 1.62.72 1.62 1.61M5.34 5.24l-1.32 7.5c-.16.92.54 1.76 1.48 1.76h4.78V18c0 1.1.9 2 1.99 2h.09c.4 0 .76-.24.92-.61L16.01 13V4h-9.2c-.73 0-1.35.52-1.48 1.24Z"/></svg><p className="text-[#aaaaaa]"> {items.dislike}</p></div>
                    </div>
                    <div><p className="text-[#afafaf] text-[12px] py-1">4 month ago</p></div>
                    
                </div>
                <p className="text-[11px] h-[30px] w-full flex items-center px-1">CBD Experience : Exprienced CBD User </p>
                <p className="mt-2 px-1 text-[15px]">{items.review}</p>
            </div>
    
          </div>
            );
         }) 
}
        
          
        </div>

        <div className={`h-[70px] w-full flex items-center ${showView ? 'block' : 'hidden'} justify-center`}><button onClick={()=>handleViewMore()} className="rounded-3xl h-[50px] border border-[#C9184A] w-[140px] text-[#C9184A] font-semibold">View {viewmore?'Less':'More'}</button></div>
      </div>
    </div>
  );
}
