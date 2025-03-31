"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { initiate, fetchpayments, fetchuser } from "@/actions/useractions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { getUserRazorpayKey } from "@/actions/useractions";


const PaymentPage = ({ username }) => {
    console.log(username);

    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const router = useRouter();
    // const username = searchParams.get("username") || "User"; // Ensure username is defined

    const paymentdone = searchParams.get("paymentdone");
    useEffect(() => {
        if (paymentdone) {
            // Show toast immediately
            toast.success("✅ Payment Successful!", {
                position: "bottom-right",
                autoClose: 3000, // Toast stays for 3 seconds
                theme: "dark",
                style: { background: "#2a2a2a", color: "#fff", borderRadius: "8px" },
                progressStyle: { background: "#fff" },
            });

            // Redirect after 1 second
            setTimeout(() => {
                router.replace(`${username}`, undefined, { shallow: true });
            }, 2500);
        }
    }, [paymentdone]);


    const [currentuser, setCurrentuser] = useState({});
    const [payments, setPayments] = useState([]);


    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        if (session?.user?.name) {
            getData();
        }
    }, [session]);


    const getData = async () => {
        if (!session?.user?.name) {
            console.error("Session user name is not defined");
            return;
        }

        try {
            let u = await fetchuser(session.user.name);
            setCurrentuser(u || []); // Ensure it doesn't remain undefined

            let dbpayments = await fetchpayments(username || "defaultUser");
            setPayments(dbpayments || []);

            console.log(u, session.user.name, dbpayments);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const [paymentform, setPaymentform] = useState({
        name: username,
        message: "I love your work",
        amount: 100, // Default amount
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentform({ ...paymentform, [name]: value });

    };


    const pay = async (amount) => {
        if (typeof window !== "undefined" && window.Razorpay) {
            const userKeyId = await getUserRazorpayKey(username); // Get the user's keyId
            console.log("User's Razorpay keyId:", userKeyId);

            if (!userKeyId) {
                console.error("User's Razorpay key not found.");
                toast.error("Payment failed: You cannot make payment to this user because he is not in our database.");
                return;
            }

            let response = await initiate(amount, username, paymentform);
            let order_id = response.order_id;

            const options = {
                key: userKeyId, // ✅ Use the user's key instead of process.env
                amount: amount * 100,
                currency: "INR",
                name: username, // Show the user's name on Razorpay checkout
                description: "Support Payment",
                image: "/logo.png",
                order_id: order_id,
                callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/razorpay`,
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
        } else {
            console.error("Razorpay script not loaded yet.");
        }
    };


    return (
        <><ToastContainer />
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
                onLoad={() => console.log("Razorpay script loaded")}
            />

            <div className="cover relative p-60 h-[50vh] w-full bg-gray-800 text-white flex flex-col items-center justify-center">
                <div className="img flex justify-center items-center">
                    <img
                        src={currentuser?.coverpic || "/default-cover.png"}
                        alt="coverpage"
                        width={620}
                        height={400}
                        className="border-2 border-black bg-gray-900"
                    />
                </div>

                <div className="flex justify-center items-center">
                    <img
                        className="border-black border-2 rounded-full absolute left-[50%] bottom-48 transform -translate-x-1/2"
                        src={currentuser?.profilepic || "/default-avatar.png"}
                        alt="mypic"
                        width={96}
                        height={96}

                    />
                </div>

                <div className="info text-center mt-12">
                    <h1 className="text-4xl font-bold">{capitalize(username)}</h1>
                    <p className="text-lg text-slate-400">Entrepreneur</p>
                    <p className="text-lg text-slate-500">100M Followers • 100 Posts • $100,000,000/hr </p>
                    <p className="text-lg text-slate-500">{payments.length} payments recieved  • Rs. {payments.reduce((a, b) => a + b.amount, 0)}</p>
                </div>
            </div>

            <div className="payments min-h-[70vh] grid grid-cols-1 md:grid-cols-2 pt-12 gap-6 p-6">
                <div className="supporters flex flex-col justify-center bg-[rgba(30,41,59,.8)] rounded-lg items-center p-6">
                    <h1 className="text-white text-2xl font-bold">Top Supporters</h1>
                    <ul className="flex flex-col gap-4 p-6 text-white text-lg">
                        {payments.length > 0 ? (
                            payments.map((payment, index) => (
                                <li key={index} className="flex gap-2 justify-start items-center">
                                    <img height={30} width={30} src="/avatar.gif" alt="avatar" />
                                    {payment.name} Donated <span className="font-bold">{payment.amount} Rs.</span> with a message "{payment.message}"
                                </li>
                            ))
                        ) : (
                            <li className="flex gap-2 justify-start items-center">No payments yet</li>
                        )}

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
