// Node.js + Express server backend
// use SQLite (https://www.sqlite.org/index.html) as a database
//

// run this once to create the initial database file
//   node create_database.js

// to clear the database, simply delete the database file:

const sqlite3 = require('sqlite3');
const dbName = 'model.db';
const db = new sqlite3.Database(dbName);

// run each database statement *serially* one after another
// (if you don't do this, then all statements will run in parallel,
//  which we don't want)
db.serialize(() => {
  // create a new database tables:
  db.run("CREATE TABLE components (id INTEGER PRIMARY KEY, className TEXT, tag TEXT, properties TEXT)");
  db.run("CREATE TABLE wbsitems (id INTEGER PRIMARY KEY, className TEXT, tag TEXT, properties TEXT)");

  let valve = {
    className: "valve",
    tag: "V-100",
    props: { desc: 'Gate Valve', length: 50, weight: 100 },
  };

  let pump = {
    className: "pump",
    tag: "P-100",
    props: {desc:"Centrifugal Pump", manufacturer: "ABC"},
  };

  let tank = {
    className: "tank",
    tag: "T-100",
    props: {desc:"Horizontal Tank", manufacturer: "XYZ"},
  };

  let sql = `INSERT INTO components (className, tag, properties)  VALUES 
    ('${valve.className}', '${valve.tag}', '${JSON.stringify(valve.props)}'),
    ('${pump.className}', '${pump.tag}', '${JSON.stringify(pump.props)}'),
    ('${tank.className}', '${tank.tag}', '${JSON.stringify(tank.props)}')
  `;

  console.log (sql);
  // insert data into components table:
  db.run(sql);
         
  console.log(`successfully added components to the components table in ${dbName}`);

const u1 = { id: "1", className: "unit", tag: "U1", props: {desc: "Unit #1"} };
const u2 = { id: "2", className: "unit", tag: "U2", props: {desc: "Unit #2"} };
const s1 = { id: "3", className: "service", tag: "S1", props: {desc: "Service #1"} };
const a1 = { id: "4", className: "area", tag: "A1", props: {desc: "Area #1"} };

  // insert data into wbsitems table:
  db.run(`INSERT INTO wbsitems (className, tag, properties)  VALUES 
            ('${u1.className}', '${u1.tag}', '${JSON.stringify(u1.props)}'),
            ('${u2.className}', '${u2.tag}', '${JSON.stringify(u2.props)}'),
            ('${s1.className}', '${s1.tag}', '${JSON.stringify(s1.props)}'),
            ('${a1.className}', '${a1.tag}', '${JSON.stringify(a1.props)}')
  `);
         
  console.log(`successfully add wbsitems to the wbsitems table in ${dbName}`);



  
  // print them out to confirm their contents:
  db.each("SELECT * FROM components", (err, row) => {
    let item = {
      className: row.className,
      tag: row.tag,
      properties: row.properties ? JSON.parse(row.properties) : []
    };
      console.log(`className=${item.className}, tag=${item.tag}, 
                  properties=${JSON.stringify(item.properties)}, 
                  graphics=${JSON.stringify(item.graphics)}`);

  });

  // print them out to confirm their contents:
  db.each("SELECT * FROM wbsitems", (err, row) => {
    let item = {
      className: row.className,
      tag: row.tag,
      properties: row.properties ? JSON.parse(row.properties) : []
    };
      console.log(`className=${item.className}, tag=${item.tag}, 
                  properties=${JSON.stringify(item.properties)}, 
                  graphics=${JSON.stringify(item.graphics)}`);

  });

});

db.close();