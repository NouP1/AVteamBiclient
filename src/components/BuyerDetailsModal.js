import React from 'react';
import { Button,Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

const BuyerDetailsModal = ({ open, handleClose, buyerDetails, dateRangeBuyer}) => {
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          width: '70%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          border: '0',
         //borderColor: 'divider',
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          overflow: 'auto',
          outline: 'none',
          overflowX: 'hidden'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'baseline', paddingLeft:0.5, flexWrap:'wrap', flexDirection:'column',  marginBottom: 0 }}>
        <Typography variant="h6" component="h2" id="modal-title">
          Данные байера: {buyerDetails.nameBuyer}
        </Typography>
        <Typography variant="h6" component="h3" id="modal-title" sx={{fontSize:15,verticalAlign:'sub'}}>
          {dateRangeBuyer.startDate} — {dateRangeBuyer.endDate}
        </Typography>


        </Box>
        <TableContainer component={Paper} sx={{ maxHeight: 400, borderRadius:2, boxShadow:2, border:'1px solid rgba(224, 224, 224, 1)',}}>
        <Table  >
        <TableHead>
              <TableRow>
                <TableCell sx={{borderRight:'1px solid rgba(224, 224, 224, 1)', textAlign: 'center'}}>Date</TableCell>
                <TableCell sx={{borderRight:'1px solid rgba(224, 224, 224, 1)', textAlign: 'center'}}>Revenue</TableCell>
                <TableCell sx={{borderRight:'1px solid rgba(224, 224, 224, 1)', textAlign: 'center'}}>Spent Agn</TableCell>
                <TableCell sx={{borderRight:'1px solid rgba(224, 224, 224, 1)', textAlign: 'center'}}>Spent Acc </TableCell>
                <TableCell sx={{borderRight:'1px solid rgba(224, 224, 224, 1)', textAlign: 'center'}}>Profit</TableCell>
                <TableCell sx={{borderRight:'1px solid rgba(224, 224, 224, 1)', textAlign: 'center'}}>ROI</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buyerDetails.records.records.map((record, index) => (
                <TableRow key={index}>
                  <TableCell sx={{textAlign: 'center'}}>{record.date}</TableCell>
                  <TableCell sx={{border:'1px solid rgba(224, 224, 224, 1)', textAlign: 'center'}}>{'$' + record.income}</TableCell>
                  <TableCell sx={{border:'1px solid rgba(224, 224, 224, 1)', textAlign: 'center'}}>{'$' + record.expensesAgn}</TableCell>
                  <TableCell sx={{border:'1px solid rgba(224, 224, 224, 1)', textAlign: 'center'}}>{'$' + record.expensesAcc}</TableCell>
                  <TableCell sx={{border:'1px solid rgba(224, 224, 224, 1)', textAlign: 'center'}}>{record.profit}</TableCell>
                  <TableCell sx={{border:'1px solid rgba(224, 224, 224, 1)', textAlign: 'center'}}>{record.Roi}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
       
        </Table> 
        
        </TableContainer>
        <Button onClick={handleClose} variant="contained" color="primary" sx={{ mt: 2 }}>
          Закрыть
        </Button>
      </Box>
      
    </Modal>
  );
};

export default BuyerDetailsModal;