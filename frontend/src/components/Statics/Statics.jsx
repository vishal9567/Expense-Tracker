import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

function Statics({ Icon, title, values }) {
  const IconComponent = Icon;
  return (
    <Grid item xs={3} md={9}>
      <Container
        sx={{
          height: '100px',
          backgroundColor: "rgb(40,38,37)",
          borderRadius: "10px",
          ":hover": {
            backgroundColor: "rgb(242,78,112)",
            "& .hoverTypo": {
              backgroundColor: "rgb(242,78,112)",
              color: "white",
            },
          },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ paddingTop: '15px' }}>
            <Typography>dashboard</Typography>
          {title && <Typography className="hoverTypo">{title}</Typography>}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", paddingBottom: '15px' }}>
          {values && <Typography className="hoverTypo">{values}</Typography>}
          {IconComponent && (
            <IconComponent
              className={"hoverTypo"}
              sx={{ color: "rgb(242,78,112)", backgroundColor: "white" }}
            />
          )}
        </Box>
      </Container>
    </Grid>
  );
}

export default Statics;