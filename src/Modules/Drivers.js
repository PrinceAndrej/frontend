import React, { useState, useEffect } from "react";
import Header from "./Header";

const Drivers = () => {
  // State to hold the fetched data
  const [drivers, setDrivers] = useState([]);
  const [isAddDriverModalOpen, setIsAddDriverModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newDriver, setNewDriver] = useState({
    name: "",
    age: "",
    nationality: "",
    image: "",
  });

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5282/api/Drivers");
      const data = await response.json();
      setDrivers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addDrivers = () => {
    setIsAddDriverModalOpen(true);
  };

  const closeAddDriverModal = () => {
    setIsAddDriverModalOpen(false);
    // Clear the input fields when the modal is closed
    setNewDriver({
      name: "",
      age: "",
      nationality: "",
      image: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDriver((prevDriver) => ({
      ...prevDriver,
      [name]: value,
    }));
  };

  const addDriver = async () => {
    try {
      // Make a POST request to add the new driver
      const response = await fetch("http://localhost:5282/api/Drivers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDriver),
      });

      if (response.ok) {
        // If the request is successful, update the state with the new driver
        const data = await response.json();
        setDrivers((prevDrivers) => [...prevDrivers, data]);
        // Close the modal
        closeAddDriverModal();
      } else {
        console.error(
          "Failed to add driver. Server returned:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error adding driver:", error);
    }
  };
  const deleteDriver = async (driverId) => {
    try {
      // Make a DELETE request to remove the driver
      const response = await fetch(
        `http://localhost:5282/api/Drivers/${driverId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // If the request is successful, update the state without the deleted driver
        setDrivers((prevDrivers) =>
          prevDrivers.filter((driver) => driver.id !== driverId)
        );
      } else {
        console.error(
          "Failed to delete driver. Server returned:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  return (
    <div className="bg-black h-screen">
      <Header />
      <button onClick={addDrivers} className="bg-white m-2">
        Add Driver
      </button>

      {/* Add Driver Modal */}
      {isAddDriverModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="text-white" onClick={closeAddDriverModal}>
              <button>Close</button>
            </span>
            <form className="flex flex-col">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={newDriver.name}
                onChange={handleInputChange}
              />
              <label>Age:</label>
              <input
                type="text"
                name="age"
                value={newDriver.age}
                onChange={handleInputChange}
              />
              <label>Nationality:</label>
              <input
                type="text"
                name="nationality"
                value={newDriver.nationality}
                onChange={handleInputChange}
              />
              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={newDriver.image}
                onChange={handleInputChange}
              />
              <button
                className="bg-white w-12"
                type="button"
                onClick={addDriver}
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}

      <ul className="grid grid-cols-4  ">
        {drivers.map((driver) => (
          <li
            key={driver.id}
            className=" p-4 mt-2 mr-2 ml-2 rounded-lg h-72 flex flex-col items-center justify-center bg-gray-900 shadow-lg"
          >
            <img
              src={driver.image}
              alt={`Image of ${driver.name}`}
              className="w-24 h-24 object-cover rounded-full mb-12"
            />
            <p>
              Name: <span>{driver.name}</span>
            </p>
            <p>
              Age: <span>{driver.age}</span>
            </p>
            <p>
              Nationality: <span>{driver.nationality}</span>
            </p>
            <button
              onClick={() => deleteDriver(driver.id)}
              className="bg-white"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drivers;
