import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CSS from "./newuser.module.css"
import arrowIcon from "./img/arrow.svg"
import logoutIcon from "./img/logout.svg"

export default function NewUser (props) {
    const navigate = useNavigate()
    const [input, setInput] = useState("")

    useEffect(()=>{
        if (!props.user.email && !props.user.loading|| props.user.username) navigate("/", {replace: true})
    }, [props])

    function submit () {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({object: input})
        }
        fetch("http://localhost:3000/set/name", requestOptions)
        .then(res => res.json())
        .then((data)=>{
            if (data.success) document.location.replace("/")
            else props.setError(data.message)
        }).catch(()=>{
            props.setError("Something went wrong. Try again!")
        })
    }

    function logOut () {
        fetch("http://localhost:3000/logOut").then(document.location.replace("/"))
    }

    function uploadFile (file) {
        const formData = new FormData()
        formData.append('image', file)
        const requestOptions = {
            method: 'POST',
            body: formData
        }
        fetch("http://localhost:3000/set/image", requestOptions)
        .then(res => res.json())
        .then(data => {
            if (data.success) window.location.reload()
            else props.setError(data.message)
        }).catch(()=>{
            props.setError("Something went wrong. Try again!")
        })
    }

    return (
        <div className="centered-content-wrapper">
            <div className={CSS.content}>
                <label htmlFor="file">
                    <div className={CSS.imgWr}>
                        <img name="file" src={props.img} alt="account" className={CSS.accountImg}/>
                    </div>
                </label>
                <input onChange={(e)=>{uploadFile(e.target.files[0])}} id="file" type="file" accept="image/png, image/jpg" className={CSS.upload}/>
                <div className={CSS.text}>Almost there, just give your profile a name!</div>
                <div className={CSS.inputWr}>
                    <input onChange={(e)=>{setInput(e.target.value)}} type="text" className={CSS.input}/>
                    {input === ""? 
                    <div onClick={logOut} className={CSS.button + " " + CSS.logout}><img src={logoutIcon} alt="logout"/></div>
                    :
                    <div onClick={submit} className={CSS.button}><img src={arrowIcon} alt="submit"/></div>
                    }
                </div>
            </div>
        </div>
    )
}