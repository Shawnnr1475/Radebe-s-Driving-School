import { useEffect} from "react"
//This is the main component that you land on
const Home = ({clients,setClients,setshowRegForm, setShowClientInfor,setSelectedClient}) => {

    useEffect(()=>{

        // fetches all the clients data from the database
        const getClients = async ()=>{
            const res = await fetch("https://radebesds-backend.herokuapp.com/clients")
            if(res.status === 200){
                const data = await res.json()
                setClients(data)
            }
        }
        getClients()
    },[])

    // Displays the registration form 
    function displayRegForm(){
        setshowRegForm(true)
    }

    //Displays the all the information of the client that was click
    function displayClientInfor(client){
        setShowClientInfor(true)
        setSelectedClient(client)
    }

    //Deletes the client
    async function removeClick(client){
        const askConfirm = window.confirm(`Delete ${client.name + " " + client.surname} record`)

        if(askConfirm){
            
        await fetch(`https://radebesds-backend.herokuapp.com/client/${client._id}`,{
            method: "DELETE",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(result=>{
            window.location.reload()
        })
    }

    }

  return (
      <div className="container">
        <header className="header-container">
            <h1>Radebe's Driving School</h1>
        </header>
        <div className="new-btn-container">
            <button className="btn-new-client" onClick={displayRegForm}>Register New Client</button>
        </div>
        <div className="list-of-clients">
            {/* Map through the clients and display a preview of each client */}
            {clients.map(client=>{
                return(
                    <div className="client-preview" key={client._id} >
                        <p className="p-name" onClick={()=>{displayClientInfor(client)}}>{client.name + " " +client.surname}</p>
                        <p>{client.code}</p>
                        <p>{client.type}</p>
                        <div>
                        <p className="remove-btn" onClick={()=>{removeClick(client)}}>Remove</p>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
  )
}

export default Home