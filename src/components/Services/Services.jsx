// eslint-disable-next-line no-unused-vars
import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { SlNote } from "react-icons/sl";

const skillsData = [
  {
    name: "Service",
    icon: <FaCameraRetro className="text-4xl text-primary" />,
    link: "#",
    description:
      "Healthcare insurance fraud detection methods encompass using paper or electronic claims documents to compare and divide data into certain levels to segregate classes. According to scholars, there are various fraud detection methods"
  },
  {
    name: "Service",
    icon: <GiNotebook className="text-4xl text-primary" />,
    link: "#",
    description:
    "Catching healthcare fraudsters is a collaborative effort. Investigations are often the work of multiple agencies, such as private sector contractors, the Department of Justice, POLICE, RIB and other law enforcement.",
    aosDelay: "300",
  },
  {
    name: "Service",
    icon: <SlNote className="text-4xl text-primary" />,
    link: "#",
    description:
    "  We will always strive to provide the highest standards of policing  service to you all every day. However, if we do not meet your expectations, let us know; we are committed to reviewing and improving the way we serve you.  ",
    aosDelay: "500",
  },
  {
    name: "Service",
    icon: <SlNote className="text-4xl text-primary" />,
    link: "#",
    description:
     "   The Rwanda Investigation Bureau (RIB) is a specialized organ established by the law Nº12/2017 of 07/04/2017 and responsible for performing career investigative functions, and partners with other law enforcement agencies in ensuring law and order." ,
    aosDelay: "700",
  },
];
const Services = () => {
  return (
    <>

      <section id="service">

      <div className="bg-gray-100 dark:bg-black dark:text-white py-12 sm:grid sm:place-items-center">
        <div className="container">
          {/* Header */}
          <div className="pb-12 text-center space-y-3">
            <h1
              data-aos="fade-up"
              className="text-3xl font-semibold sm:text-3xl text-violet-950 dark:text-primary"
            >
              Explore Our Services
            </h1>
            <p
              data-aos="fade-up"
              className="text-gray-600 dark:text-gray-400 text-sm"
            >
              We are setting up an updated police
              visually.
            </p>
          </div>

          {/* services cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {skillsData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card space-y-3 sm:space-y-4 p-4"
              >
                <div>{skill.icon}</div>
                <h1 className="text-lg font-semibold">{skill.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

          {/* button */}
          <div
            data-aos="fade-up"
            data-aos-delay="900"
            data-aos-offset="0"
            className="text-center mt-4 sm:mt-8"
          >
            {/* <button className="primary-btn">Learn More</button> */}
          </div>
        </div>
      </div>

      </section>
     
    </>
  );
};

export default Services;
