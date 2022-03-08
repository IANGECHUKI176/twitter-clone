import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import React, { useRef, useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { db, storage } from "../firebase";
import {
  doc,
  collection,
  updateDoc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";
const Input = () => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef();
  const { data: session } = useSession();
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };
  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadUrl,
        });
      });
    }
    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmoji(false);
  };
  return (
    <div
      className={`border-b border-gray-700 flex space-x-3 p-3 overflow-y-scroll scrollbar-hide ${
        loading && "opacity-60"
      }`}
    >
      <img
        src={session.user.image}
        alt=''
        className='w-10 h-10 rounded-full object-cover xl:mr-2.5'
      />
      <div className='w-full divide-y divide-gray-700'>
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            rows='2'
            placeholder="What's happening"
            value={input}
            className='bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 w-full tracking-wide min-h-[50px]'
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          {selectedFile && (
            <div className='relative'>
              <div
                className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className='h-5 text-white' />
              </div>
              <img
                src={selectedFile}
                alt=''
                className='rounded-2xl object-contain max-h-80'
              />
            </div>
          )}
        </div>
        {!loading && (
          <div className='flex items-center justify-between pt-2.5'>
            <div className='flex items-center '>
              <div
                className='icon '
                onClick={() => filePickerRef.current.click()}
              >
                <PhotographIcon className='h-[22px] text-[#1d9bf0]' />
                <input
                  type='file'
                  ref={filePickerRef}
                  onChange={addImageToPost}
                  hidden
                />
              </div>
              <div className='icon rotate-90'>
                <ChartBarIcon className='h-[22px] text-[#1d9bf0]' />
              </div>
              <div className='icon ' onClick={() => setShowEmoji(!showEmoji)}>
                <EmojiHappyIcon className='h-[22px] text-[#1d9bf0]' />
              </div>
              <div className='icon '>
                <CalendarIcon className='h-[22px] text-[#1d9bf0]' />
              </div>
              {showEmoji && (
                <Picker
                  theme='dark'
                  onSelect={addEmoji}
                  style={{
                    borderRadius: "20px",
                    maxWidth: "320px",
                    marginLeft: "-40px",
                    marginTop: "465px",
                    position: "absolute",
                    overflow: "hidden",
                  }}
                />
              )}
            </div>
            <button
              className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:cursor-default disabled:opacity-50 disabled:hover:bg-[#1d9bf0]'
              disabled={!input.trim() && !selectedFile}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
