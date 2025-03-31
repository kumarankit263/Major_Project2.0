import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGooglePlusG } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-red-900 text-white h-12 px-4 md:px-12 text-center flex flex-row items-center justify-between">
        <p className="font-semibold text-sm md:text-base">Made by Debuger </p>
        <div className="flex flex-row text-lg md:text-2xl gap-3 md:gap-5">
          <a href={""} target="_blank">
            <FaGithub />
          </a>
          <a href={""} target="_blank">
            <FaLinkedinIn />
          </a>
          <a href={"/"}>
            <FaGooglePlusG />
          </a>
          <a href={""} target="_blank">
            <FaInstagram />     
          </a>
          {/* <a href={""} target="_blank">
          Terms & Conditions    
          </a>
          <a href={""} target="_blank">
          Privacy Policy    
          </a> */}
        </div>
        <div className="flex gap-3 text-xs md:text-sm">
        <a
          href="/terms-and-conditions"
          
          className="border border-white px-2 py-1 rounded hover:bg-white hover:text-red-900 transition duration-300"
        >
          Terms & Conditions
        </a>
        <a
          href="/privacy-policy"
         
          className="border border-white px-2 py-1 rounded hover:bg-white hover:text-red-900 transition duration-300"
        >
          Privacy Policy
        </a>
      </div>
      </footer>
    </>
  );
};

export default Footer;