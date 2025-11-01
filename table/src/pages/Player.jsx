import Table from '../components/Fetch'
import data from '../assets/NewData.json'

 function  Player() {
  const headers = Object.keys(data.players[0]); 

  return (
    <div>
      <h2>Player Stats</h2>
      <Table data={data.players} headers={headers} />
    </div>
  );
}

export default Player;