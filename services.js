function makeRequest(method, url, data) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(data);
    });
}
let interval;

function createRefreshTimer(duration) {
    if (interval) {
        clearInterval(interval);
    }
    let timer = duration;
    let minutes;
    let seconds;
    interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById("refresh_time").textContent = minutes + "m" + seconds + "s";

        if (--timer < 0) {
            refreshData();
        }
    }, 1000);
}

let buildFrontendMonitorTable = () => {
    makeRequest('GET', 'http://localhost:3000/payfront').then((response) => {
        response = JSON.parse(response);
        let monitor_table = document.getElementById("pay_frontend_monitor_table");
        let currentRows = document.querySelectorAll('#pay_frontend_monitor_table tr');
        let monitor_table_tbody = document.querySelector('#pay_frontend_monitor_table tbody');
        if (currentRows.length > 2) {
            monitor_table_tbody.removeChild(monitor_table_tbody.lastChild);
        }
        let row = document.createElement("tr");
        let statusCol = document.createElement("td");
        let grid = document.getElementById("frontend_grid");
        if (response.statusCode == 200) {
            let grid = document.getElementById("frontend_grid");
            grid.classList.remove('red_background');
            grid.classList.add('green_background');
            statusCol.innerHTML = "<i class='fa fa-smile-o fa-2x' aria-hidden='true'></i>";
        } else {
            grid.classList.remove('green_background');
            grid.classList.add('red_background');
            statusCol.innerHTML = "<i class='fa fa-frown-o fa-2x' aria-hidden='true'></i>";
        }
        let statusCodeCol = document.createElement("td");
        statusCodeCol.innerText = response.statusCode;
        let timeCol = document.createElement("td");
        timeCol.innerText = new Date();
        row.appendChild(statusCol);
        row.appendChild(statusCodeCol);
        row.appendChild(timeCol);
        monitor_table_tbody.insertBefore(row, monitor_table_tbody.firstChild)
    });

};
let buildBackendMonitorTable = () => {
    makeRequest('GET', 'http://localhost:3000/payback').then((response) => {
        let monitor_table = document.getElementById("pay_backend_monitor_table");
        let currentRows = document.querySelectorAll('#pay_backend_monitor_table tr');
        let monitor_table_tbody = document.querySelector('#pay_backend_monitor_table tbody');
        if (currentRows.length > 2) {
            monitor_table_tbody.removeChild(monitor_table_tbody.lastChild);
        }

        response = JSON.parse(response);
        let row = document.createElement("tr");
        let statusCol = document.createElement("td");
        let grid = document.getElementById("backend_grid");
        if (response.statusCode == 401) {
            grid.classList.remove('red_background');
            grid.classList.add('green_background');
            statusCol.innerHTML = "<i class='fa fa-smile-o fa-2x' aria-hidden='true'></i>";
        } else {
            grid.classList.remove('green_background');
            grid.classList.add('red_background');
            statusCol.innerHTML = "<i class='fa fa-frown-o fa-2x' aria-hidden='true'></i>";
        }
        let statusCodeCol = document.createElement("td");
        statusCodeCol.innerText = response.statusCode;
        let timeCol = document.createElement("td");
        timeCol.innerText = new Date();
        row.appendChild(statusCol);
        row.appendChild(statusCodeCol);
        row.appendChild(timeCol);
        monitor_table_tbody.insertBefore(row, monitor_table_tbody.firstChild)
    });

};

let refreshData = () => {
    createRefreshTimer(2);
    buildFrontendMonitorTable();
    buildBackendMonitorTable();
}


let initializePage = () => {
    createRefreshTimer(2);
    buildFrontendMonitorTable();
    buildBackendMonitorTable();
}

function removeChildNodes(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

initializePage();