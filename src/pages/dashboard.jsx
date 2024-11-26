import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import UserManagement from "../components/UserManagement";
import RoleManagement from "../components/RoleManagement";
import Permissions from "../components/Permissions";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="User Management" />
        <Tab label="Role Management" />
        <Tab label="Permissions" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {activeTab === 0 && <UserManagement />}
        {activeTab === 1 && <RoleManagement />}
        {activeTab === 2 && <Permissions />}
      </Box>
    </Box>
  );
};

export default Dashboard;
