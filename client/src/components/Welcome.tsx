import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UsernameContext from "../shared/UsernameContext";
import Audio from "./Audio";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

const Welcome: React.FC = () => {
  const { username } = useContext(UsernameContext);
  const navigate = useNavigate();

  function handleNavigation(route: string) {
    navigate(route);
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", marginTop: "0px" }}>
        <Audio />
        <Typography style={{ margin: "15px auto", fontSize: "20px" }}>
          <b>Welcome To Tranquility, {username}!</b>
        </Typography>
        <Grid container spacing={2} style={{ alignItems: "center", justifyContent: "center", marginTop: "0px" }}>
          <Grid item xs={4} alignSelf="center" style={{ alignItems: "stretch" }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={() => handleNavigation("/breathing")}>
                <CardMedia
                  component="img"
                  height="140"
                  image="../src/assets/images/breathing.png"
                  alt="human breathing cartoon"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Relaxing Breathing Exercises
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                    continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4} alignSelf="center" style={{ alignItems: "stretch" }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={() => handleNavigation("/journal")}>
                <CardMedia
                  component="img"
                  height="140"
                  image="../src/assets/images/journal_entry_writing.jpeg"
                  alt="person sitting and writing in notebook on the grass on a sunny day"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Write a Journal Entry
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                    continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4} alignSelf="center" style={{ alignItems: "stretch" }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={() => handleNavigation("/prev_journal")}>
                <CardMedia
                  component="img"
                  height="140"
                  image="../src/assets/images/previous_journal_entry_record.jpeg"
                  alt="old notebook"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Previous Journal Entries
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                    continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Welcome;
