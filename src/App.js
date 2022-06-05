import { useState } from "react";
import Home from "./components/Home"
import RegisterFrorm from "./components/RegisterFrorm";
import ClientInfor from "./components/ClientInfor";

function App() {
  const [clients,setClients] = useState([])
  const [showRegForm,setshowRegForm] = useState(false)
  const [showClientInfor,setShowClientInfor] = useState(false)
  const [selectedClient,setSelectedClient] = useState({})

  return (
    <div className="app">
      <Home clients={clients} setClients={setClients} setshowRegForm={setshowRegForm} setShowClientInfor={setShowClientInfor} setSelectedClient={setSelectedClient}/>
      {showRegForm?<RegisterFrorm setshowRegForm={setshowRegForm} setClients={setClients}/>:""}
      {showClientInfor?<ClientInfor client={selectedClient} setShowClientInfor= {setShowClientInfor}/>:""}
    </div>
  );
}

export default App;
