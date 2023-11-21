"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type PostProps = {
  id?: string;
};

type Comment = {
  postId?: string;
  title?: string;
};

export default function AddComment({ id }: PostProps) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let commentToastId: string;

  const addCommentPost = async (data: Comment) => {
    await axios.post("/api/posts/addComment", { 
      data,
    });
  }
const onError = (error: any) => {
  if (error instanceof AxiosError) {
    toast.remove(commentToastId);
    toast.error(error?.response?.data.message, { id: commentToastId });
  }
  setIsDisabled(false);
};

const onSuccess = (data: any) => {
  toast.remove(commentToastId);
  toast.success("Comentário realizado!", { id: commentToastId });
  queryClient.invalidateQueries({ queryKey: ["detail-post"] });
  setTitle("");
  setIsDisabled(false);
};

  const { mutate } = useMutation({
    mutationFn: addCommentPost,
    onSuccess: onSuccess,
    onError: onError,
  });

  const submitComment = async (e: React.FormEvent) => {
    commentToastId = toast.loading("Adicionando seu comentário...", {
      id: commentToastId,
    });
    e.preventDefault();
    setIsDisabled(true);
    mutate({ title, postId: id });
  };

  return (
    <form onSubmit={submitComment} className="my-8">
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="text- flex items-center gap-2">
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Adicione um comentário
        </button>
        <p
          className={`font-bold ${
            title.length > 300 ? "text-red-700" : "text-gray700"
          }`}
        >{`${title.length}/300`}</p>
      </div>
    </form>
  );
}
