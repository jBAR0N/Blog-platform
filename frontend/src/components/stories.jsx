import React from "react"
import { useNavigate, NavLink, Outlet} from "react-router-dom"

const Stories = props => {
    const navigate = useNavigate()

    const newStorie = () => {
        fetch("http://192.168.0.42:3000/add/story", {method: "POST"})
        .then(res => res.json())
        .then(data => {
            if (data.success) navigate("/story/edit/" + data.story)
        })
    }

    return (
        <React.Fragment>
            <div className="page-heading-wrapper">
                <div className="page-heading">Your stories</div>
                <div onClick={newStorie} className="page-heading-cta">Write a story</div>
            </div>
            <div className="card-wrapper">
                <NavLink className={({isActive})=>{return isActive? "card active": "card"}} to={"/me/stories/drafts"}>Drafts {"("}{props.user.drafts}{")"}</NavLink>
                <NavLink className={({isActive})=>{return isActive? "card active": "card"}} to={"/me/stories/public"}>Published {"("}{props.user.posts}{")"}</NavLink>
            </div>
            <Outlet/>
        </React.Fragment>
    )
}

export default Stories