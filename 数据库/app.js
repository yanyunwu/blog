const mysql = require('mysql');

const pool = mysql.createPool({
    host: '120.79.79.43',
    port: 3306,
    database: 'vaccine',
    user: 'root',
    password: 'wjy12345678',
    connectionLimit: 50
});

function query(sql, data = []) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) {
                reject(err);
                return;
            }
            con.query(sql, data, (err, value) => {
                if (err) {
                    con.release();
                    reject(err);
                    return;
                }
                con.release();
                resolve(value);
            });
        });
    });
}

let sql = `SELECT * FROM (SELECT com.community_id,com.community_name, tempgrid.xy
    FROM area_community AS com
    LEFT JOIN 
    (SELECT grid.grid_id,grid.grid_name,grid.community_id,
        CONCAT('[',
        GROUP_CONCAT(JSON_OBJECT('id', coo.id,'axis',coo.axis,'ordi',coo.ordi)),
        ']') AS xy
        FROM area_grid AS grid
        LEFT JOIN coordinate AS coo ON grid.grid_id=coo.grid
        WHERE id IS NOT NULL
        GROUP BY grid_id)
     AS tempgrid ON com.community_id=tempgrid.community_id
    WHERE tempgrid.xy IS NOT NULL
    GROUP BY community_id) AS temp
    `

let sql2 = `SELECT * FROM (SELECT grid.grid_id,grid.grid_name,
    CONCAT('[',
    GROUP_CONCAT(JSON_OBJECT('id', coo.id,'axis',coo.axis,'ordi',coo.ordi)),
    ']') AS xy
    FROM area_grid AS grid
    LEFT JOIN coordinate AS coo ON grid.grid_id=coo.grid
    WHERE id IS NOT NULL
    GROUP BY grid_id) AS temp
    `

query(sql).then(value=>{
   /*  value.forEach(item => {
        // console.log(eval(item.gridList.replaceAll('\\','')));
        // let a = item.gridList.replaceAll('\\','').replaceAll('"[','[').replaceAll(']"',']')
        console.log(a);
        item.gridList = JSON.parse(a)
    }); */
    
    console.log(value);
}).catch(err=>{
    console.log(err);
})