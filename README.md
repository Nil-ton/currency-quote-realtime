# Overview
The project involves the creation of a web application that allows users to perform real-time currency conversions. The main focus is to learn and implement the use of Web Workers and Threads in JavaScript to enhance performance.

Web Workers: I integrated Web Workers to execute the currency conversion logic in the background, thereby freeing up the main user interface thread.

Asynchronous Communication: I implemented asynchronous communication between the main thread and the Web Workers/Threads to send input data (currency values, exchange rates, etc.) and receive conversion results.

Real-Time Updating: I configured the application to update exchange rates at regular intervals to provide accurate and real-time information to users.

# Estrutura

`./src/script.js`: Funções principais de renderização dos dados e iniciação do webworkers.
`./src/works/api.js`: Thread responvavel pela atualização em tempo real do gráfico.
`./src/works/conversao.js`: Thread responsavel pela api de conversões das moedas. 


