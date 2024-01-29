import React, { useState, useEffect } from "react";
import { Typography, Paper, Grid, Divider } from "@mui/material";

const DoctorBox = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors from backend
  const fetchDoctors = async () => {
    const token = localStorage.getItem("jwt_token");

    try {
      const response = await fetch("http://localhost:8080/doctor/doctors", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error.message);
    }
  };

  // Call fetchDoctors when the component mounts
  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <Paper
      elevation={3}
      style={{ padding: "16px", marginTop: "16px", backgroundColor: "#f7f7f7" }}
    >
      <Typography variant="h6" gutterBottom>
        Providers
      </Typography>
      <Divider style={{ marginBottom: "16px" }} />
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        <Grid container spacing={2}>
          {doctors.map((doctor, index) => (
            <Grid item xs={12} key={doctor.did}>
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
                  {`${doctor.dfname} ${doctor.dlname}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {doctor.specialty}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </Paper>
  );
};
export default DoctorBox;
