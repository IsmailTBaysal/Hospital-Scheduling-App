import React, { useState, useEffect } from "react";
import { Typography, Paper, Grid, Divider } from "@mui/material";

const PatientBox = () => {
  const [patients, setPatients] = useState([]);

  // Fetch patients from backend
  const fetchPatients = async () => {
    const token = localStorage.getItem("jwt_token");

    try {
      const response = await fetch("http://localhost:8080/patients", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error.message);
    }
  };

  // Call fetchPatients when the component mounts
  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <Paper
      elevation={3}
      style={{ padding: "16px", marginTop: "16px", backgroundColor: "#f7f7f7" }}
    >
      <Typography variant="h6" gutterBottom>
        Patients
      </Typography>
      <Divider style={{ marginBottom: "16px" }} />
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        <Grid container spacing={2}>
          {patients.map((patient, index) => (
            <Grid item xs={12} key={patient.pid}>
              <Paper
                elevation={2}
                style={{
                  padding: "16px",
                  borderRadius: "8px",
                  textAlign: "left",
                  backgroundColor: "white",

                  marginBottom: "1px",
                }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  {`${patient.pFName} ${patient.pLName}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {patient.phoneNumber}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </Paper>
  );
};
export default PatientBox;
