import React, { useState, useEffect } from "react";

const FetchData = () => {
  const [data, setData] = useState([]);
  const [dataChanged, setDataChanged] = useState([]);
  const [editRowIndex, setEditRowIndex] = useState(null);
  useEffect(() => {
    const url = "https://run.mocky.io/v3/ffb2ab39-247a-4797-b4bd-185451fd1e4a";

    const getData = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      setDataChanged(json);
    };
    getData();
  }, []);

  const handleDelete = (deletedId) => {
    const filteredData = data.filter(({ id }) => id !== deletedId);
    return setData(filteredData);
  };

  const handleEdit = (index) => {
    setEditRowIndex(index);
  };
  const handleSave = (index) => {
    setData(dataChanged);
    setEditRowIndex(null);
  };

  const handleInputChange = (event, index) => {
    const value = event.target.value;
    const key = event.target.name;
    const newData = [...dataChanged];
    newData[index][key] = value;
    setDataChanged(newData);
  };

  const handleCancelChange = (index) => {
    // setData(data);
    setEditRowIndex(null);
    setDataChanged([...data]);
  };

  console.log(data);
  return (
    <div>
      <h3>Fetch table list</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Range</th>
            <th>Trashhold Value</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map(({ id, name, range, thresholdValue }, idx) => {
              return (
                <tr key={id}>
                  {editRowIndex === idx ? (
                    <>
                      <td>{id}</td>
                      <td>
                        <input
                          type="text"
                          value={dataChanged[idx].name}
                          name="name"
                          onChange={(e) => handleInputChange(e, idx)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={dataChanged[idx].range}
                          name="range"
                          onChange={(e) => handleInputChange(e, idx)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={dataChanged[idx].thresholdValue}
                          name="thresholdValue"
                          onChange={(e) => handleInputChange(e, idx)}
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>{range}</td>
                      <td>{thresholdValue}</td>
                    </>
                  )}
                  <td>
                    <button onClick={() => handleDelete(id)}>Delete</button>
                  </td>
                  {editRowIndex === idx ? (
                    <td>
                      <button onClick={() => handleSave(idx)}>Save</button>
                      <button onClick={() => handleCancelChange(idx)}>
                        Cancel
                      </button>
                    </td>
                  ) : (
                    <td>
                      <button onClick={() => handleEdit(idx)}>Edit</button>
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default FetchData;
