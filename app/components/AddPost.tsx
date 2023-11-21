"use client";

import { useState } from "react";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function Createpost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostID: string;

  const post = async (title: string) =>
    await axios.post("/api/posts/addPost", {
      title,
    });
  const onError = (error: any) => {
    if (error instanceof AxiosError) {
      toast.remove(toastPostID);
      toast.error(error?.response?.data.message, { id: toastPostID });
    }
    setIsDisabled(false);
  };

  const onSuccess = (data: any) => {
    toast.remove(toastPostID);
    toast.success("Post realizado com sucesso!", { id: toastPostID });
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    setTitle("");
    setIsDisabled(false);
  };

  //Create a post
  const { mutate } = useMutation({
    mutationFn: post,
    onError: onError,
    onSuccess: onSuccess,
  });
  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    toastPostID = toast.loading("Criando seu post...", { id: toastPostID });
    mutate(title);
  };

  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4 rounded-md">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="O que está acontecendo?"
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
