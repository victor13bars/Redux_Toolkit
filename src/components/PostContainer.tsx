import React, {useState} from 'react';
import {postAPI} from "../service/PostService";
import PostItem from './PostItem';
import {IPost} from "../models/IPost";

const PostContainer = () => {
    const [limit, setLimit] = useState(100)
    const {data: posts, error, isLoading} = postAPI.useFetchAllPostsQuery(limit)
    const [createPost, {error: createError, isLoading: isCreateLoading}] = postAPI.useCreatePostMutation()
    const [deletePost, {}] = postAPI.useDeletePostMutation()
    const [updatedPost, {}] = postAPI.useUpdatePostMutation()
    const handlerCreate = async () => {
        const title = prompt()
        await createPost({title, body: title} as IPost)
    }

    const handlerRemove = (post: IPost) => {
        deletePost(post)
    }
    const handlerUpdate = (post: IPost) => {
        updatedPost(post)
    }
    return (
        <div>
            <div className="post__list">
                <button onClick={handlerCreate}>Add new post</button>
                {isLoading && <h1>Loading......</h1>}
                {error && <h1>Произошла ошибка!!!</h1>}
                {posts && posts.map(post =>
                    <PostItem remove={handlerRemove} update={handlerUpdate} key={post.id} post={post}/>
                )}
            </div>
        </div>
    );
};

export default PostContainer;