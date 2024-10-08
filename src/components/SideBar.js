import React, { useEffect, useRef, useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import dayjs from 'dayjs';



const DrawerStyled = styled(Drawer)({
  width: 250,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 250,
    boxSizing: 'border-box',
    marginTop: 56,
  },
});

const Sidebar = ({ open, onClose, menuItems}) => {
  const drawerRef = useRef(null);
  // const [dateRange, setDateRange] = useState({ startDate: dayjs(), endDate: dayjs() });
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  

  return (
    <>
      <DrawerStyled anchor="left" open={open} onClose={onClose} ref={drawerRef}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={item.onClick}>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          <Box sx={{ padding: 2 }}>
        
          </Box>
        </List>
      </DrawerStyled>

    </>
  );
};

export default Sidebar;