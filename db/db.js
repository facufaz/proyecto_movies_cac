const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'codo'
});

connection.connect((err) => {
    if (err) {
        console.log('ERROR CONECTANDO CON LA DATABASE:', err);
      return
    } 
        console.log('CONECTADO CON LA DATABASE');
    
        
        connection.query('CREATE DATABASE IF NOT EXISTS codo', (err, results) => {
            if(err) console.log('ERROR CREATING DATABASE:', err)
                console.log("DATABASE ENSURED")
            connection.changeUser({database: "codo"}, (err, results) => {
                if (err) console.log("ERROR SWITCHING TO codo:", err)
                    
                    const createTableQuery = `
                    CREATE TABLE IF NOT EXISTS movies (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        title VARCHAR(255) NOT NULL,
                        director VARCHAR(255) NOT NULL,
                        year INT NOT NULL
                    );`;
                    
                    const createSecondTableQuery = `
                    CREATE TABLE IF NOT EXISTS data(
                        movie_id INT,
                        title VARCHAR(255) NOT NULL,
                        views INT NOT NULL,
                        description VARCHAR(255) NOT NULL,
                        PRIMARY KEY (movie_id),
                        FOREIGN KEY (movie_id) REFERENCES movies(id)
                    );`
                    
                        connection.query(createTableQuery, (err,results) => {
                            if(err) console.log('ERROR CREATING TABLE:', err)
                                console.log("TABLE ENSURED.")
                        })
                        connection.query(createSecondTableQuery, (err,results) => {
                            if(err) console.log('ERROR CREATING SECOND TABLE:', err)
                                console.log("SECOND TABLE ENSURED.")
                        })
                    })
                })
                
            });
                module.exports = connection;