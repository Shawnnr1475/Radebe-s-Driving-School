
const RegisterFrorm = ({setshowRegForm,setClients}) => {
    // Executed when the register button is click
    function regBtnClick(){
        const inputs = document.getElementsByTagName("input")
        const code = document.querySelector(".code-selector").value
        const type = document.querySelector(".type-selector").value
        let balance = 0

        if(type === "Learners"){
            balance = 500
        }
        else if(type === "License" && code !== "Code 14"){
            balance = 2500
        }

        else{
            balance = 7500
        } 
        const data = {
            name: inputs[0].value,
            surname: inputs[1].value,
            cell: inputs[2].value,
            code: code,
            type:type,
            balance: balance
        }

        CreateNewClient(data)
    }

    //Creates a new Client
    async function CreateNewClient(data){
        const res = await fetch("https://radebesds-backend.herokuapp.com/newclient",{
            method:"POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const results = await res.json()

        
        window.location.reload()
        
    }

    //Removes the registration form
    function RemoveRegForm(){
        setshowRegForm(false)
    }

    return (
        <div className="reg-form-container" >
            <div className="form-container">
                <div className="profile-pc">
                    <h1>RDS</h1>
                </div>
                <input className="name-input" type="text" name="name" placeholder="Name"/>
                <input className="surn-input" type="text" name="surname" placeholder="Surname"/>
                <input className="cell-input" type="tel" name="cell" placeholder="Cell" />
                <select className="code-selector">
                    <option value="Code 8">Code 8</option>
                    <option value="Code 10">Code 10</option>
                    <option value="Code 14">Code 14</option>
                </select>
                <select className="type-selector">
                    <option value="Learners">Learners</option>
                    <option value="License">License</option>
                </select>
                <button className="reg-btn" onClick={regBtnClick}>Register</button>
                <button className="cancel-reg-btn" onClick={RemoveRegForm} >Cancel</button>
            </div>
        </div>
    )
}

export default RegisterFrorm