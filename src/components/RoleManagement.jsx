import React, { useState, useEffect } from "react";
import { getRoles, addRole, updateRole, deleteRole } from "../services/api";
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

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({ name: "", permissions: [] });
  const [permissionsInput, setPermissionsInput] = useState("");

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const { data } = await getRoles();
    setRoles(data);
  };

  const handleAdd = async () => {
    const newRole = {
      ...currentRole,
      permissions: permissionsInput.split(",").map((perm) => perm.trim()),
    };
    await addRole(newRole);
    fetchRoles();
    handleClose();
  };

  const handleUpdate = async (id) => {
    const updatedRole = {
      ...currentRole,
      permissions: permissionsInput.split(",").map((perm) => perm.trim()),
    };
    await updateRole(id, updatedRole);
    fetchRoles();
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteRole(id);
    fetchRoles();
  };

  const handleOpen = (role = { name: "", permissions: [] }) => {
    setCurrentRole(role);
    setPermissionsInput(role.permissions?.join(", ") || "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRole({ name: "", permissions: [] });
    setPermissionsInput("");
  };

  return (
    <div>
      <h2>Role Management</h2>
      <Button variant="contained" onClick={() => handleOpen()}>
        Add Role
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.permissions.join(", ")}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(role)}>Edit</Button>
                <Button onClick={() => handleDelete(role.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentRole.id ? "Edit Role" : "Add Role"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            fullWidth
            value={currentRole.name}
            onChange={(e) => setCurrentRole({ ...currentRole, name: e.target.value })}
          />
          <TextField
            label="Permissions (comma-separated)"
            fullWidth
            value={permissionsInput}
            onChange={(e) => setPermissionsInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={currentRole.id ? () => handleUpdate(currentRole.id) : handleAdd}>
            {currentRole.id ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
