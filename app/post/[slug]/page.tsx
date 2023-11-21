"use client";
import AddComment from "@/app/components/AddComment";
import Post from "@/app/components/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToggleComment from "@/app/dashboard/ToggleComment";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });

   //Toggle
   const [toggle, setToggle] = useState(false);
   const [id, setId] = useState('')

  if (isLoading) return "Carregando...";

  return (
    <div>
      <h1>Hello</h1>
      <Post
        id={data?.id}
        name={data?.user.name}
        avatar={data?.user.image}
        postTitle={data?.title}
        comments={data?.Comment}
      />
      <AddComment id={data?.id} 
      />
      {data?.Comment.map((comment) => (
        <div key={comment.id} className="my-6 bg-white p-8 rounded-md flex justify-between items-center">
          <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Image 
            className="rounded-full"
            width={24}
            height={24}
            src={comment.user?.image}
            alt="avatar"
            />
            <h3 className="font-bold">{comment?.user.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div className="py-4">{comment.message}</div>
          </div>
          <button
            onClick={(e) => {
              setToggle(true);
              setId(comment.id)
            }}
            className="text-sm font-bold text-red-500"
          >
            Deletar
          </button>
        </div>
      ))}
      {toggle && <ToggleComment id={id} setToggle={setToggle} />}
    </div>
  );
}
