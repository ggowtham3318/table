import Table from '../components/Fetch'
import data from '../assets/NewData.json'

 function  Batter() {
  const headers = Object.keys(data.players[0]); 

  return (
    <div>
      <h2>Batter Stats</h2>
      <Table data={data.players} headers={headers} />
    </div>
  );
}

export default Batter;