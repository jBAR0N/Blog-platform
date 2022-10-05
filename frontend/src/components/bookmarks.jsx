import Posts from "./posts/posts"
import React from "react"

const Bookmarks = () => (
    <React.Fragment>
        <div className="page-heading-wrapper">
            <div className="page-heading">Reading list</div>
        </div>
        <div className="card-wrapper"/>
        <Posts path={"bookmarks/"}/>
    </React.Fragment>
)

export default Bookmarks