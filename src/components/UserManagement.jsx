import React, { useState, useEffect } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../services/api";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", role: "", status: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await getUsers();
    setUsers(data);
  };

  const handleAdd = async () => {
    await addUser(currentUser);
    fetchUsers();
    handleClose();
  };

  const handleUpdate = async (id) => {
    await updateUser(id, currentUser);
    fetchUsers();
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleOpen = (user = { name: "", role: "", status: "" }) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <h2>User Management</h2>
      <Button variant="contained" onClick={() => handleOpen()}>
        Add User
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(user)}>Edit</Button>
                <Button onClick={() => handleDelete(user.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentUser.id ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={currentUser.name}
            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
          />
          <TextField
            label="Role"
            fullWidth
            value={currentUser.role}
            onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
          />
          <TextField
            label="Status"
            fullWidth
            value={currentUser.status}
            onChange={(e) => setCurrentUser({ ...currentUser, status: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={currentUser.id ? () => handleUpdate(currentUser.id) : handleAdd}>
            {currentUser.id ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;
