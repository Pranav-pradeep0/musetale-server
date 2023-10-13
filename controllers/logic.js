const { users, posts } = require("../models/schema")

exports.signinLogic = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await users.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        if (password !== user.password) {
            return res.status(401).json({ error: 'Incorrect Password' });
        }

        res.status(200).json({ message: 'Sign-in successful', user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Logical Error' });
    }
}


exports.newUser = async (req, res) => {
    try {
        const { username, email, name, password } = req.body;

        const existingUser = await users.findOne({ username });


        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const newUser = new users({ username, email, name, password });

        await newUser.save();

        res.status(201).json(newUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Logical Error' });
    }
}


exports.newUserWithDp = async (req, res) => {
    try {
        const file = req.file.filename
        const { username, email, name, password } = req.body;

        const existingUser = await users.findOne({ username });


        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const newUser = new users({ username, email, name, password, profilePic: file });

        await newUser.save();

        res.status(201).json(newUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Logical Error' });
    }
}



exports.newPost = async (req, res) => {
    try {
        const { title, content, authorid } = req.body;

        const author = await users.findById(authorid);
        if (!author) {
            return res.status(400).json({ error: 'Author not found' });
        }

        const newPost = new posts({ title, content, author: authorid });

        await newPost.save();

        res.status(201).json({ message: 'Post created successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Logical Error' });
    }
}


exports.userPosts = async (req, res) => {
    try {
        const username = req.params.username;

        const user = await users.findOne({ _id: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userPosts = await posts.find({ author: user._id });

        res.status(200).json(userPosts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Logical Error' });
    }
}

exports.allPosts = async (req, res) => {
    try {
        const postsWithAuthordetails = await posts.find().populate('author');

        res.status(200).json(postsWithAuthordetails);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Logical Error' });
    }
}

exports.editPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { title, content } = req.body;

        const post = await posts.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.title = title || post.title;
        post.content = content || post.content;

        await post.save();

        res.status(200).json(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Logical Error' });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        await posts.deleteMany({ author: userId });

        const user = await users.findByIdAndDelete(userId);

        res.status(200).json({ message: 'User deleted successfully', user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Logical Error' });
    }
}


exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;

        const post = await posts.findByIdAndDelete(postId);

        res.status(200).json({ message: 'Post deleted successfully', post });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Logical error' });
    }
}

exports.editUSerInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { username, email, name, password } = req.body;
        const profilePic = req.file ? req.file.filename : undefined;

        const user = await users.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (name) user.name = name;
        if (password) user.password = password;
        if (profilePic) { user.profilePic = profilePic }

        await user.save();

        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Logical error' });
    }
}
