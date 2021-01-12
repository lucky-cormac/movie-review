import moment from 'moment';

export const formatTime = (dateStr) => {
  const momentObj = dateStr ? moment(dateStr) : moment();
  return momentObj.format('hh:mm A');
};
