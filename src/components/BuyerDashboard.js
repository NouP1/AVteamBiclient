import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import dayjs from 'dayjs';
import { IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeSelector from './DateRangeSelector';
import { message } from 'ant-design-vue';

const BuyerDashboard = ({ username, dateRange, onDateRangeChange }) => {
  const [records, setRecords] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpensesAgn, setTotalExpensesAgn] = useState(0);
  const [totalExpensesAcc, setTotalExpensesAcc] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalRecordsCount, setTotalRecordsCount] = useState(0);
  const [totalRoi, setTotalRoi] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDateRangeSelectorOpen, setDateRangeSelectorOpen] = useState(false);
  // const[message,setMessage] = useState(false)

  const { startDate, endDate } = dateRange || {};

  const handleDateRangeSelected = (range) => {
    onDateRangeChange(range); // Передаем диапазон дат в родительский компонент
    setDateRangeSelectorOpen(false); // Закрываем модальное окно
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        console.log('Fetching records for:', { startDate, endDate });
        const response = await axios.get(`http://localhost:3100/api/buyer/${username}/records`, {
          params: {
            startDate: dayjs(startDate).format('YYYY-MM-DD'),
            endDate: dayjs(endDate).format('YYYY-MM-DD')
          }
        });
        const { records, totalIncome, totalExpensesAgn, totalExpensesAcc, totalProfit, totalRecordsCount, totalRoi } = response.data || {};

        setRecords(records);
        setTotalIncome(totalIncome);
        setTotalExpensesAgn(totalExpensesAgn);
        setTotalExpensesAcc(totalExpensesAcc);
        setTotalProfit(totalProfit);
        setTotalRecordsCount(totalRecordsCount);
        setTotalRoi(totalRoi);
        // setMessage(message)

      } catch (err) {
        setError('Ошибка загрузки данных');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (startDate && endDate) {
      fetchRecords();
    }
  }, [username, startDate, endDate]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  const formatCurrency = (value) => {
    return value < 0 ? `-$${Math.abs(value)}` : `$${value}`;
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 16, padding: 3, borderRadius: 3, boxShadow: 5 }}>

        <DateRangeSelector
          open={isDateRangeSelectorOpen}
          onClose={() => setDateRangeSelectorOpen(false)}
          onRangeSelected={handleDateRangeSelected}
        />



        <TableContainer component={Paper} sx={{ borderRadius: 0, boxShadow: 0, border: 'none', overflowX: 'auto' }}>
          <Table sx={{ borderRadius: 0, minWidth: 650 }}>

            <TableHead>
              <TableRow>
                <TableCell sx={{ padding: 1, fontSize: 35, borderBottom: 'none', verticalAlign: 'sub' }} >
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: -2 }}>
                    <Typography variant="h5" gutterBottom>
                      {username}
                    </Typography>
                    <IconButton
                      color="primary"
                      onClick={() => setDateRangeSelectorOpen(true)}
                      sx={{
                        padding: '8px' // Отступы
                      }}
                    >
                      <CalendarTodayIcon />
                    </IconButton>
                   
                  </Box> 
                  <Typography variant="h7" gutterBottom sx={{fontSize: 15}}>
                    {dayjs(startDate).format('YYYY.MM.DD')} — {dayjs(endDate).format('YYYY.MM.DD')}
                    </Typography>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', paddingLeft: 2, borderBottom: 'none', fontSize: 16 }}>{`$${totalIncome || 0}`}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', paddingLeft: 2, borderBottom: 'none', fontSize: 16 }}>{`$${totalExpensesAgn || 0}`}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', paddingLeft: 2, borderBottom: 'none', fontSize: 16 }}>{`$${totalExpensesAcc || 0}`}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', paddingLeft: 2, borderBottom: 'none', fontSize: 16 }}>{`${formatCurrency(totalProfit|| 0) }`}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', paddingLeft: 2, borderBottom: 'none', fontSize: 16 }}>{`${totalRoi|| 0}%`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>Date</TableCell>
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>Revenue</TableCell>
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>Spent Agn</TableCell>
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>Spent Acc</TableCell>
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>Profit</TableCell>
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>ROI</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {records.map((record, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{record.date}</TableCell>
                  <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{`${record.income}`}</TableCell>
                  <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{`$${record.expensesAgn}`}</TableCell>
                  <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{`$${record.expensesAcc}`}</TableCell>
                  <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{`${record.profit}`}</TableCell>
                  <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{`${record.Roi}%`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};




export default BuyerDashboard;