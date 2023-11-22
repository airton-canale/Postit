"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

type Post = {
  avatar: string;
  name?: string;
  postTitle?: string;
  id?: string;
  comments?: {
    createdAt?: string;
    length?: number;
    id: string;
    postId: string;
    title: string;
    userId: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
};

export default function Post({ avatar, name, postTitle, id, comments }: Post) {
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comentário
            {comments?.length || 0 ? "s" : ""}
          </p>
        </Link>
      </div>
    </div>
  );
}
