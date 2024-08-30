const { Schema, models, model } = require("mongoose");

const BlogSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    metadescription: { type: String, required: true },
    description: { type: String },
    blogcategory: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String },
    readingTime: { type: String },  // New field for reading time
}, {
    timestamps: true
});

BlogSchema.pre('save', function(next) {
    const blog = this;
    if (blog.description) {
        const wordsPerMinute = 200; // Average words per minute
        const words = blog.description.split(/\s+/).length; // Count words in the description
        const minutes = Math.ceil(words / wordsPerMinute);
        blog.readingTime = `${minutes} min read`; // Set reading time
    } else {
        blog.readingTime = '1 min read'; // Default value if description is empty
    }
    next();
});

export const Blog = models.Blog || model('Blog', BlogSchema, 'blogtest');
