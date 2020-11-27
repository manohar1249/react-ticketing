import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';

const TicketApp = () => {
    const [data,setData] = useState([]);
    const [agent,setAgent] = useState([]);

    const fetchData = async()=>{
        let datas = await fetch("http://localhost:5000/tickets");
        let res = await datas.json();
        console.log(res);
       let a = data.concat(res);
        console.log(a);
        setData(a);
    }
    const fetchAgent = async()=>{
        let name = document.getElementById("agent").value;
        console.log(name);
        let datas = await fetch("http://localhost:5000/tickets/"+name);
        let res = await datas.json();
        console.log(res);
       let a = agent.concat(res);
        //console.log(a);
        setAgent(a);
    }

    const addUser = async()=>{
        let data = {
            "name": document.getElementById("name").value,
            "agent": document.getElementById('agent1').value,
            "date": document.getElementById('date').value
        }
        console.log(data);
        let res = await fetch("http://localhost:5000/ticket",
        {
         method:"POST",
         body: JSON.stringify(data),
         headers:{"Content-Type":"application/json"},
     });
     console.log(res);
    }
    useEffect(()=>{
      
    },[])
return (
    <div>
        <div>
        <input type="text" id="name"  />
        <input type="text" id="agent1"  />
        <input type="text" id="date"  />
        <br />
        <br />
        <button onClick={addUser}>addUser</button>
        </div>
   
    <input type="text" id="agent"  />
    <button onClick={fetchAgent}>getAgent</button>
    <br />
    {agent.map((age,ind)=>{
        return (
            <div>
                <h2>{age._id}</h2>
                <p>{age.name}</p>
                <h3>{age.agent}</h3>
                <h4>{age.pnr}</h4>
                
            </div>
        )
    })}
    <button onClick={fetchData}>getTickets</button>
    <br />
    {data.map((dat,ind)=>{
        return (
            <div>
                <h2>{dat._id}</h2>
                <p>{dat.name}</p>
                <h3>{dat.agent}</h3>
                <h4>{dat.pnr}</h4>
                
            </div>
        )
    })}
</div>
)

}

ReactDOM.render(<TicketApp />,document.getElementById('root'));