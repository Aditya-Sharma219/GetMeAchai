"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { initiate } from "@/actions/useractions";


const PaymentPage = ({ username }) => {
    const searchParams = useSearchParams();
    // const username = searchParams.get("username") || "User"; // Ensure username is defined

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [paymentform, setPaymentform] = useState({
        name: username,
        message: "I love your work",
        amount: 100, // Default amount
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentform({ ...paymentform, [name]: value });
        console.log(paymentform, "hi");
    };

    const pay = async (amount) => {
        if (typeof window !== "undefined" && window.Razorpay) {
            let a = await initiate(amount, username, paymentform);
            let order_id = a.order_id;
            console.log("Username passed to payment:", username);  // Debug
            let response = await initiate(amount, username, paymentform);
            console.log("Order created:", response);
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Corrected key usage
                amount: amount * 100, // Convert to rupee
                currency: "INR",
                name: "Get me a chai",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: order_id,
                callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/callback`,
                prefill: {
                    name: paymentform.name,
                    email: "test@example.com",
                    contact: "9000090000",
                },
                notes: {
                    address: "User's Payment",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        }
    };

    return (
        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
                onLoad={() => console.log("Razorpay script loaded")}
            />

            <div className="cover relative p-60 h-[50vh] w-full bg-gray-800 text-white flex flex-col items-center justify-center">
                <div className="img flex justify-center items-center">
                    <Image
                        src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4515749/2a472b2eb38844669eb3e62370d89c26/eyJ3Ijo2MjAsIndlIjoxfQ%3D%3D/3.png?token-time=1743724800&token-hash=Ehwugf47Et8M9pI7jmO3-z43PwpsX95X6ZVlvqLqURM%3D"
                        alt="coverpage"
                        width={620}
                        height={400}
                        className="border-2 border-black bg-gray-900"
                    />
                </div>

                <div className="flex justify-center items-center">
                    <Image
                        className="border-black border-2 rounded-full absolute left-[50%] bottom-43 transform -translate-x-1/2"
                        src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4515749/f0d0c48eae424b1a9c1459eacc4ed27f/eyJoIjoxMDgwLCJ3IjoxMDgwfQ%3D%3D/1.png?token-time=1742428800&token-hash=tJ1qlLpqbwezcWMbTMVfx3vDeEIAiJI8Mc0aZwy22h4%3D"
                        alt="mypic"
                        width={96}
                        height={96}
                        priority
                    />
                </div>

                <div className="info text-center mt-12">
                    <h1 className="text-4xl font-bold">{capitalize(username)}</h1>
                    <p className="text-lg text-slate-400">Entrepreneur</p>
                    <p className="text-lg text-slate-500">100M Followers • 100 Posts • $100,000,000/hr </p>
                </div>
            </div>

            <div className="payments min-h-[70vh] grid grid-cols-1 md:grid-cols-2 pt-12 gap-6 p-6">
                <div className="supporters flex flex-col justify-center bg-[rgba(30,41,59,.8)] rounded-lg items-center p-6">
                    <h1 className="text-white text-2xl font-bold">Support me</h1>
                    <ul className="flex flex-col gap-4 p-6 text-white text-lg">
                        <li className="flex gap-2 justify-start items-center">
                            <img height={30} width={30} src="/avatar.gif" alt="avatar" /> Aditya has Donated $100
                        </li>
                        <li className="flex gap-2 justify-start items-center">
                            <img height={30} width={30} src="/avatar.gif" alt="avatar" /> Subham has Donated $10
                        </li>
                        <li className="flex gap-2 justify-start items-center">
                            <img height={30} width={30} src="/avatar.gif" alt="avatar" /> Pal has Donated $1
                        </li>
                    </ul>
                </div>

                <div className="make-payments p-6 flex flex-col gap-4 bg-[rgba(30,41,59,.8)] rounded-lg text-white">
                    <h1 className="text-4xl font-bold">Payment</h1>

                    <div className="inputs flex flex-col gap-4">
                        <input
                            name="name"
                            onChange={handleChange}
                            value={paymentform.name}
                            className="bg-slate-400/40 rounded-lg h-10 text-lg p-2 w-[80%] outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Name"
                        />
                        <input
                            name="message"
                            onChange={handleChange}
                            value={paymentform.message}
                            className="bg-slate-400/40 rounded-lg h-10 text-lg p-2 w-[80%] outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Message"
                        />
                        <input
                            name="amount"
                            onChange={handleChange}
                            value={paymentform.amount}
                            className="bg-slate-400/40 rounded-lg h-10 text-lg p-2 w-[80%] outline-none focus:ring-2 focus:ring-blue-500"
                            type="number"
                            placeholder="Amount"
                        />

                        <button
                            id="rzp-button1"
                            type="button"
                            onClick={() => pay(paymentform.amount)}
                            className="w-[80%] h-12 cursor-pointer text-white text-lg font-semibold px-6 py-3 rounded-xl transition-all duration-300 
                                bg-gradient-to-r from-blue-600 via-purple-700 to-indigo-900 shadow-lg shadow-blue-500/50 
                                hover:shadow-xl hover:from-indigo-900 hover:via-purple-700 hover:to-blue-600 
                                focus:ring-4 focus:outline-none focus:ring-blue-500 
                                disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Pay Now
                        </button>

                        <div className="pays flex justify-start gap-4">
                            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-600" onClick={() => pay(500)}>5$</button>
                            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-600" onClick={() => pay(1000)}>10$</button>
                            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-600" onClick={() => pay(2500)}>25$</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;
