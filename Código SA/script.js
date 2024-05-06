const tempChart = document.getElementById('tempChart');

// Substitua as informações abaixo, pelas que você salvou no bloco de notas
const token = "1131c675-fabd-4484-a17b-0a4cd5f53f10";
const deviceBucketId = "66269fddf6e9f6001091f37b";
const variableName1 = "temperature";
const variableName2 = "humidity";
// URL da API do Tago.io para acessar dados de uma variável específica
const apiUrlGetDataTemp = `https://api.tago.io/data?bucket=${deviceBucketId}&variable=${variableName1}&qty=1`;
const apiUrlGetDataUmi = `https://api.tago.io/data?bucket=${deviceBucketId}&variable=${variableName2}&qty=1`;
const apiUrlSendData = `https://api.tago.io/data`;
// Função para fazer uma solicitação HTTP GET e exibir os dados na página
async function fetchData() {
    try {
        const responseTemp = await fetch(apiUrlGetDataTemp, {
            headers: {
                'Content-Type': 'application/json',
                'Device-Token': token
            }
        });
        const dataTemp = await responseTemp.json();
        // Exibe os dados de temperatura na página
        document.getElementById('dadosTemp').innerText = `${dataTemp.result[0].value} °C`;

        const newTemperature = parseFloat(dataTemp.result[0].value)
        updateTemperatureChart(newTemperature);

        // Solicitação de dados de umidade
        const responseUmi = await fetch(apiUrlGetDataUmi, {
            headers: {
                'Content-Type': 'application/json',
                'Device-Token': token
            }
        });
        const dataUmi = await responseUmi.json();
        // Exibe os dados de umidade na página
        document.getElementById('dadosUmid').innerText = `${dataUmi.result[0].value}%`;

        const newUmidade = parseFloat(dataUmi.result[0].value)
        updateUmidadeChart(newUmidade);

    } catch (error) {
        console.error('Erro ao recuperar dados:', error);
    }
}

// Inicialização do Chart.js
var mainChart;
document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('tempChart').getContext('2d');
    mainChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperatura(°C)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                data: []
            }, {
                type: 'line',
                label: 'Umidade(%)',
                backgroundColor: 'rgba(196, 12, 12, 0.5)',
                borderColor: 'rgba(196, 12, 12, 1)',
                borderWidth: 1,
                data: []
            }]
        },
    });
});

// Função para atualizar os dados do gráfico de temperatura
function updateTemperatureChart(newTemperature) {
    // Adiciona o novo valor à lista de dados do gráfico
    mainChart.data.labels.push(new Date().toLocaleTimeString());
    mainChart.data.datasets[0].data.push(newTemperature);

    // Limita o histórico do gráfico a 10 pontos
    if (mainChart.data.labels.length > 10) {
        mainChart.data.labels.shift();
        mainChart.data.datasets[0].data.shift();
    }

    // Atualiza o gráfico
    mainChart.update();

}

function updateUmidadeChart(newUmidade) {
    // Adiciona o novo valor à lista de dados do gráfico
    mainChart.data.datasets[1].data.push(newUmidade);

    // Limita o histórico do gráfico a 10 pontos
    if (mainChart.data.labels.length > 10) {
        mainChart.data.labels.shift();
        mainChart.data.datasets[0].data.shift();
        mainChart.data.datasets[1].data.shift();
    }

    // Atualiza o gráfico
    mainChart.update();
}

// Chama a função fetchData() quando a página é carregada
window.onload = function () {
    fetchData();
    setInterval(fetchData, 5000);
};