import Table from './Fetch';
import data from './assets/NewData.json'; 

function Bowler() {
  const headers = Object.keys(data.players[0]);
  return (
    <div>
      <h2>Bowler Stats</h2>
      <Table data={data.players} headers={headers} />
    </div>
  );
}
 export default Bowler;<q></q>