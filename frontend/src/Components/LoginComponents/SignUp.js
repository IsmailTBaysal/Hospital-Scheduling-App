import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../Auth/api";
import Alert from "@mui/material/Alert";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/theacademy/final-project-team-6"
      >
        MedTime{" "}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const SignUp = ({ onRegistrationSuccess, onBackButtonClick }) => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !userCredentials.username ||
      !userCredentials.password ||
      !userCredentials.email
    ) {
      setError("Username, password, and email are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await register(userCredentials);
      if (response) {
        setRegistrationSuccess(true);

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url("/signIn.jpg")`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={9} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 30,
              mx: 4,
              px: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Alert for successful registration */}
            {registrationSuccess && (
              <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
                Registration successful! Redirecting to login...
              </Alert>
            )}
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleRegister}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    autoComplete="user-name"
                    name="userName"
                    id="InputUsername"
                    label="User Name"
                    autoFocus
                    value={userCredentials.username}
                    onChange={(e) =>
                      setUserCredentials({
                        ...userCredentials,
                        username: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={userCredentials.email}
                    onChange={(e) =>
                      setUserCredentials({
                        ...userCredentials,
                        email: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={userCredentials.password}
                    onChange={(e) =>
                      setUserCredentials({
                        ...userCredentials,
                        password: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2" onClick={handleSignInClick}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Copyright sx={{ mt: 5 }} />.
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default SignUp;
