import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
// import { useComments } from "../../hooks/useComments";
import { useDispatch, useSelector } from "react-redux";
import {
    createNewComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    getRemoveComment
} from "../../store/comments";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const ng = useSelector(getCommentsLoadingStatus());
    // const { removeComment } = useComments();
    const comments = useSelector(getComments());
    const currentUserId = useSelector(getCurrentUserId());

    const handleSubmit = (data) => {
        dispatch(createNewComment(...data, userId, currentUserId));
        // api.comments
        //     .add({ ...data, pageId: userId,  })
        //     .then((data) => setComments([...comments, data]));
    };
    const handleRemoveComment = (id) => {
        dispatch(getRemoveComment(id));
        // api.comments.remove(id).then((id) => {
        //     setComments(comments.filter((x) => x._id !== id));
        // });
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!ng ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            "Loading... "
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
