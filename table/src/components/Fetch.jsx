function Fetch({ data, headers }) {
  return (
    <div >
      <table id="tablebody">
        <thead>
          <tr >
            {headers.map((header, i) => (
              <th key={i} >
                {header.replace(/_/g, ' ')}
              </th>
            ))}
          </tr>
        </thead>

        <tbody >
          {data.map((row, i) => (
            <tr key={i} >
              {headers.map((header, j) => (
                <td key={j} >
                  {Array.isArray(row[header])
                    ? row[header].join(', ')
                    : row[header] ?? '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default Fetch;
