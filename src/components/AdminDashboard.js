import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, CircularProgress, Skeleton } from '@mui/material';
import BuyerDetailsModal from './BuyerDetailsModal';
import dayjs from 'dayjs';
import { IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeSelector from './DateRangeSelector';

const AdminDashboard = ({ dateRange, onDateRangeChange }) => {
  const [buyers, setBuyers] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [dateRangee, setSelectedData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { startDate, endDate } = dateRange || {};
  const [isDateRangeSelectorOpen, setDateRangeSelectorOpen] = useState(false);
  const [loading, setLoading] = useState(true);



  const handleDateRangeSelected = (range) => {
    onDateRangeChange(range); // Передаем диапазон дат в родительский компонент
    setDateRangeSelectorOpen(false); // Закрываем модальное окно
  };

  useEffect(() => {
    const fetchBuyers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/admin/buyers',
          {
            params: {
              startDate: dayjs(startDate).format('YYYY-MM-DD'),
              endDate: dayjs(endDate).format('YYYY-MM-DD')
            }
          }
        );


        setTimeout(() => {
          setBuyers(response.data);
          setLoading(false);
        }, 900);
      } catch (err) {
        console.error(err);
        setLoading(false); // Отключаем загрузку после завершения запроса
      }
    };

    if (startDate && endDate) {
      fetchBuyers();
    }
  }, [startDate, endDate])


  const handleRowClick = async (buyer) => {
    try {
      const response = await axios.get(`/api/buyer/${buyer.nameBuyer}/records`,
        {
          params: {
            startDate: dayjs(startDate).format('YYYY-MM-DD'),
            endDate: dayjs(endDate).format('YYYY-MM-DD')
          }
        });



      const buyerDetails = {
        nameBuyer: buyer.nameBuyer,
        records: response.data,
      };
      const dateRangeBuyer = {
        startDate: dayjs(startDate).format('YYYY-MM-DD'),
        endDate: dayjs(endDate).format('YYYY-MM-DD')
      }
      console.log(buyerDetails)

      setSelectedData(dateRangeBuyer)
      setSelectedBuyer(buyerDetails);
      setModalOpen(true);
    } catch (error) {
      console.error('Ошибка получения данных по байеру:', error);
    }
  };


  const savedReject = async (event, buyerId) => {
    try {
      const newValue = event.target.value;
      console.log(newValue, buyerId)
      const response = await axios.put(`/api/buyers/${buyerId}`, {
        reject: newValue,
      });

      //   const updatedBuyerResponse = await axios.get(`http://localhost:3100/api/admin/buyers`,
      //   { params: { 
      //     startDate: dayjs(startDate).format('YYYY-MM-DD'),
      //     endDate: dayjs(endDate).format('YYYY-MM-DD')
      //   }});


      // setBuyers((prevBuyers) =>
      //   prevBuyers.map((buyer) =>
      //     buyer.id === buyerId ? { ...buyer, ...updatedBuyerResponse.data } : buyer
      //   )
      // );
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };



  return (
    <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', width: '80%', justifyContent: 'center' }}>
        {loading ? (
          // Отображаем Skeleton и CircularProgress, пока данные загружаются
          <>
            {/* <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress />
            </Box> */}
             <Box sx={{ marginTop: 16, padding: 3, borderRadius: 3, boxShadow: 5 }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: -1.5 }}>
            <Skeleton variant="rectangular" width="40%" animation="wave"  height={30} sx={{ marginBottom: 1, borderRadius:2 }}></Skeleton> 
            <Skeleton variant="circular" width="40px" animation="wave"  height={"40px"} sx={{ marginBottom: 1,marginLeft:1,  }}/>   
        </Box>
        <Skeleton variant="rectangular" width="20%" animation="wave"  height={15} sx={{ marginTop: 2,marginBottom: 2, borderRadius:1 }}></Skeleton> 

        <DateRangeSelector
          open={isDateRangeSelectorOpen}
          onClose={() => setDateRangeSelectorOpen(false)}
          onRangeSelected={handleDateRangeSelected}
        />
            <Box sx={{ minWidth: 650, mt:1}} aria-label="buyers table">
              <Skeleton variant="rectangular" width="100%" animation="wave"  height={30} sx={{ marginBottom: 1, borderRadius:2 }} />
              <Skeleton variant="rectangular" width="80%" animation="wave" height={30} sx={{ marginBottom: 1, borderRadius:2}} />
              <Skeleton variant="rectangular" width="60%" animation="wave" height={30} sx={{ marginBottom: 1, borderRadius:2}} />
              <Skeleton variant="rectangular" width="100%" animation="wave" height={30} sx={{ marginBottom: 1, borderRadius:2 }} />
              <Skeleton variant="rectangular" width="80%" animation="wave" height={30} sx={{ marginBottom: 1, borderRadius:2}} />
              <Skeleton variant="rectangular" width="90%" animation="wave" height={30} sx={{ marginBottom: 1, borderRadius:2}} />
            </Box>
            </Box>
          </>
        ) : (
      <Box sx={{ marginTop: 16, padding: 3, borderRadius: 3, boxShadow: 5 }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: -1.5 }}>
          
          <Typography variant="h5" gutterBottom >
            Панель администратора
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
        <DateRangeSelector
          open={isDateRangeSelectorOpen}
          onClose={() => setDateRangeSelectorOpen(false)}
          onRangeSelected={handleDateRangeSelected}
        />
      
          <TableContainer component={Paper} sx={{ boxShadow: 0, borderRadius: 0 }}  >
            <Typography align="left" sx={{ padding: 1, fontSize: 15, borderBottom: 'none', verticalAlign: 'sub', width: '40%' }}>{dayjs(startDate).format('YYYY.MM.DD')} — {dayjs(endDate).format('YYYY.MM.DD')}</Typography>

            <Table sx={{ minWidth: 650 }} aria-label="buyers table">
              <TableHead >
                <TableRow  >
                  {/* <TableCell align="left" sx={{border:'1px solid rgba(224, 224, 224, 1)'}} >ID</TableCell> */}
                  <TableCell align="left" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>Name</TableCell>
                  <TableCell align="left" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>Revenue</TableCell>
                  <TableCell align="left" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>Spent Agn</TableCell>
                  <TableCell align="left" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>Spent Acc</TableCell>
                  <TableCell align="left" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>Profit</TableCell>
                  <TableCell align="left" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>ROI</TableCell>
                  <TableCell align="left" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>FD</TableCell>
                  <TableCell align="left" sx={{ border: '1px solid rgba(224, 224, 224, 1)', width: '15%' }}>Reject</TableCell>

                </TableRow>
              </TableHead>
              <TableBody >
                {buyers.map((buyer) => (
                  <TableRow key={buyer.id}
                    onClick={(event) => {
                      event.currentTarget.blur(); // Убираем фокус с текущей строки
                      handleRowClick(buyer);
                    }}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#f5f5f5', // Цвет фона при наведении
                        transition: 'background-color 0.3s ease',
                      },
                      '&:focus': {
                        outline: 'none', // Убираем обводку при фокусе
                      },
                    }}
                  >
                    {/* <TableCell align="left" sx={{border:'1px solid rgba(224, 224, 224, 1)'}}>{buyer.id}</TableCell> */}
                    <TableCell align="left" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{buyer.nameBuyer}</TableCell>
                    <TableCell align="left" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{buyer.totalIncome}</TableCell>
                    <TableCell align="left" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{'$' + buyer.expensesAgn}</TableCell>
                    <TableCell align="left" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{'$' + buyer.expensesAcc}</TableCell>
                    <TableCell align="left" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{buyer.profit}</TableCell>
                    <TableCell align="left" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{buyer.Roi + '%'}</TableCell>
                    <TableCell align="left" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{buyer.totalFirstdeps}</TableCell>
                    <TableCell align="center" sx={{ border: '1px solid rgba(224, 224, 224, 1)', padding: '0px' }}>
                      <TextField size='small' defaultValue={buyer.reject} onClick={(event) => event.stopPropagation()} sx={{ width: '80%', margin: '-10px', padding: '1px' }}
                        onChange={(event) => savedReject(event, buyer.id)}></TextField>
                    </TableCell>



                  </TableRow>

                ))}
              </TableBody>
            </Table>
          </TableContainer>
       
      </Box> 
      )}
      {selectedBuyer && dateRangee && (
        <BuyerDetailsModal open={modalOpen} handleClose={handleCloseModal} buyerDetails={selectedBuyer} dateRangeBuyer={dateRangee} />
      )}
    </Container>
  );
};


export default AdminDashboard;