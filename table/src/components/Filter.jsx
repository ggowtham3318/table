import React, { useState, useEffect } from "react";
import data from "../assets/NewData.json";
import MultiSelectDropdown from "../components/MultiSelectDropdown.jsx";

function PlayerTable() {
  const players = data.players;

  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState(players);

  const [availableTeams, setAvailableTeams] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [availableCountries, setAvailableCountries] = useState([]);

 
  const getUniqueValues = (key, list) => [...new Set(list.map((p) => p[key]))];


  useEffect(() => {
    setAvailableTeams(getUniqueValues("team", players));
    setAvailableRoles(getUniqueValues("role", players));
    setAvailableCountries(getUniqueValues("country", players));
  }, [players]);

  useEffect(() => {
    let filtered = players;

    if (selectedTeams.length > 0) {
      filtered = filtered.filter((p) => selectedTeams.includes(p.team));
    }

    setAvailableRoles(getUniqueValues("role", filtered));

    if (selectedTeams.length === 0) {
      setSelectedRoles([]);
      setSelectedCountries([]);
      setAvailableCountries(getUniqueValues("country", players));
    }
  }, [selectedTeams]);

 
  useEffect(() => {
    let filtered = players;

    if (selectedTeams.length > 0)
      filtered = filtered.filter((p) => selectedTeams.includes(p.team));

    if (selectedRoles.length > 0)
      filtered = filtered.filter((p) => selectedRoles.includes(p.role));

    setAvailableCountries(getUniqueValues("country", filtered));


    if (selectedRoles.length === 0 && selectedTeams.length > 0) {
      setSelectedCountries([]);
    }
  }, [selectedRoles, selectedTeams]);

  
  const handleFilter = () => {
    let filtered = players;

    if (selectedTeams.length > 0)
      filtered = filtered.filter((p) => selectedTeams.includes(p.team));

    if (selectedRoles.length > 0)
      filtered = filtered.filter((p) => selectedRoles.includes(p.role));

    if (selectedCountries.length > 0)
      filtered = filtered.filter((p) => selectedCountries.includes(p.country));

    setFilteredPlayers(filtered);
  };

  const handleReset = () => {
    setSelectedTeams([]);
    setSelectedRoles([]);
    setSelectedCountries([]);
    setFilteredPlayers(players);
    setAvailableTeams(getUniqueValues("team", players));
    setAvailableRoles(getUniqueValues("role", players));
    setAvailableCountries(getUniqueValues("country", players));
  };

  const headers = Array.from(new Set(players.flatMap((player) => Object.keys(player))));

  const teamOptions = availableTeams.map((t) => ({ label: t, value: t }));
  const roleOptions = availableRoles.map((r) => ({ label: r, value: r }));
  const countryOptions = availableCountries.map((c) => ({ label: c, value: c }));

  return (
    <div className="player-table-container">
      <h2 className="filter-title">Filter Players</h2>

      <div className="filter-bar">
        <MultiSelectDropdown
          options={teamOptions}
          selected={selectedTeams}
          setSelected={setSelectedTeams}
          placeholder="Select Teams"
        />

        <MultiSelectDropdown
          options={roleOptions}
          selected={selectedRoles}
          setSelected={setSelectedRoles}
          placeholder="Select Roles"
          disabled={availableRoles.length === 0}
        />

        <MultiSelectDropdown
          options={countryOptions}
          selected={selectedCountries}
          setSelected={setSelectedCountries}
          placeholder="Select Countries"
          disabled={availableCountries.length === 0}
        />

        <button className="filter-btn" onClick={handleFilter}>
          Apply
        </button>
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {headers.map((head, i) => (
                <th key={i}>{head.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player) => (
                <tr key={player.id}>
                  {headers.map((head) => (
                    <td key={head}>{player[head] || "-"}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} style={{ textAlign: "center", color: "gray" }}>
                  ❌ No matching players found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlayerTable;
