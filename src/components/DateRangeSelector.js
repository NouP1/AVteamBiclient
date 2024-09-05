import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Включение стилей
import 'react-date-range/dist/theme/default.css'; // Включение темы
import { addDays } from 'date-fns';

// Пользовательский CSS для стилизации
import './DateRangeSelector.css'; // Подключение файла с пользовательскими стилями

const DateRangeSelector = ({ open, onClose, onRangeSelected }) => {
  const [state, setState] = useState({
    selection: {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  });

  const handleSelect = (ranges) => {
    setState({ selection: ranges.selection });
  };

  const handleSubmit = () => {
    const { startDate, endDate } = state.selection;

    // Форматируем дату в виде строки формата YYYY-MM-DD
    const formattedStartDate = startDate.toLocaleDateString('en-CA'); // Форматирует как YYYY-MM-DD
    const formattedEndDate = endDate.toLocaleDateString('en-CA'); // Форматирует как YYYY-MM-DD

    onRangeSelected({ startDate: formattedStartDate, endDate: formattedEndDate });

    onClose(); // Закрытие модального окна после выбора
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Выберите диапазон дат</DialogTitle>
      <DialogContent>
        <div className="date-range-picker-container">
          <DateRangePicker
            ranges={[state.selection]}
            onChange={handleSelect}
            showSelectionPreview={true}
            months={2} // Показываем два месяца
            direction="horizontal"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Готово
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DateRangeSelector;