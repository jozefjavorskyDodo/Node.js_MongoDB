
"use strict";

try {
    require("http").createServer((req, res) => {

        let req_body = [];

        req.on("data", (req_body_subpart) => req_body.push(req_body_subpart)).on("end", () => {

            req_body = require("querystring").parse(Buffer.concat(req_body).toString());

            if (req_body["generate"] === "true") {

                let y0 = [];

                while (y0.length < 6) {
                    let pseudo_random_int = Math.floor(Math.random() * 6) + 1;
                    if (y0.includes(pseudo_random_int) === Boolean(false)) {
                        y0.push(pseudo_random_int);
                    } else {
                        continue;
                    };
                };

                let x0 = [];

                while (x0.length < 1) {
                    let pseudo_random_int = Math.floor(Math.random() * 6) + 1;
                    if (
                        (y0[0] === pseudo_random_int) ||
                        (y0[1] === pseudo_random_int) ||
                        (y0[2] === pseudo_random_int)
                    ) {
                        continue;
                    } else {
                        x0.push(pseudo_random_int);
                    };
                };

                while (x0.length < 5) {
                    let pseudo_random_int = Math.floor(Math.random() * 6) + 1;
                    if (
                        (y0[0] === pseudo_random_int) ||
                        (x0[1] === pseudo_random_int) ||
                        (x0.includes(pseudo_random_int) === Boolean(true))
                    ) {
                        continue;
                    } else {
                        x0.push(pseudo_random_int);
                    };
                };

                let c0 = [y0[0], y0[1], y0[2], x0[0]];

                while (c0.length < 6) {
                    let pseudo_random_int = Math.floor(Math.random() * 6) + 1;
                    if (c0.includes(pseudo_random_int) === Boolean(true)) {
                        continue;
                    } else {
                        c0.push(pseudo_random_int);
                    };
                };

                try {
                    require("mongodb").MongoClient.connect("mongodb://localhost:27017", (err, db) => {
                        db.db("tryout_db").dropCollection("sudoku6x6", (err, rslt) => db.close());
                    });
                } catch (_err_) {
                    if (_err_) { };
                };

                require("mongodb").MongoClient.connect("mongodb://localhost:27017", (err, db) => {
                    if (err) throw err;
                    db.db("tryout_db").createCollection("sudoku6x6", (err, rslt) => {
                        if (err) throw err;
                        db.db("tryout_db").collection("sudoku6x6").insertOne(
                            {
                                line_1st: String([y0[0], y0[1], y0[2], y0[3], y0[4], y0[5]]),
                                line_2nd: String([x0[0], c0[4], c0[5], 0, 0, 0]),
                                line_3rd: String([x0[1], 0, 0, 0, 0, 0]),
                                line_4th: String([x0[2], 0, 0, 0, 0, 0]),
                                line_5th: String([x0[3], 0, 0, 0, 0, 0]),
                                line_6th: String([x0[4], 0, 0, 0, 0, 0])
                            },
                            (err, rslt) => {
                                if (err) throw err;
                                db.db("tryout_db").collection("sudoku6x6").findOne({}, (err, rslt) => {
                                    if (err) throw err;
                                    var row1 = [...rslt.line_1st.split(',')];
                                    var row2 = [...rslt.line_2nd.split(',')];
                                    var row3 = [...rslt.line_3rd.split(',')];
                                    var row4 = [...rslt.line_4th.split(',')];
                                    var row5 = [...rslt.line_5th.split(',')];
                                    var row6 = [...rslt.line_6th.split(',')];
                                    res.writeHead(200, { "Content-type": "text/html" });
                                    res.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>((Node.ts)&&(MongoDB))</title>
</head>
<body style="background-color: rgb(90, 90, 90);">
    <p>
        <b>X &nbsp; X &nbsp; X &nbsp; Y &nbsp; Y &nbsp; Y</b>
    </p>
    <p>
        <b>X &nbsp; X &nbsp; X &nbsp; Y &nbsp; Y &nbsp; Y</b>
    </p>
    <p>
        <b>Z &nbsp; Z &nbsp; Z &nbsp; X &nbsp; X &nbsp; X</b>
    </p>
    <p>
        <b>Z &nbsp; Z &nbsp; Z &nbsp; X &nbsp; X &nbsp; X</b>
    </p>
    <p>
        <b>Y &nbsp; Y &nbsp; Y &nbsp; Z &nbsp; Z &nbsp; Z</b>
    </p>
    <p>
        <b>Y &nbsp; Y &nbsp; Y &nbsp; Z &nbsp; Z &nbsp; Z</b>
    </p>
    <hr>
    <table style="background-color: rgb(128, 128, 128);
                  border: 1mm solid rgba(128, 244, 128, 1);
                  border-radius: 2mm;
                  font-family: cursive;
                  font-weight: 900;">
        <tr>
            <td class="y0 x0 c00">${row1[0]}</td><td class="y0 x1 c00">${row1[1]}</td>
            <td class="y0 x2 c00">${row1[2]}</td><td class="y0 x3 c01">${row1[3]}</td>
            <td class="y0 x4 c01">${row1[4]}</td><td class="y0 x5 c01">${row1[5]}</td>
        </tr>
        <tr>
            <td class="y1 x0 c00">${row2[0]}</td><td class="y1 x1 c00">${row2[1]}</td>
            <td class="y1 x2 c00">${row2[2]}</td><td class="y1 x3 c01">${row2[3]}</td>
            <td class="y1 x4 c01">${row2[4]}</td><td class="y1 x5 c01">${row2[5]}</td>
        </tr>
        <tr>
            <td class="y2 x0 c10">${row3[0]}</td><td class="y2 x1 c10">${row3[1]}</td>
            <td class="y2 x2 c10">${row3[2]}</td><td class="y2 x3 c11">${row3[3]}</td>
            <td class="y2 x4 c11">${row3[4]}</td><td class="y2 x5 c11">${row3[5]}</td>
        </tr>
        <tr>
            <td class="y3 x0 c10">${row4[0]}</td><td class="y3 x1 c10">${row4[1]}</td>
            <td class="y3 x2 c10">${row4[2]}</td><td class="y3 x3 c11">${row4[3]}</td>
            <td class="y3 x4 c11">${row4[4]}</td><td class="y3 x5 c11">${row4[5]}</td>
        </tr>
        <tr>
            <td class="y4 x0 c20">${row5[0]}</td><td class="y4 x1 c20">${row5[1]}</td>
            <td class="y4 x2 c20">${row5[2]}</td><td class="y4 x3 c21">${row5[3]}</td>
            <td class="y4 x4 c21">${row5[4]}</td><td class="y4 x5 c21">${row5[5]}</td>
        </tr>
        <tr>
            <td class="y5 x0 c20">${row6[0]}</td><td class="y5 x1 c20">${row6[1]}</td>
            <td class="y5 x2 c20">${row6[2]}</td><td class="y5 x3 c21">${row6[3]}</td>
            <td class="y5 x4 c21">${row6[4]}</td><td class="y5 x5 c21">${row6[5]}</td>
        </tr>
    </table>
    <hr>
    <button onclick="javascript:
        document.querySelectorAll('td').forEach(y => y.style.color='rgba(0, 0, 0, 1)');
        document.querySelectorAll('.y0').forEach(y => y.style.color='rgba(244, 0, 0, 1)');
        document.querySelectorAll('.y1').forEach(y => y.style.color='rgba(122, 244, 122, 1)');
        document.querySelectorAll('.y2').forEach(y => y.style.color='rgba(0, 0, 244, 1)');
        document.querySelectorAll('.y3').forEach(y => y.style.color='rgba(244, 0, 0, 1)');
        document.querySelectorAll('.y4').forEach(y => y.style.color='rgba(122, 244, 122, 1)');
        document.querySelectorAll('.y5').forEach(y => y.style.color='rgba(0, 0, 244, 1)');">
        <b>ROWS</b>
    </button>
    <button onclick="javascript:
        document.querySelectorAll('td').forEach(y => y.style.color='rgba(0, 0, 0, 1)');
        document.querySelectorAll('.x0').forEach(x => x.style.color='rgba(244, 0, 0, 1)');
        document.querySelectorAll('.x1').forEach(x => x.style.color='rgba(122, 244, 122, 1)');
        document.querySelectorAll('.x2').forEach(x => x.style.color='rgba(0, 0, 244, 1)');
        document.querySelectorAll('.x3').forEach(x => x.style.color='rgba(244, 0, 0, 1)');
        document.querySelectorAll('.x4').forEach(x => x.style.color='rgba(122, 244, 122, 1)');
        document.querySelectorAll('.x5').forEach(x => x.style.color='rgba(0, 0, 244, 1)');">
        <b>COLUMNS</b>
    </button>
    <button onclick="javascript:
        document.querySelectorAll('td').forEach(c => c.style.color='rgba(0, 0, 0, 1)');
        document.querySelectorAll('.c00').forEach(c => c.style.color='rgba(244, 0, 0, 1)');
        document.querySelectorAll('.c01').forEach(c => c.style.color='rgba(122, 244, 122, 1)');
        document.querySelectorAll('.c10').forEach(c => c.style.color='rgba(0, 0, 244, 1)');
        document.querySelectorAll('.c11').forEach(c => c.style.color='rgba(244, 0, 0, 1)');
        document.querySelectorAll('.c20').forEach(c => c.style.color='rgba(122, 244, 122, 1)');
        document.querySelectorAll('.c21').forEach(c => c.style.color='rgba(0, 0, 244, 1)');">
        <b>SUB_CUBOIDS</b>
    </button>
    <hr>
    <script>
        'use strict';
        var node_of_cells = document.querySelectorAll('td');
        let _id_ = 'not-bool-flag-';
        let counter = Number(0);
        node_of_cells.forEach(cell => {
            if (cell.innerHTML !== '0') cell.setAttribute('id', _id_ + String(counter));
            counter++;
        });
    </script>
</body>
</html>`);
                                    res.end();
                                    db.close();
                                });
                            });
                    });
                });
            } else {
                res.writeHead(200, { "Content-type": "text/html" });
                res.write("<!DOCTYPE html>\
<html lang='en'>\
<head>\
    <meta charset='UTF-8'>\
    <title>((Node.ts)&&(MongoDB))</title>\
</head>\
<body style='background-color: rgb(90, 90, 90);'>\
    <form enctype='application/x-www-form-urlencoded' method='post' action='/'>\
        <input type='text' name='generate' value='true' hidden>\
        <input type='Submit' value='generate pseudo random unsolved 6x6 sudoku grid'>\
    </form>\
</body>\
</html>");
                res.end();
            };
        });
    }).listen(5500);
} catch (error) {
    if (error) console.log(error);
} finally { };