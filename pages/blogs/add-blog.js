import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AddBlog = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return null;
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-28">
      <h1>Add Blog</h1>
    </div>
  );
};

export default AddBlog;
