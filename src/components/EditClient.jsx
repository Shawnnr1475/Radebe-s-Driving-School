
const EditClient = ({client, clientInfor ,setShowEdit}) => {

    //Displays the edit component
    function editClick(){
        clientInfor.style.display = "flex"
        setShowEdit(false)
    }

    //Executed when the save button is clicked
    async function saveChanges(){
        const inputs = document.getElementsByTagName("input")
        const code = document.querySelector(".code-selector").value
        const type = document.querySelector(".type-selector").value
        const data = {
            name: inputs[0].value,
            surname: inputs[1].value,
            cell: inputs[2].value,
            code: code,
            type:type,
        }

        console.log(data)
        //Updates the clients infor
        await fetch(`https://radebesds-backend.herokuapp.com/client/${client._id}`,{
            method:"POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })


        window.location.reload()


    }
  return (
    <div className="edit-container">
        <input className="name-input" type="text" name="name" defaultValue={client.name} placeholder="Name"/>
        <input className="surn-input" type="text" name="surname" defaultValue={client.surname} placeholder="Surname"/>
        <input className="cell-input" type="tel" name="cell" defaultValue={client.cell} placeholder="Cell" />
        <select className="code-selector" defaultValue={client.code}>
            <option value="Code 8">Code 8</option>
            <option value="Code 10">Code 10</option>
            <option value="Code 14">Code 14</option>
        </select>
        <select className="type-selector" defaultValue={client.type}>
            <option value="Learners">Learners</option>
            <option value="License">License</option>
        </select>
        <div className="btns-container">
                <button className="btn-edit" onClick={saveChanges}>Save</button>
                <button className="btn-cancel" onClick={editClick} >Discard</button>
            </div> 
    </div>
  )
}

export default EditClient