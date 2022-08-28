import axios from "axios"
import { useRef, useContext, useState, useEffect } from "react"
import { AuthContext } from "../../context/Authcontext"
import "./myaccount.css"



export const MyAccount = () => {

    const token = useContext(AuthContext)
    const [info, setInfo] = useState([])

    const elFirst = useRef("")
    const elLast = useRef("")
    const elNumber = useRef("")
    const elPhoto = useRef("")

    useEffect(() => {
        axios.get("https://book-service-layer.herokuapp.com/user/me", {
            headers: {
                Authorization: token.token
            }
        })
            .then(res => setInfo(res.data))
    }, [elFirst, elLast, elNumber, elPhoto])



    const handelFormAcc = (evt) => {
        evt.preventDefault()
        const formAcc = new FormData()

        formAcc.append("first_name", elFirst.current.value);
        formAcc.append("last_name", elLast.current.value);
        formAcc.append("phone", elNumber.current.value);
        formAcc.append("image", elPhoto.current.files[0]);

        axios.put("https://book-service-layer.herokuapp.com/user/account", formAcc, {
            headers: {
                Authorization: token.token
            }
        })
            .then(data => console.log(data))
            .catch(err => console.log(err))

        evt.target.reset()
    }


    return (
        <>

            <div className="d-flex  justify-content-center">

                <form className="form w-25 account__form" onSubmit={handelFormAcc}>
                    <h2 className="profil__title">My profile</h2>

                    <div>
                        <h4 className="input__title">First Name</h4>
                        <input ref={elFirst} type="text" className="form-control" defaultValue={info.first_name} required />
                        <p className="input__text">Please enter your first name.</p>
                    </div>
                    <div>
                        <h4 className="input__title">Last Name</h4>
                        <input ref={elLast} type="text" className="form-control" defaultValue={info.last_name} required />
                        <p className="input__text">Please enter your last name.</p>
                    </div>
                    <div>
                        <h4 className="input__title">Phone</h4>
                        <input ref={elNumber} type="tel" className="form-control" defaultValue={info.phone} required />
                        <p className="input__text">Please enter your  phone number.</p>
                    </div>
                    <input ref={elPhoto} type="file" className="form-control " required />

                    <button className="save__btn" type="submit">Save Changes</button>


                </form>
            </div >
        </>
    )
}