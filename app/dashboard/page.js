"use client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchuser, updateProfile } from "@/actions/useractions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { data: session, update, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    keyId: "",
    keySecret: "",
    profilepic: null,
    coverpic: null,
  });

  const [previewProfile, setPreviewProfile] = useState("/default-avatar.png");
  const [previewCover, setPreviewCover] = useState(null);




  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status]);

  useEffect(() => {
    if (session?.user) getData();
  }, [session?.user]);

  const getData = async () => {
    setLoading(true);
    const user = await fetchuser(session.user.name);
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        username: user.username || "",
        email: user.email || session.user.email,
        keyId: user.keyId || "",
        keySecret: user.keySecret || "",
      }));
      setPreviewProfile(user.profilepic || session.user.image || "/default-avatar.png");
      setPreviewCover(user.coverpic || null);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        [type]: file,
      }));

      if (type === "profilepic") setPreviewProfile(imageUrl);
      if (type === "coverpic") setPreviewCover(imageUrl);

      return () => URL.revokeObjectURL(imageUrl); // Cleanup memory
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateProfile(session.user.name, formData);
    if (response === "Profile updated successfully") {
      toast.success("✅ Profile updated successfully!", {
        position: "bottom-right",
        autoClose: 3000, // Toast stays for 3 seconds
        theme: "dark",
        style: { background: "#2a2a2a", color: "#fff", borderRadius: "8px" },
        progressStyle: { background: "#fff" },
      })
      update();
      getData();
    } else {
      toast.error(response);
    }
  };

  if (loading) return <div className="text-white text-xl text-center mt-10">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-20">
      <ToastContainer/>
      {session?.user && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 flex flex-col justify-center items-center gap-6 p-6 pt-10 rounded-lg shadow-lg text-center max-w-lg w-full"
        >
          <img src={previewProfile} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-blue-500" />
          <label className="text-gray-400 text-sm">Upload Profile Picture</label>
          <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "profilepic")} className="p-2 bg-gray-700 text-white w-full rounded-md" />

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">{formData.name}</h2>
            <p className="text-gray-300">{formData.email}</p>
          </div>

          <div className="w-full space-y-4 text-left">
            {[
              { label: "Full Name", name: "name", type: "text" },
              { label: "Username", name: "username", type: "text" },
              { label: "Razorpay Key ID", name: "keyId", type: "password" },
              { label: "Razorpay Key Secret", name: "keySecret", type: "password" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="text-gray-400 text-sm">{field.label}</label>
                <input type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange} placeholder={`Enter your ${field.label.toLowerCase()}`} className="p-2 rounded-md bg-gray-700 text-white w-full focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
            ))}

            {previewCover && <img src={previewCover} alt="Cover" className="w-full h-40 rounded-lg object-cover border border-gray-500" />}
            <label className="text-gray-400 text-sm">Upload Cover Picture</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "coverpic")} className="p-2 bg-gray-700 text-white w-full rounded-md" />
          </div>

          <button type="submit" className="mt-4 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">Update Profile</button>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
