const posts = [{ title: "post one", body: "this is my first post" }];
const user = {
    name: "deepak",
    lastAcitivityTime: new Date().getTime()
}

async function createPost(post) {
    try {
        posts.push(post);
        console.log(`Before creating ${posts[posts.length - 1].title}, user last activity time  =  ${user.lastAcitivityTime}`);
        console.log(`after creating ${posts[posts.length - 1].title} >>>>>>>>`)
        console.log("posts >>>", posts);
    } catch (error) {
        console.log(error);
        throw (error);
    }
}

async function updateLastActivityTime() {
    setTimeout(function () {
        try {
            user.lastAcitivityTime = new Date().getTime();
            console.log("user last acitivity time ", user.lastAcitivityTime);
        } catch (error) {
            console.log(error);
            throw (error);
        }
    }, 1000)
}

async function deletePost() {
    try {
        posts.pop();
        console.log("After deleting last post, the posts >>> ", posts);
    } catch (error) {
        console.log(error);
        throw (error);
    }
}

async function resolvePromises() {
    await Promise.all([createPost({ title: "post two", body: "this is my second post" }), updateLastActivityTime(), deletePost()]);
}

resolvePromises();
