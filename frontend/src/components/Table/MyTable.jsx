import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { currentPage, setTotalCount, userData } from "../../utils/slices/userSlice";
import MyAlert from "../Alert/MyAlert";

const baseUrl = import.meta.env.VITE_BASE_URL;

function MyTable() {
    const [tableData, setTableData] = useState("");
    const [togle,setTogle]=useState(false)
    const [alert, setAlert] = useState({
        id: '',
        open: false,
        msg: ''
    })
    const user = useSelector(userData);
    const dispatch=useDispatch()
    const CurrentPage=useSelector(currentPage)
    const perPage=3;
    const skip=CurrentPage*perPage - perPage;
    const limit=skip + perPage;

    const setPagination=(data)=>{
        const len=data.length
        const totalCount=Math.ceil(len/perPage)
        dispatch(setTotalCount(totalCount))
        const Data=data.slice(skip,limit)
        setTableData(Data);
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`${baseUrl}/expeseList?id=${user.id}`);
            setPagination(data)
        };
        fetchData();
    }, [togle,CurrentPage]);

    const getDate = (isoDate) => {
        const date = new Date(isoDate);
        const formattedDate = date.toLocaleDateString();

        return formattedDate;
    };

    const deletExpense = (id) => {
        const expenses = tableData.filter(item => item._id === id)
        setAlert((current) => ({
            ...current,
            id: id,
            open: true,
            msg: `Are you want to delete '${expenses[0].category}'`
        }))
    };
    const closeAlert = () => {
        setAlert({ id: '', open: false, msg: '' })
    }
    const handleDeleteAgree = async (id) => {
        await axios.delete(`${baseUrl}/deleteExpense?id=${id}&userId=${user.id}`)  
        setTogle(!togle)
        closeAlert()
    }

    return (
        <TableContainer sx={{ px: 4 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Sl.No</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Expense</TableCell>
                        <TableCell>Expense Type</TableCell>
                        <TableCell>Option</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData &&
                        tableData.map((item, i) => (
                            <TableRow key={item._id}>
                                <TableCell>{perPage * (CurrentPage - 1) + (i + 1)}</TableCell>
                                <TableCell>{getDate(item?.date)}</TableCell>
                                <TableCell>{item?.amount}</TableCell>
                                <TableCell>{item?.category}</TableCell>
                                <TableCell sx={{ fontSize: "small" }}>
                                    <IconButton
                                        sx={{ color: "red", fontSize: "small" }}
                                        onClick={() => deletExpense(item._id)}
                                    >
                                        <DeleteForeverIcon />
                                        Delete
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {tableData.length === 0 ? <Typography textAlign={'center'}>No Expenses</Typography> : ""}
            <MyAlert handleClose={closeAlert} open={alert.open} handleAgree={handleDeleteAgree} id={alert.id} msg={alert.msg}/>
        </TableContainer>
    );
}

export default MyTable;
