"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type ToggleProps = {
  setToggle: (toggle: boolean) => void;
  id: string;
};

export default function Toggle({ setToggle, id }: ToggleProps) {
  let commentToastId: string;
  const queryClient = useQueryClient();

  const deleteComment = async (data: string) => {
    await axios.delete("/api/posts/deleteComment", {
      data: { id },
    });
  };

  const onError = (error: any) => {
    if (error instanceof AxiosError) {
      toast.remove(commentToastId);
      toast.error(error?.response?.data.message, { id: commentToastId });
    }
  };

  const onSuccess = () => {
    toast.remove(commentToastId);
    toast.success("Comentário deletado!", { id: commentToastId });
    queryClient.invalidateQueries({ queryKey: ["detail-post"] });
  };

  const { mutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: onSuccess,
    onError: onError,
  });

  const handleDelete = async (e: React.FormEvent) => {
    commentToastId = toast.loading("Deletando seu comentário...", {
      id: commentToastId,
    });
    e.preventDefault();
    mutate(id);
  };
  return (
    <div
      onClick={(e) => setToggle(false)}
      className="fixed bg-black/50 w-full h-full z-20 left-0 top-0"
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className="text-xl">
          Você tem certeza que deseja deletar esse comentário?
        </h2>
        <h3 className="text-red-600 text-sm">
          Pressionando o botão deletar irá deletar permanentemente este
          comentário!
        </h3>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-sm text-white py-2 px-4 rounded-md"
        >
          Deletar Comentário
        </button>
      </div>
    </div>
  );
}
