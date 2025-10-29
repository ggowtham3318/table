import data from './assets/Data.json';

function Fetch(){
    const headers = Object.keys(data[0])
    

    return(
        <>
        <div className="table">
            <table>
                <thead>
                <tr id="top">
                    {headers.map((key,index)=>(
                        <th key={index}>{key}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                    {data.map((row,rowIndex)=>(
                        <tr key={rowIndex}>
                           {headers.map((key,colIndex)=>(
                            <td key= {colIndex}>{row[key]}</td>
                           ))}
                        </tr>
                        ))}
               </tbody> 
            </table>

        </div>
        </>
    );
}

export default Fetch;

//npx json-server  --watch table\public\Data.json  --port 3000  --static ./data..