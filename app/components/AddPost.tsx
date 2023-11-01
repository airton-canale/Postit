"use client";

import { useState } from "react";

export default function Createpost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <form className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4 rounded-md">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="O que vem na sua cabeça?"
          className="p-4 text-lg rounded-md bg-gray-200"
        ></textarea>
      </div>
      <div className="bg-white flex items-center justify-between gap-2">
        <p
          className={`bg-white font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray700"
          }`}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Crie um post
        </button>
      </div>
    </form>
  );
}
