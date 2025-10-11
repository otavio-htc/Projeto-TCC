#include <esp_now.h>
#include <WiFi.h>
#include <esp_wifi.h>

//Endereço de Broadcast do Receptor de dados.
uint8_t broadcastAddress[] = {
  0xF4,
  0x65,
  0x0B,
  0xE8,
  0x3B,
  0x64

};


//Estrutura para armazenamento dos dados recebidos pelos sensores
typedef struct dados_prototipo{

  int id;
  int nivelAlto;
  int nivelMedio;
  int nivelBaixo;
  
} dados_prototipo;

//Estrutura para armazenar os dados de pinagem dos microcontroladores
typedef struct pinos_sensores{

  const int pinSensorAlto;
  const int pinSensorMedio;
  const int pinSensorBaixo; 
  
} pinos_sensores;

//Criação da variável "slave" que armazenará os dados.
dados_prototipo slave;

//Definição dos valores para a pinagem dos sensores.
const pinos_sensores slavePin = {
  .pinSensorAlto = 33, 
  .pinSensorMedio = 34, 
  .pinSensorBaixo = 35
};

//Variável para armazenamento das informações de pareamento.
esp_now_peer_info_t infoPareamento;


//Função para tratamento dos dados recebidos.
void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t statusEnvio){

  Serial.print("\r\nStatus de envio do último pacote:\t");
  Serial.println(statusEnvio == ESP_NOW_SEND_SUCCESS ? "Sucesso no envio":"Falha no envio");
  
}

void setup() {

  //Inicialização da porta serial.
  Serial.begin(115200);

  //Definição dos pinos dos sensores como receptores de dados
  pinMode(slavePin.pinSensorAlto, INPUT);
  pinMode(slavePin.pinSensorMedio, INPUT);
  pinMode(slavePin.pinSensorBaixo, INPUT);

  //Definição do dispositivo como Wi-Fi Station.
  WiFi.mode(WIFI_STA);

  //Inicialização do protocolo ESP-NOW.
  if(esp_now_init() != ESP_OK){
    Serial.println("Erro ao inicializar o protocolo ESP-NOW");
    return;
  }

  //Declaração da função de callback do envio de mensagem.
  esp_now_register_send_cb(OnDataSent);

  //Cópia e definição das informações de pareamento.
  memcpy(infoPareamento.peer_addr, broadcastAddress, 6);
  infoPareamento.channel = 0;
  infoPareamento.encrypt = false;

  //Condicional para verificação de sucesso na adição de pareamento.
  if (esp_now_add_peer(&infoPareamento) != ESP_OK){
    Serial.println("Falha ao realizar o pareamento");
    return;
  }
  
}

void loop() {

  //Definição de um id para o protótipo
  slave.id = 1;

  //Definição da variável "Slave" a partir das leituras de portas analógicas.
  slave.nivelAlto = map(analogRead(slavePin.pinSensorAlto), 4095, 0, 0, 100);
  slave.nivelMedio = map(analogRead(slavePin.pinSensorMedio), 4095, 0, 0, 100);
  slave.nivelBaixo = map(analogRead(slavePin.pinSensorBaixo), 4095, 0, 0, 100);

  Serial.println(slave.nivelAlto);
  Serial.println(slave.nivelMedio);
  Serial.println(slave.nivelBaixo);

  esp_wifi_set_channel(11, WIFI_SECOND_CHAN_NONE);

  //Envio de mensagem via ESP-NOW
  esp_err_t resultado = esp_now_send(broadcastAddress, (uint8_t *) &slave, sizeof(slave));

  //Condicional para verificação do resultado de envio.
  if(resultado == ESP_OK){
    Serial.println("Enviado com sucesso.");
  } else {
    Serial.println("Erro ao enviar os dados");
  }

  delay(10000);

}
