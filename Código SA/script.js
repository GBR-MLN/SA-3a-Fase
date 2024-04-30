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
        document.getElementById('dadosTemp').innerText = `Última temperatura medida: ${dataTemp.result[0].value} °C`;

        // Solicitação de dados de umidade
        const responseUmi = await fetch(apiUrlGetDataUmi, {
            headers: {
                'Content-Type': 'application/json',
                'Device-Token': token
            }
        });
        const dataUmi = await responseUmi.json();
        // Exibe os dados de umidade na página
        document.getElementById('dadosUmid').innerText = `Última umidade medida: ${dataUmi.result[0].value}%`;
    } catch (error) {
        console.error('Erro ao recuperar dados:', error);
    }
}

// async function sendData() {
//     try {

//         const responseTemp = await fetch(apiUrlGetDataTemp, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Device-Token': token
//             }
//         });
//         const dataTemp = await responseTemp.json();

//         const responseUmi = await fetch(apiUrlGetDataUmi, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Device-Token': token
//             }
//         });
//         const dataUmi = await responseUmi.json();

//         const body = {
//             variable1: variableName1,
//             value1: dataTemp.result[0].value,
//             variable2: variableName2,
//             value2: dataUmi.result[0].value
//         };

//         const response = await fetch(apiUrlSendData, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Device-Token': token
//             },
//             body: JSON.stringify(body)
//         });
//         const result = await response.json();
//         console.log('Dados enviados com sucesso:', result);
//         // Atualiza os dados exibidos após o envio bem-sucedido
//         fetchData();
//     } catch (error) {
//         console.error('Erro ao enviar dados:', error);
//     }
// }

async function drawChart() {

    // const responseTemp = await fetch(apiUrlGetDataTemp, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Device-Token': token
    //     }
    // });
    // const dataTemp = await responseTemp.json();

    new Chart(tempChart, {
        type: 'area',
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },

        data: {
            datasets: [
                {
                    label: 'Temperatura',
                    data: [
                        { year: 2010, count: 10 },
                        { year: 2011, count: 20 },
                        { year: 2012, count: 15 },
                        { year: 2013, count: 25 },
                        { year: 2014, count: 22 },
                        { year: 2015, count: 30 },
                        { year: 2016, count: 28 },
                      ]
                }
            ]
        },
    }
    );
};

// function updateChart() {
// }

// Chama a função fetchData() quando a página é carregada
window.onload = function () {
    fetchData();
    setInterval(fetchData, 5000);
    drawChart();
    setInterval(drawChart, 5000);
};