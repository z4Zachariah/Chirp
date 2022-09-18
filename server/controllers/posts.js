import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

//These are the actions expressed as a series of asynchronous functions that take a request and return a result,
//if the result is sucessful a json object is populated with the obtained data,if not that json object returns with an
//error message

//Get all posts, limit to a certain amount per page by page number
export const getPosts = async (req, res) => {
    const { page } = req.query;
    
    try {
        //page limit
        const LIMIT = 20;
        //index of page
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        //result
        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        //error
        res.status(404).json({ message: error.message });
    }
}//end of Getposts 

//return posts by a specific query
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        //search result
        res.json({ data: posts });
    } catch (error) {    
        //error
        res.status(404).json({ message: error.message });
    }
}// end of get Posts by search


//return posts by the same creator
export const getPostsByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const posts = await PostMessage.find({ name });

        //result
        res.json({ data: posts });
    } catch (error) {    
        //error
        res.status(404).json({ message: error.message });
    }
}//end of get posts by creator


//return a specific post by id
export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        //result
        res.status(200).json(post);
    } catch (error) {
        //error
        res.status(404).json({ message: error.message });
    }
}//end of get a post


//create a new post
export const createPost = async (req, res) => {
    const post = req.body;

    //new instance of post object
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        //result
        res.status(201).json(newPostMessage);
    } catch (error) {
        //error
        res.status(409).json({ message: error.message });
    }
}//end of create new post


//update a selected post via id
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    //return if no post is found
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    //find and update post
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    //result
    res.json(updatedPost);
}//end of update post


//delete a post by id
export const deletePost = async (req, res) => {
    const { id } = req.params;

    //return if no post is found
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    //find and remove post
    await PostMessage.findByIdAndRemove(id);

    //result
    res.json({ message: "Post deleted successfully." });
}// end of delete post


//like a post by its id
export const likePost = async (req, res) => {
    const { id } = req.params;

    //if the user doesnt exist, do not like post
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

      //if the post doesnt exist, return
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    //find the post to like
    const post = await PostMessage.findById(id);

    //if the user has liked the post, remove thier like.
    //if not, add thier like
    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    //result
    res.status(200).json(updatedPost);
}//end of like post

//comment on a post
export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    //find post
    const post = await PostMessage.findById(id);
    //push comment to post comment array
    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    //result
    res.json(updatedPost);
};// end of comment on post

export default router;