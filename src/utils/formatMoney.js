const formatter = Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
});

const formatMoney = (cents) => formatter.format(cents / 100);

export default formatMoney;
