const posts = [{ title: "post one", body: "this is my first post" }];
const user = {
    name: "deepak",
    lastAcitivityTime: new Date().getTime()
}

function createPost(post) {
    return new Promise((resolve, reject) => {
        try {
            posts.push(post);
            resolve(user.lastAcitivityTime);
        } catch (error) {
            reject(error);
        }

    })
}

function updateLastActivityTime() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            try {
                user.lastAcitivityTime = new Date().getTime();
                resolve(user.lastAcitivityTime);
            } catch (error) {
                reject(error);
            }
        }, 1000)
    })
}

function deletePost() {
    return new Promise((resolve, reject) => {
        try {
            posts.pop();
            resolve(posts);
        } catch (error) {
            reject(error);
        }
    })
}


Promise.all([createPost({ title: "post two", body: "this is my second post" }), updateLastActivityTime()])
    .then(([createPostResolve, updateLastActivityTimeResolve]) => {
        console.log(`Before creating ${posts[posts.length - 1].title}, user last activity time  =  ${createPostResolve}`);
        console.log(`after creating ${posts[posts.length - 1].title} >>>>>>>>`)
        console.log("posts >>>", posts);
        console.log("user last acitivity time ", user.lastAcitivityTime);
    })
    .then(deletePost)
    .then((deletePostResolve) => {
        console.log("After deleting last post, the posts >>> ", deletePostResolve);
    })
    .catch(error => console.log("Error ", error));
