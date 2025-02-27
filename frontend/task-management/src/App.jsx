import { useState , useEffect} from "react";
import "./App.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
const API_URL = "http://localhost:5000/api/tasks"; // Updated API URL


function App() {
  const [allTask, setAllTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

   // Fetch Tasks from Backend
   useEffect(() => {
    fetchTasks();
  }, []);

// show all task
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setAllTask(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // handle Create Task
  const handleCreateTask = async () => {
    if (!title.trim() || !desc.trim()) {
      alert("Title and Description are required!");
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        title,
        description: desc,
      });
      setAllTask([...allTask, response.data.task]);
      setTitle("");
      setDesc("");
      setOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const seeDescrption = (data)=>{
    setShowDesc(true);
    setDescription(data.description)
  }


  return (
    <>
      <div className="container">
        
        {/* navbar */}
        <div className="navbar">
          <h1>Task Management System</h1>
        </div>

        {/* main content showing task */}

        <div className="buttonCreate">
        <button className="create" onClick={()=>setOpen(true)}>Create Task</button>
        </div>

        <div className="content">
          <div className="cardContainer">
            {allTask?.map((task, index) => (
              <div key={index} className="cardTask">
                    <h5 onClick={() => seeDescrption(task)}>
                      {task?.title || "No Title"}
                    </h5>               
                <button className="edit">Edit</button>
                <button className="delete">Delete</button>
              </div>
            ))}
          </div>
        </div>

        {/* Dialog for create task */}
        <Dialog
        open={open}
        onClose={()=> setOpen(false)}
      >
        <DialogTitle>Create Task Here</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Title"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Desciption"
            label="Desciption"
            type="text"
            fullWidth
            value={desc}
            onChange={(e)=>setDesc(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateTask}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* show title dialog */}
      <Dialog
        open={showDesc}
        onClose={()=> setShowDesc(false)}
      >
        <DialogTitle>Description</DialogTitle>
        <DialogContent>{description}</DialogContent>
        <DialogActions>
          <Button onClick={()=> setShowDesc(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      </div>
    </>
  );
}

export default App;
