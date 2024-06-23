import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/blog";

export default async function handle(req, res) {
  // if authenticated, connect to mongoDB
  await mongooseConnect();

  const { method } = req;

  // Post data
  if (method === "POST") {
    const { title, slug, description, blogCategory, status } = req.body;

    const blogDoc = await Blog.create({
      title,
      slug,
      description,
      blogCategory,

      status,
    });

    res.json(blogDoc);
  }

  // Fetch data
  if (method === "GET") {
    if (req.query?._id) {
      res.json(await Blog.findById(req.query._id));
    } else {
      res.json((await Blog.find()).reverse());
    }
  }

  // Update data
  if (method === "PUT") {
    const { _id, title, slug, description, blogCategory, status } = req.body;

    await Blog.updateOne(
      { _id },
      {
        title,
        slug,
        description,
        blogCategory,

        status,
      }
    );
    res.json(true);
  }

  // delete one
  if (method === "DELETE") {
    if (req.query?._id) {
      await Blog.deleteOne({ _id: req.query?._id });
      res.json(true);
    }
  }
}
