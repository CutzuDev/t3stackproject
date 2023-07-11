import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import Divider from "~/components/utils/Divider";
import { RouterOutputs, api } from "~/utils/api";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import LoadingSpinner from "~/components/utils/LoadingSpinner";
import CommentIcon from "~/components/utils/CommentIcon";

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div className="flex w-full items-stretch justify-start gap-2.5 p-2.5">
      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
        <Image
          src={author.profilePicture}
          fill
          alt=""
          draggable={false}
          className="select-none"
        />
      </div>
      <div className="h-10 w-[2px] flex-shrink-0  rounded-3xl bg-slate-200 bg-opacity-30"></div>
      <div className="flex flex-col items-start justify-start">
        <div className="flex flex-col items-start justify-start lg:flex-row lg:gap-2.5">
          <span className="text-sm opacity-50">@{author.username}</span>
          <span className="mt-0.5 text-xs opacity-50">
            {dayjs(post.createdAt).fromNow()}
          </span>
        </div>
        <span className="mt-2 max-w-[400px] break-all lg:mt-0">
          {post.content}
        </span>
      </div>
    </div>
  );
};

function Feed() {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingSpinner />;

  if (!data)
    return (
      <div className="flex w-full max-w-[500px] items-center justify-center rounded-md border border-slate-200 border-opacity-30 bg-slate-200 bg-opacity-10 p-2.5">
        Something went wrong
      </div>
    );

  return (
    <div className="flex min-h-[44px] w-full max-w-[500px] flex-col items-center justify-center gap-1 rounded-md border border-slate-200 border-opacity-30 bg-slate-200 bg-opacity-10 ">
      {data.map((fullPost, index) => (
        <PostView {...fullPost} key={index} />
      ))}
    </div>
  );
}

const CreatePostWizard = () => {
  const [userInput, setuserInput] = useState<string>("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setuserInput("");
      ctx.posts.getAll.invalidate();
    },
  });

  function handleInput() {
    mutate({ content: userInput });
  }

  return (
    <div className="flex w-full max-w-[500px] items-center justify-center gap-2.5 rounded-md border border-slate-200 border-opacity-30 bg-slate-200 bg-opacity-10 p-2.5">
      <SignedIn>
        <input
          type="text"
          placeholder="Type some emojis!"
          className="w-full bg-transparent outline-none"
          value={userInput}
          maxLength={250}
          disabled={isPosting}
          onChange={(event) => setuserInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key == "Enter") {
              handleInput();
            }
          }}
        />
        <span>{userInput.length}/250</span>
        <button onClick={() => handleInput()}>
          <CommentIcon />
        </button>
      </SignedIn>
      <SignedOut>Sign in to create posts!</SignedOut>
    </div>
  );
};

export default function Home() {
  dayjs.extend(relativeTime);

  api.posts.getAll.useQuery();

  const { isLoaded: userLoaded } = useUser();

  if (!userLoaded)
    return (
      <div className="flex w-full flex-col items-center justify-start">
        <section
          id="#"
          className="flex min-h-screen w-full flex-col items-center justify-start"
        >
          <Divider />
        </section>
      </div>
    );

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <section
        id="#"
        className="flex min-h-screen w-full flex-col items-center justify-start"
      >
        <Divider />
        <div className="flex w-full flex-1 flex-col items-center justify-stretch gap-5 p-5  md:gap-10 md:p-10 lg:p-20 lg:pt-10">
          <CreatePostWizard />
          <Feed />
        </div>
      </section>
    </div>
  );
}
