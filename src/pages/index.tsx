import { SignedIn, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Divider from "~/components/utils/Divider";
import { RouterOutputs, api } from "~/utils/api";

export default function Home() {
  const { data, isLoading } = api.posts.getAll.useQuery();

  const CreatePostWizard = () => {
    const { user } = useUser();

    if (!user) return null;

    console.log(user.username, user.id);

    const [searhVal, setsearhVal] = useState("");

    return (
      <div className="flex w-full max-w-[500px] items-center justify-center gap-2.5 rounded-md border border-slate-200 border-opacity-30 bg-slate-200 bg-opacity-10 p-2.5">
        <input
          type="text"
          placeholder="Type some emojis!"
          className="w-full bg-transparent outline-none"
          maxLength={250}
          onChange={(event) => setsearhVal(event.target.value)}
        />
        <span>{searhVal.length}/250</span>
      </div>
    );
  };

  type PostWithUser = RouterOutputs["posts"]["getAll"][number];
  const PostView = (props: PostWithUser) => {
    const { post, author } = props;
    return (
      <div className="flex w-full items-stretch justify-start gap-2.5 p-2.5">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image src={author.profilePicture} fill alt="" />
        </div>
        <div className="w-[2px] rounded-3xl bg-slate-200 bg-opacity-30"></div>
        <div className="flex flex-col items-start justify-start">
          <span className="text-sm opacity-50">@{author.username}</span>
          <span className="">{post.content}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-col items-center justify-start">
        <section
          id="#"
          className="flex min-h-screen w-full flex-col items-center justify-start"
        >
          <Divider />
          <div className="flex w-full flex-1 flex-col items-center justify-stretch gap-5 p-5  md:gap-10 md:p-10 lg:p-20 lg:pt-10">
            <SignedIn>
              <CreatePostWizard />
            </SignedIn>
            {data?.length !== 0 && (
              <div className="flex min-h-[44px] w-full max-w-[500px] flex-col items-center justify-center gap-1 rounded-md border border-slate-200 border-opacity-30 bg-slate-200 bg-opacity-10 ">
                {!isLoading ? (
                  data ? (
                    data.map((fullPost, index) => (
                      <PostView {...fullPost} key={index} />
                    ))
                  ) : (
                    <div>Something went wrong</div>
                  )
                ) : (
                  <div>Loading..</div>
                )}
              </div>
            )}

            <div className="flex items-center justify-center gap-10"></div>
          </div>
        </section>
      </div>
    </>
  );
}
