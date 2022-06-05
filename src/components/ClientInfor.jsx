import EditClient from "./EditClient"
import { useState } from "react"

const ClientInfor = ({client, setShowClientInfor}) => {
    //Executed when the edit button is clicked
    function editClick(){
        const content = document.querySelector(".content")
        setClientInfor(content)
        content.style.display = "none"
        setShowEdit(true)
    }

    function payBtnClick(){
        const payContainer = document.querySelector(".pay-container")
        payContainer.style.height = "fit-content"
    }

    async function confirmPayBtnClick(){
        const amount = document.querySelector(".pay-amount").value
        const newbalance = client.balance - parseInt(amount)

        await fetch(`https://radebesds-backend.herokuapp.com/client-payment/${client._id}`,{
            method:"POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({balance:newbalance})
        })

        window.location.reload()

    }

    const [showEdit,setShowEdit] = useState()
    const [clientInfor,setClientInfor] = useState()
  return (
    <div className="client-infor-main">
        <div className="client-infor-container">
            <div className="proflie-pic-container">
                <h1>{client.name[0]}</h1>
            </div>
            <div className="content">
                <h2>{client.name +" " + client.surname}</h2>
                <h3>{client.cell}</h3>
                <p>{client.code}</p>
                <p>{client.type}</p>
                <p className="balance">{"R"+client.balance+".00"}<span onClick={payBtnClick}>Pay</span></p>
                <div className="pay-container">
                    <input className="pay-decript" type="text" placeholder="description"/>
                    <input className ="pay-amount" type="number" />
                    <button className="btn-confirm-pay" onClick={confirmPayBtnClick}>Confirm Payment</button>
                </div>
                <div className="btns-container">
                <button className="btn-edit" onClick={editClick}>Edit</button>
                <button className="btn-cancel" onClick={()=>{setShowClientInfor(false)}}>Cancel</button>
            </div>
            </div>
            {showEdit?<EditClient client ={client} clientInfor={clientInfor} setShowEdit={setShowEdit}/>:""}
        </div>
    </div>
  )
}

export default ClientInfor