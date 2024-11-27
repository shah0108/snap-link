import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App';
import { Link } from "react-router-dom";

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        fetch('/allpost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setData(result.posts);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const likePost = (id) => {
        fetch('/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            }).catch(err => {
                console.log(err);
            });
    };

    const unlikePost = (id) => {
        fetch('/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            }).catch(err => {
                console.log(err);
            });
    };

    const makeComment = (text, postId) => {
        fetch('/comment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            }).catch(err => {
                console.log(err);
            });
    };

    const deletePost = (postid) => {
        fetch(`/deletepost/${postid}`, {
            method: "delete",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData);
            })
    };

    return (
        <div className="home">
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                data.map((item) => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <h5 style={{padding:"6px"}}>
                                <Link
                                    to={
                                        item.postedBy && item.postedBy._id && state && item.postedBy._id !== state._id
                                            ? "/profile/" + item.postedBy._id
                                            : "/profile"
                                    }
                                >
                                    {item.postedBy?.name || "Unknown"}
                                </Link>




                                {item.postedBy && state && item.postedBy._id === state._id && (
                                    <i className="material-icons" style={{ float: "right" }}
                                        onClick={() => deletePost(item._id)}
                                    >
                                        delete</i>
                                )}
                            </h5>

                            <div className="card-image">
                                <img src={item.photo} alt="post" />
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{ color: "red" }} aria-label="like">favorite</i>
                                {item.likes.includes(state?._id) ? (
                                    <i className="material-icons"
                                        onClick={() => { unlikePost(item._id); }}
                                        aria-label="Unlike post"
                                    >
                                        thumb_down
                                    </i>
                                ) : (
                                    <i className="material-icons"
                                        onClick={() => { likePost(item._id); }}
                                        aria-label="Like post"
                                    >
                                        thumb_up
                                    </i>
                                )}

                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {item.comments && item.comments.map(record => {
                                    return (
                                        <h6 key={record._id}>
                                            <span style={{ fontWeight: "500" }}>
                                                {record.postedBy ? record.postedBy.name : "Unknown"}
                                            </span> {record.text}
                                        </h6>
                                    );
                                })}

                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    makeComment(e.target[0].value, item._id);
                                }}>
                                    <input type="text" placeholder="Add a comment" />
                                </form>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Home;
