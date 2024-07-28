/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import AboutImg from '../../assets/police_image/img2.jpeg';

function About() {
    return (
        <section id="about">
            <h2
                data-aos="fade-up"
                className=" text-center text-3xl font-bold underline-offset-4">About us</h2>
            <main className="bg-slate-100 dark:bg-slate-900 dark:text-white">

                <section className="container flex flex-col items-center justify-center py-10 md:h-[500px] ">

                    <div className="grid grid-cols-1 items-center gap-4  md:grid-cols-2">
                        <div
                            data-aos="fade-right"

                        >
                            <img
                                src={AboutImg}
                                alt="No image"
                                className="max-auto w-full hover:drop-shadow-md h-80"
                            />
                        </div>
                        <div

                            data-aos="fade-left"
                            // data-aos-duration="400"
                            // data-aos-once="true"
                            className="flex flex-col items-start gap-4 text-left md:items-start md:p-8 md:text-left "

                        >
                            
                            <h2 className=" text-2xl text-slate-500">Who we are</h2>
                            <p className="text-sm  dark:text-slate-400">
                            At MUSENYI Health care, we are dedicated to safeguarding the integrity of the health insurance industry through innovative technology and advanced analytics. Our mission is to combat fraud and ensure that legitimate claims are processed efficiently and fairly. Our team comprises experts in data science, machine learning, and insurance, working together to develop cutting-edge solutions that detect and prevent fraudulent activities.
                            </p>
                            <div>
                                <h2 className=" text-2xl text-slate-500">Vision</h2>
                                <p className="text-sm  dark:text-slate-400">
                                The vision of an insurance fraud detection system is to create a fair and trustworthy insurance environment by stopping fraud before it can cause harm. This ensures that insurance companies can protect their customers' money and maintain trust in the insurance system.
                                </p>
                            </div>
                            <div>


                                <h2 className=" text-2xl text-slate-500">Mission</h2>
                                <p className="text-sm  dark:text-slate-400">
                                The mission of an insurance fraud detection system is to analyse data, identify patterns, and detect anomalies that indicate potential fraud. By flagging suspicious activities, the system aims to prevent financial losses, uphold integrity, and protect the interests of insurance providers and policyholders.
                                </p>
                            </div>
                            
                        </div>

                    </div>
                </section>
            </main>
        </section>
    )
}

export default About
