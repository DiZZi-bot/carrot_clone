"use client";

import { useActionState, useOptimistic } from "react";
import {
  handleCreateResponse,
  InitialResponses,
} from "@/app/service/response-service";
import { creatResponseSchema } from "@/lib/zodSchema";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

interface ResponsesProps {
  initialResponses: InitialResponses;
  tweetId: number;
  username: string;
}

export default function Responses({
  initialResponses,
  tweetId,
  username,
}: ResponsesProps) {
  const [responses, setOptimisticResponse] = useOptimistic(
    initialResponses,
    (previousResponses, responseOptimisticValue: string) => {
      return {
        responses: [
          ...previousResponses.responses,
          {
            id: new Date().getDate(),
            response: responseOptimisticValue,
            created_at: new Date(),
            tweetId,
            user: { username, id: Infinity },
          },
        ],
        responseCount: previousResponses.responseCount + 1,
      };
    },
  );
  const handleUploadResponse = (_: unknown, formData: FormData) => {
    const result = creatResponseSchema.safeParse(formData.get("response"));
    if (result.success) {
      setOptimisticResponse(result.data.response);
      handleCreateResponse(null, formData);
    } else {
      return result.error.flatten();
    }
  };
  const [state, formAction] = useActionState(handleUploadResponse, null);
  return (
    <div className="flex w-full flex-col items-end gap-3">
      <div className="flex w-[500px] gap-4 bg-slate-700 p-8">
        <div>
          <div className="h-16 w-16 rounded-full bg-white"></div>
        </div>
        <form action={formAction} className="w-full">
          <textarea
            name="response"
            placeholder=""
            required
            rows={1}
            className="w-full rounded-lg border border-slate-500 bg-slate-700 p-4 outline-none focus:border-blue-400 focus:ring-blue-400"
          />
          <div className="flex items-center justify-end">
            <button>
              <PlusCircleIcon className="size-10 text-blue-400 hover:text-blue-600" />
            </button>
          </div>
        </form>
      </div>
      {responses?.responses?.map((response) => (
        <div key={response.id} className="*:text-md my-3 flex items-center">
          <span className="w-3/12 font-semibold">{response.user.username}</span>
          <span> {response.response}</span>
        </div>
      )) || (
        <span className="w-full text-center">
          Write the first response to get started!
        </span>
      )}
    </div>
  );
}
