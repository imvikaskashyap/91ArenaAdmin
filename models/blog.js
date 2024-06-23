const { Schema, models, model } = require("mongoose");

const BlogSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String },
    description: { type: String },
    blogCategory: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

export const Blog = models.Blog || model("Blog", BlogSchema, "blogtest");
