const fs = require('fs');

const escapeCsvValue = value => {
  if (value === true) {
    value = '1';
  } else if (value === 0 || value === false) {
    value = '0';
  } else {
    value = `${value || ''}`;
  }

  let newValue = '"';
  for (let idx = 0; idx < value.length; idx++) {
    if (value[idx] === '"') {
      newValue += '"';
    }
    newValue += value[idx];
  }
  newValue += '"';

  return newValue;
};

const toCsv = (filepath, rows, specs) => {
  let csv = Object.keys(specs)
    .map(name => escapeCsvValue(name))
    .join(',');
  csv += '\r\n';

  for (const row of rows) {
    const values = [];
    Object.entries(specs).forEach(([name, accessor]) => {
      values.push(row[name]);
    });
    csv += values.join(',');
    csv += '\r\n';
  }

  fs.writeFileSync(filepath, csv);
};

module.exports = toCsv;
