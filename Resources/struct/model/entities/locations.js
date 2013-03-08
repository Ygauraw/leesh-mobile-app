var locations = new joli.model({
  table:    'locations',
  columns:  {
    id:                 'PRIMARY KEY AUTOINCREMENT',
    lattitude:          'TEXT',
    longitude:          'TEXT',
    cardinalDirection:  'TEXT',
    address:            'TEXT',
    description:        'TEXT'
  }
});