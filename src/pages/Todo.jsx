import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash, Save } from "lucide-react";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskDescription, setEditTaskDescription] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), description: newTask, completed: false }]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, description) => {
    setEditTaskId(id);
    setEditTaskDescription(description);
  };

  const saveTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, description: editTaskDescription } : task
      )
    );
    setEditTaskId(null);
    setEditTaskDescription("");
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Todo App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter a new task"
            />
            <Button onClick={addTask}>Add Task</Button>
          </div>
          <div>
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-2 mb-2">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                />
                {editTaskId === task.id ? (
                  <Input
                    value={editTaskDescription}
                    onChange={(e) => setEditTaskDescription(e.target.value)}
                  />
                ) : (
                  <span className={task.completed ? "line-through" : ""}>
                    {task.description}
                  </span>
                )}
                {editTaskId === task.id ? (
                  <Button variant="outline" size="icon" onClick={() => saveTask(task.id)}>
                    <Save className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="outline" size="icon" onClick={() => editTask(task.id, task.description)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="outline" size="icon" onClick={() => deleteTask(task.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <span>Total Tasks: {tasks.length}</span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Todo;