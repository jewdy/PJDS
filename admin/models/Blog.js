const { Schema, models, model } = require("mongoose");

const BlogSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    description: { type: String },
    metadescription: { type: String, required: true },
    blogcategory: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String },
    createdAt: { type: Date }, // Allow manual input for creation date
});

export const Blog = models.Blog || model('Blog', BlogSchema, 'blogtest');
