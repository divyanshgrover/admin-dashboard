import React, { useState, useEffect } from "react";
import { getRoles, updateRole } from "../services/api";
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

const Permissions = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [permissionsInput, setPermissionsInput] = useState("");

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const { data } = await getRoles();
    setRoles(data);
  };

  const handleOpen = (role) => {
    setCurrentRole(role);
    setPermissionsInput(role.permissions.join(", "));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRole(null);
    setPermissionsInput("");
  };

  const handleUpdatePermissions = async () => {
    const updatedRole = {
      ...currentRole,
      permissions: permissionsInput.split(",").map((perm) => perm.trim()),
    };
    await updateRole(currentRole.id, updatedRole);
    fetchRoles();
    handleClose();
  };

  return (
    <div>
      <h2>Permissions Management</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role</TableCell>
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
                <Button onClick={() => handleOpen(role)}>Edit Permissions</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Permissions</DialogTitle>
        <DialogContent>
          <TextField
            label="Permissions (comma-separated)"
            fullWidth
            value={permissionsInput}
            onChange={(e) => setPermissionsInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdatePermissions}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Permissions;
