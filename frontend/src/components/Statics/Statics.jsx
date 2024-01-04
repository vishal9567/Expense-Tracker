import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

function Statics({ Icon, title, values,bgColor="rgb(40,38,37)" }) {
    const IconComponent = Icon;
    return (
        <Grid item xs={12} md={4}>
            <Container
                sx={{
                    height: '100px',
                    backgroundColor: bgColor,
                    borderRadius: "10px",
                    ":hover": {
                        backgroundColor: "rgb(99, 99, 97)",
                        "& .hoverTypo": {
                            backgroundColor: "rgb(99, 99, 97)",
                            color: "white",
                        },
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
            >
                <Box sx={{ paddingTop: '15px' }}>
                    {title && <Typography className="hoverTypo">{title}</Typography>}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", paddingBottom: '15px' }}>
                    {IconComponent && (
                        <IconComponent
                            className={"hoverTypo"}
                            sx={{ color: "white", backgroundColor: bgColor }}
                        />
                    )}
                    {values && <Typography className="hoverTypo">{values}</Typography>}
                </Box>
            </Container>
        </Grid>
    );
}

export default Statics;