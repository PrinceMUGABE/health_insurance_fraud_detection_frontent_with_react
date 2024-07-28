/* eslint-disable no-unused-vars */
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const FooterLinks = [
  {
    title: "Home",
    link: "/#home",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Services",
    link: "/#service",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
];
const HelpLinks = [
  {
    title: "Home",
    link: "/#home",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Services",
    link: "/#service",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
];
const ResourcesLinks = [
  {
    title: "Home",
    link: "/#home",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Services",
    link: "/#service",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
];
const Footer = () => {
  return (
    <div className="bg-slate-600 text-dark">
      <section className="container py-10">
        <div className=" grid md:grid-cols-3 py-5">
          {/* company Details */}
          <div className=" py-8 px-4 ">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              Healthy Insurance Fraud Detection System
            </h1>

            <br />
          </div>
          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10 ">
            <div className="">
              <div className="py-8 px-4 ">
                <p className="text-sm">
                  dolor sit amet consectetur adipisicing elit consectetur
                  adipisicing elit ipsum dolor sit amet consectetur. adipisicing{" "}
                </p>
              </div>
            </div>
            <div className="">
              <div className="py-8 px-4 ">
                {/* Social Handle */}
                <div className="flex items-center gap-4 mt-6">
                  <a href="#">
                    <FaInstagram className="text-2xl hover:text-primary duration-300" />
                  </a>
                  <a href="#">
                    <FaFacebook className="text-2xl hover:text-primary duration-300" />
                  </a>
                  <a href="#">
                    <FaLinkedin className="text-2xl hover:text-primary duration-300" />
                  </a>
                </div>
              </div>
            </div>
            <div className="">
              <div className="py-8 px-4 "></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
