import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React from "react";

function MyTable() {
    return (
        <TableContainer sx={{px:4}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Sl.No</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                <TableRow >
                            <TableCell>sf</TableCell>
                            <TableCell>dashboard</TableCell>
                            <TableCell>sdfsf</TableCell>
                            <TableCell>dfssdf</TableCell>
                            <TableCell sx={{ fontSize: "small" }}>
                                <IconButton
                                    sx={{ color: "red", fontSize: "small" }}
                                    onClick={() => deletUser(user._id)}
                                >
                                    <DeleteForeverIcon />
                                    Delete
                                </IconButton>
                            </TableCell>

                        </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MyTable;