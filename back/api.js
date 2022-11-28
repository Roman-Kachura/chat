const mysql = require("mysql");
const aWss = require("./index");
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

class Api {
    addUser(req, res) {
        const query = `insert into users(name) values ('${req.body.name}');`;
        conn.query(query, (e, r) =>
            e ? res.status(501).json(e) : res.json({id: r.insertId, name: req.body.name}));
    }

    deleteUser(req, res) {
        let id = req.params.id;
        const query = `delete from users where id = ${id}`;
        conn.query(query, (e, r) =>
            e ? res.status(501).json(e) : res.json({}));
    }

    sendError(status, message, ws) {
        ws.send(JSON.stringify({status, message}));
    }

    getMessages(id, ws) {
        const query = `select * from messages where recipient=${id};`;
        conn.query(query, (e, r) => {
            if (e) return this.sendError(501, e, ws);
            ws.send(JSON.stringify({messages: r}));
        })
    }

    connect(msg, ws, aWss) {
        ws.id = JSON.parse(msg).id;
        const query = `select * from users`;
        conn.query(query, (e, r) => {
            if (e) return this.sendError(501, e, ws);
            if (!r.length) return this.sendError(401, 'User not found', ws);
            aWss.clients.forEach(c => {
                c.send(JSON.stringify({users: r}));
            })
        });
    }

    sendMessage(msg, ws, aWss) {
        msg = JSON.parse(msg);
        const {recipient, sender, message, theme, name} = msg;
        const query = `select * from users where id = '${recipient}';`;
        conn.query(query, (e, r) => {
            if (e) return this.sendError(501, e, ws);
            if (!r.length) return this.sendError(401, 'User not found', ws);
            const query = `insert into messages(recipient,sender,message,theme,name)
                values ('${recipient}','${sender}','${message}','${theme}','${name}')`;
            conn.query(query, (e, r) => {
                if (e) return this.sendError(501, e, ws);
                aWss.clients.forEach(c => {
                    if (c.id === recipient) {
                        this.getMessages(c.id, c);
                        c.send(JSON.stringify({alert: msg}));
                    }
                });
            })
        });
    }
}

module.exports = new Api();