import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import AddTaskForm from "./components/AddTaskForm";
import UpdateForm from "./components/UpdateForm";
import ToDo from "./components/ToDo";

function App() {
  // Tasks (ToDo List)
  const [toDo, setToDo] = useState([]);

  // Temporary State
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  // Add Task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;

      // let newEntry = { id: num, title: newTask, status: false };
      // setToDo([...toDo, newEntry]);

      //Refactored
      setToDo([...toDo, { id: num, title: newTask, status: false }]);
      setNewTask("");
    }
  };

  // Delete Task
  const deleteTask = (id) => {
    // let newTasks = toDo.filter((task) => task.id !== id);
    // setToDo(newTasks);

    //Refactored
    setToDo(toDo.filter((task) => task.id !== id));
  };

  // Mark Task as done or completed
  const markDone = (id) => {
    // let newTask = toDo.map((task) => {
    //   if (task.id === id) {
    //     return { ...task, status: !task.status };
    //   }
    //   return task;
    // });
    // setToDo(newTask);

    // Refactored
    setToDo(
      toDo.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  // Cancel update
  const cancelUpdate = () => {
    setUpdateData("");
  };

  // Change Task for update
  const changeHolder = (e) => {
    // let newEntry = {
    //   id: updateData.id,
    //   title: e.target.value,
    //   status: updateData.status ? true : false,
    // };
    // setUpdateData(newEntry);

    // Refactored
    setUpdateData({
      ...updateData,
      title: e.target.value,
    });
  };

  // Update Task
  const updateTask = () => {
    // let filterRecords = [...toDo].filter((task) => task.id !== updateData.id);
    // let updatedObject = [...filterRecords, updateData];
    // setToDo(updatedObject);

    // Refactored
    let removeOldRecord = [...toDo].filter((task) => task.id !== updateData.id);
    setToDo([...removeOldRecord, updateData]);
    setUpdateData("");
  };

  return (
    <div className="container App">
      <br />
      <h2>To Do List App</h2>
      <br />

      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeHolder={changeHolder}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm
          newTask={newTask}
          addTask={addTask}
          setNewTask={setNewTask}
        />
      )}

      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
