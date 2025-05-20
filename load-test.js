import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 10 }, // Sobe para 10 usuarios virtuais (VUs) em 5 segundos
        { duration: '10s', target: 30 }, // Mantem 30 VUs por 10 segundos
        { duration: '30s', target: 100 }, // Mantem 100 VUs por 30 segundos
        { duration: '30s', target: 500 }, // Mantem 500 VUs por 30 segundos
        { duration: '30s', target: 1000 }, // Mantem 1000 VUs por 30 segundos
        { duration: '30s', target: 2000 }, // Mantem 2000 VUs por 30 segundos
        { duration: '5s', target: 0 }   // Finaliza o teste
    ],
    thresholds: {
        http_req_failed: ['rate<0.1'], // No maximo 10% de falhas
        http_req_duration: ['p(95)<1000'] // 95% das respostas dever ser < 1s
    },
};

const only422Callback = http.expectedStatuses(422);
const foo = 'boo';
const params = {
    headers: {
      'Content-Type': 'application/json',
      'environmentId': 'change_me',
      'customerId': 'change_me'
    },
    responseCallback: only422Callback
  };
const url = `https://mecsys4all.mecsys.com.br/greeting`
//console.log(params);
//console.log(url);

export default function () {
    const res = http.get(url, params, only422Callback);

    // Check if the response status is 422
    check(res, {
        'status is 422': (r) => r.status === 422,
    });

    // Simulate a small pause between requests
    //console.log(res.status);
    //console.log(res.body);
    sleep(1);
}