import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper,Skeleton } from '@mui/material';
import dayjs from 'dayjs';
import { IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeSelector from './DateRangeSelector';


const BuyerDashboard = ({ username, dateRange, onDateRangeChange }) => {
  const [records, setRecords] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpensesAgn, setTotalExpensesAgn] = useState(0);
  const [totalExpensesAcc, setTotalExpensesAcc] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalRecordsCount, setTotalRecordsCount] = useState(0);
  const [totalRoi, setTotalRoi] = useState(0);
  const [reject, setReject] = useState(0);
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
      setLoading(true)
      try {
        console.log('Fetching records for:', { startDate, endDate });
        const response = await axios.get(`/api/buyer/${username}/records`, {
          params: {
            startDate: dayjs(startDate).format('YYYY-MM-DD'),
            endDate: dayjs(endDate).format('YYYY-MM-DD')
          }
        });
        const { records, totalIncome, totalExpensesAgn, totalExpensesAcc, totalProfit, totalRecordsCount, totalRoi, reject } = response.data || {};
setTimeout(() => {
        setRecords(records);
        setTotalIncome(totalIncome);
        setTotalExpensesAgn(totalExpensesAgn);
        setTotalExpensesAcc(totalExpensesAcc);
        setTotalProfit(totalProfit);
        setTotalRecordsCount(totalRecordsCount);
        setTotalRoi(totalRoi);
        setReject(reject)
        // setMessage(message)
        
          
          setLoading(false);
        }, 900);
      } catch (err) {
        setError('Ошибка загрузки данных');
        console.error(err);
        setLoading(false);
      }
    };

    if (startDate && endDate) {
      fetchRecords();
    }
  }, [username, startDate, endDate]);

  const formatCurrency = (value) => {
    return value < 0 ? `-$${Math.abs(value)}` : `$${value}`;
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignItems: 'flex-start' ,
  
    '@media (min-width: 850px)': {
      maxWidth: '900px',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
    },
    '@media (min-width: 100px)': {
      paddingLeft:'24px',
      paddingRight:'75px'
    },
    
    }}>
      <Box sx={{ marginTop: 16, padding: 3, borderRadius: 3, boxShadow: 5,width:"100%" }}>
        <DateRangeSelector
          open={isDateRangeSelectorOpen}
          onClose={() => setDateRangeSelectorOpen(false)}
          onRangeSelected={handleDateRangeSelected}
        />
         {loading ? (
          // Отображаем Skeleton и CircularProgress, пока данные загружаются
          <>
            {/* <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress />
            </Box> */}
            <Box sx={{ minWidth: 650, mt:1}} aria-label="buyers table">
              <Skeleton variant="rectangular" width="20%" animation="wave"  height={30} sx={{ marginBottom: 1, borderRadius:2 }}/>
              <Skeleton variant="rectangular" width="80%" animation="wave" height={30} sx={{ marginBottom: 1, borderRadius:2}} />
              <Skeleton variant="rectangular" width="60%" animation="wave" height={30} sx={{ marginBottom: 1, borderRadius:2}} />
              <Skeleton variant="rectangular" width="100%" animation="wave" height={30} sx={{ marginBottom: 1, borderRadius:2 }} />
              <Skeleton variant="rectangular" width="80%" animation="wave" height={30} sx={{ marginBottom: 1, borderRadius:2}} />
              <Skeleton variant="rectangular" width="90%" animation="wave" height={30} sx={{ marginBottom: 1, borderRadius:2}} />
            </Box>
          </>
        ) : (
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
                  
                  <Typography variant="h7" gutterBottom sx={{ fontSize: 15 }}>
                    {dayjs(startDate).format('YYYY.MM.DD')} — {dayjs(endDate).format('YYYY.MM.DD')}
                  </Typography>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', paddingLeft: 2, borderBottom: 'none', fontSize: 16, padding: '9px', verticalAlign: 'bottom' }}>{` ${formatCurrency(totalIncome || 0)}`}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', paddingLeft: 2, borderBottom: 'none', fontSize: 16, padding: '9px', verticalAlign: 'bottom' }}>{`$${totalExpensesAgn || 0}`}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', paddingLeft: 2, borderBottom: 'none', fontSize: 16, padding: '9px', verticalAlign: 'bottom' }}>{`$${totalExpensesAcc || 0}`}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', paddingLeft: 2, borderBottom: 'none', fontSize: 16, padding: '9px', verticalAlign: 'bottom' }}>{`${formatCurrency(totalProfit || 0)}`}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', paddingLeft: 2, borderBottom: 'none', fontSize: 16, padding: '9px', verticalAlign: 'bottom' }}>{`${totalRoi || 0}%`}</TableCell>
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
        )}
      </Box>
      {loading ? ( <>
        <Container sx={{ position: 'sticky', top: '80px', mt: '130px',width:"100%" }}>
            <Box sx={{width:"100%",paddingRight:10, mt:1}} aria-label="buyers table">
              <Skeleton variant="rectangular" width="100%" animation="wave" height={115} sx={{ position:"relative", top: -8,ml:1,borderRadius:4}} /> 
            </Box>
            </Container>
          </>
          ):(
      <Container sx={{ position: 'sticky', top: '80px', mt: '130px' }}>
    
      <Box sx={{ width: '100%', height: '10%', position: 'relative', right: 10 }}>   
     
          <TableContainer component={Paper} sx={{
            borderRadius: 4, alignItems: 'flex-start', boxShadow: 3, border: 'none', overflowX: 'hidden', width: '100%', height: '108px', marginLeft: '20px', display: 'flex',
            alignItems: 'flex-start', justifyContent: 'space-around'
          }}>
            <Table sx={{ borderRadius: 10, width: '40%', textAlign: 'center' }}>
              <TableHead sx={{ textAlign: 'center' }}>
                <TableRow >
                  <TableCell sx={{ fontSize: 15, fontWeight: '700', textAlign: 'center', borderBottom: 'none', verticalAlign: 'sub', width: '1%' }}>Reject</TableCell>
                </TableRow>

                <TableRow >
                  <TableCell sx={{ textAlign: 'center', padding: 0 }}>{`$${reject}`}</TableCell>
                </TableRow>

              </TableHead>
            </Table>
          </TableContainer>
      
        </Box>
        
      </Container>
          )}
      
    </Container>
      

  );
};




export default BuyerDashboard;